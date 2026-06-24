import React, { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useSubmitInquiry } from '../hooks/useQueries';
import { Mail, CheckCircle, MapPin, Check, Clock, Settings, Factory, Briefcase, Dumbbell, Trophy, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  isValidCountryName,
  isValidWhatsappLocalNumber,
  normalizePhoneDigits,
} from '../utils/validation';
import { countryDialCodes } from '../utils/countryDialCodes';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { phase1Categories } from '../data/categories';
import PageMeta from '../components/PageMeta';

const TOTAL_STEPS = 4;

const step0Categories = [
  { label: 'Backpacks & Laptop Bags', value: 'Backpacks & Laptop Bags', icon: <Briefcase className="h-6 w-6" />, desc: 'Business backpacks, school backpacks, everyday backpacks & laptop bags' },
  { label: 'Duffel & Gym Bags', value: 'Duffel & Gym Bags', icon: <Dumbbell className="h-6 w-6" />, desc: 'Travel, gym, cabin, convertible' },
  { label: 'Sports Bags', value: 'Sports Bags', icon: <Trophy className="h-6 w-6" />, desc: 'Cricket & hockey kit bags' },
  { label: 'Equestrian Products', value: 'Equestrian Products', icon: <Star className="h-6 w-6" />, desc: 'Saddlery & equestrian gear' },
];

const purposes = ['OEM Manufacturing', 'Private Label', 'Retail / Wholesale', 'Corporate Gifting', 'Club / Team Order', 'Other'];
const timelines = ['As soon as possible', '1–2 months', '3–6 months', 'Flexible / Planning stage'];
const yesNo = ['Yes', 'No', 'Not sure yet'];

interface FormData {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsappCode: string;
  whatsappNumber: string;
  category: string;
  subcategory: string;
  quantity: string;
  purpose: string;
  logoRequired: string;
  materialPref: string;
  colorPref: string;
  samplingRequired: string;
  timeline: string;
  notes: string;
}

const emptyForm: FormData = {
  name: '', company: '', country: '', email: '', whatsappCode: '', whatsappNumber: '',
  category: '', subcategory: '', quantity: '', purpose: '',
  logoRequired: '', materialPref: '', colorPref: '', samplingRequired: '',
  timeline: '', notes: '',
};

const stepLabels = ['Contact', 'Product', 'Customisation', 'Timeline'];

export default function ContactPage() {
  const search = useSearch({ from: '/contact' });
  const prefilledCategory = (search as { category?: string; sub?: string })?.category || '';
  const prefilledSub = (search as { category?: string; sub?: string })?.sub || '';
  const whatsappContactUrl = import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/919696697000';

  // step 0 = category picker, steps 1-4 = form
  const [step, setStep] = useState(prefilledCategory ? 1 : 0);
  const [formData, setFormData] = useState<FormData>({ ...emptyForm, category: prefilledCategory, subcategory: prefilledSub });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useSubmitInquiry();
  const hero = useRevealOnce();
  const formSection = useRevealOnce();

  useEffect(() => {
    if (prefilledCategory) {
      setFormData((prev) => ({ ...prev, category: prefilledCategory, subcategory: prefilledSub }));
      setStep(1);
    }
  }, [prefilledCategory, prefilledSub]);

  const set = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const pickCategory = (value: string) => {
    set('category', value);
    set('subcategory', '');
    setStep(1);
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!formData.name.trim()) errs.name = 'Name is required';
      if (!formData.country.trim()) errs.country = 'Country is required';
      else if (!isValidCountryName(formData.country)) errs.country = 'Please enter a valid country name';
      if (!formData.email.trim()) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Please enter a valid email';
      if (formData.whatsappNumber.trim()) {
        if (!formData.whatsappCode) errs.whatsappCode = 'Select country code';
        if (!isValidWhatsappLocalNumber(formData.whatsappNumber)) errs.whatsappNumber = 'Invalid number';
      }
    }
    if (s === 2) {
      if (!formData.category) errs.category = 'Please select a product category';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    try {
      const whatsapp =
        formData.whatsappCode && formData.whatsappNumber.trim()
          ? `${formData.whatsappCode}${normalizePhoneDigits(formData.whatsappNumber)}`
          : '';

      const messageParts = [
        formData.notes && `Notes: ${formData.notes}`,
        formData.subcategory && `Subcategory: ${formData.subcategory}`,
        formData.quantity && `Quantity: ${formData.quantity}`,
        formData.purpose && `Purpose: ${formData.purpose}`,
        formData.logoRequired && `Logo required: ${formData.logoRequired}`,
        formData.materialPref && `Material preference: ${formData.materialPref}`,
        formData.colorPref && `Colour preference: ${formData.colorPref}`,
        formData.samplingRequired && `Sampling required: ${formData.samplingRequired}`,
        formData.timeline && `Target timeline: ${formData.timeline}`,
      ].filter(Boolean).join('\n');

      await submitInquiry.mutateAsync({
        name: formData.name,
        company: formData.company,
        country: formData.country,
        email: formData.email,
        whatsapp,
        category: formData.category,
        categories: [formData.category],
        message: messageParts || '(No additional notes provided)',
      });
      setSubmitted(true);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Submission failed. Please try again.' });
    }
  };

  const inputBase = 'w-full rounded-xl form-input px-4 py-3 focus:outline-none text-sm';

  if (submitted) {
    return (
      <div className="home-page-wrapper">
        <section className="home-section-intro py-40 md:py-52">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="mx-auto max-w-lg text-center">
              <div className="mb-8 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full home-icon-badge">
                  <CheckCircle className="h-10 w-10 home-icon-color" />
                </div>
              </div>
              <span className="section-eyebrow">Enquiry Received</span>
              <h1 className="mt-2 mb-6 font-serif text-4xl md:text-5xl font-bold text-white">Received.</h1>
              <div className="mx-auto mb-8 w-20 home-gold-divider" style={{ height: '2px' }} />
              <p className="mb-4 text-lg leading-relaxed text-white/75">
                Your manufacturing enquiry has been submitted. Our team will review your requirements and respond within 24 business hours with product options and pricing.
              </p>
              <p className="mb-10 text-sm text-white/45">OEM and private label enquiries are prioritised.</p>
              <button
                onClick={() => { setSubmitted(false); setStep(0); setFormData({ ...emptyForm }); }}
                className="home-btn-primary"
              >
                Start New Enquiry
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const subcatsForCategory = phase1Categories.find(
    (c) => c.name === formData.category || formData.category.startsWith(c.name)
  )?.subcategories ?? [];

  return (
    <div className="home-page-wrapper">
      <PageMeta
        title="Request a Quote — Contact Meghraj Exports"
        description="Send a product enquiry to Meghraj Exports. Share your bag requirements, branding needs and quantity. We respond within 24 business hours with factory-direct pricing."
        path="/contact"
      />

      {/* Hero */}
      <section
        ref={hero.ref}
        className={`home-section-intro py-24 md:py-32 home-section-reveal ${hero.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Manufacturing Enquiry Desk</span>
            <h1 className="mb-5 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Request Manufacturing Quote
            </h1>
            <div className="mx-auto mb-6 w-20 home-gold-divider" style={{ height: '2px' }} />
            <p className="text-lg leading-relaxed text-white/70">
              Tell us what you need. We'll respond within 24 business hours with product options, pricing, and lead times.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section
        ref={formSection.ref}
        className={`home-section-highlights py-14 md:py-20 home-section-reveal ${formSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-3">

              {/* Form */}
              <div className="lg:col-span-2">

                {/* Step Progress (only shows for steps 1-4) */}
                {step > 0 && (
                  <div className="form-progress-bar mb-8">
                    {stepLabels.map((label, i) => {
                      const n = i + 1;
                      const done = step > n;
                      const active = step === n;
                      return (
                        <div key={label} className="flex items-center flex-1 min-w-0">
                          <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className={`form-step-dot ${done ? 'form-step-dot-done' : active ? 'form-step-dot-active' : ''}`}>
                              {done ? <Check className="h-3.5 w-3.5" /> : n}
                            </div>
                            <span className={`text-xs font-medium hidden sm:block ${active ? 'text-yellow-400' : done ? 'text-yellow-400/60' : 'text-white/30'}`}>{label}</span>
                          </div>
                          {i < stepLabels.length - 1 && (
                            <div className={`form-step-line mx-2 ${done ? 'form-step-line-done' : ''}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="form-card">

                  {/* ── STEP 0: Category Picker ── */}
                  {step === 0 && (
                    <div>
                      <p className="form-section-title">What are you looking for?</p>
                      <p className="form-section-hint">Select a product category to get started.</p>
                      <div className="form-cat0-grid">
                        {step0Categories.map((cat) => (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => pickCategory(cat.value)}
                            className={`form-cat0-btn ${formData.category === cat.value ? 'form-cat0-btn-active' : ''}`}
                          >
                            <div className="form-cat0-icon">{cat.icon}</div>
                            <span className="form-cat0-label">{cat.label}</span>
                            <span className="text-xs text-white/35 leading-snug">{cat.desc}</span>
                          </button>
                        ))}
                      </div>
                      <p className="mt-6 text-center text-white/30 text-xs">
                        Not sure yet? Select any category — you can change it in the next step.
                      </p>
                    </div>
                  )}

                  {/* ── STEP 1: Contact Details ── */}
                  {step === 1 && (
                    <div>
                      <p className="form-section-title">Your Contact Details</p>
                      <p className="form-section-hint">So we know who to respond to.</p>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="form-label mb-1.5 block text-sm">Full Name *</label>
                          <input type="text" value={formData.name} onChange={(e) => set('name', e.target.value)}
                            placeholder="Your name" className={`${inputBase} ${errors.name ? 'border-destructive' : ''}`} />
                          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="form-label mb-1.5 block text-sm">Company Name <span className="text-white/35 font-normal">(optional)</span></label>
                          <input type="text" value={formData.company} onChange={(e) => set('company', e.target.value)}
                            placeholder="Your company" className={inputBase} />
                        </div>
                        <div>
                          <label className="form-label mb-1.5 block text-sm">Country *</label>
                          <input type="text" value={formData.country} onChange={(e) => set('country', e.target.value)}
                            placeholder="e.g. United Kingdom" className={`${inputBase} ${errors.country ? 'border-destructive' : ''}`} />
                          {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}
                        </div>
                        <div>
                          <label className="form-label mb-1.5 block text-sm">Business Email *</label>
                          <input type="email" value={formData.email} onChange={(e) => set('email', e.target.value)}
                            placeholder="you@company.com" className={`${inputBase} ${errors.email ? 'border-destructive' : ''}`} />
                          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <label className="form-label mb-1.5 block text-sm">WhatsApp Number <span className="text-white/35 font-normal">(optional, faster response)</span></label>
                          <div className="flex gap-2">
                            <select value={formData.whatsappCode} onChange={(e) => set('whatsappCode', e.target.value)}
                              className={`form-input rounded-xl px-3 py-3 text-sm focus:outline-none w-36 flex-shrink-0 ${errors.whatsappCode ? 'border-destructive' : ''}`}>
                              <option value="">Code</option>
                              {countryDialCodes.map((c) => (
                                <option key={c.country} value={c.dialCode}>{c.country} ({c.dialCode})</option>
                              ))}
                            </select>
                            <input type="tel" value={formData.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)}
                              placeholder="Phone number" className={`${inputBase} ${errors.whatsappNumber ? 'border-destructive' : ''}`} />
                          </div>
                          {(errors.whatsappCode || errors.whatsappNumber) && (
                            <p className="mt-1 text-xs text-destructive">{errors.whatsappCode || errors.whatsappNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Product Selection ── */}
                  {step === 2 && (
                    <div>
                      <p className="form-section-title">Product Requirements</p>
                      <p className="form-section-hint">Helps us match you with the right products and pricing.</p>

                      <div className="mb-6">
                        <label className="form-label mb-3 block text-sm">Product Category *</label>
                        {formData.category && (
                          <p className="text-yellow-400/60 text-xs mb-2 font-medium">Selected: {formData.category}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {phase1Categories.map((cat) => (
                            <button key={cat.id} type="button" onClick={() => { set('category', cat.name); set('subcategory', ''); }}
                              className={`form-chip ${formData.category === cat.name ? 'form-chip-active' : ''}`}>
                              {cat.name}
                            </button>
                          ))}
                          <button type="button" onClick={() => { set('category', 'Equestrian Products'); set('subcategory', ''); }}
                            className={`form-chip ${formData.category === 'Equestrian Products' ? 'form-chip-active' : ''}`}>
                            Equestrian Products
                          </button>
                          <button type="button" onClick={() => { set('category', 'Other / Not sure'); set('subcategory', ''); }}
                            className={`form-chip ${formData.category === 'Other / Not sure' ? 'form-chip-active' : ''}`}>
                            Other / Not sure
                          </button>
                        </div>
                        {errors.category && <p className="mt-2 text-xs text-destructive">{errors.category}</p>}
                      </div>

                      {subcatsForCategory.length > 0 && (
                        <div className="mb-6">
                          <label className="form-label mb-3 block text-sm">Subcategory <span className="text-white/35 font-normal">(optional)</span></label>
                          <div className="flex flex-wrap gap-2">
                            {subcatsForCategory.map((sub) => (
                              <button key={sub.id} type="button" onClick={() => set('subcategory', sub.name)}
                                className={`form-chip ${formData.subcategory === sub.name ? 'form-chip-active' : ''}`}>
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <label className="form-label mb-3 block text-sm">Purpose <span className="text-white/35 font-normal">(optional)</span></label>
                        <div className="flex flex-wrap gap-2">
                          {purposes.map((p) => (
                            <button key={p} type="button" onClick={() => set('purpose', p)}
                              className={`form-chip ${formData.purpose === p ? 'form-chip-active' : ''}`}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="form-label mb-1.5 block text-sm">Estimated Quantity <span className="text-white/35 font-normal">(optional)</span></label>
                        <input type="text" value={formData.quantity} onChange={(e) => set('quantity', e.target.value)}
                          placeholder="e.g. 500 units, 2000 pieces, or 'not sure yet'" className={inputBase} />
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Customisation ── */}
                  {step === 3 && (
                    <div>
                      <p className="form-section-title">Customisation Needs</p>
                      <p className="form-section-hint">All fields optional. Share what you know, skip what you don't.</p>

                      <div className="mb-6">
                        <label className="form-label mb-3 block text-sm">Logo / Branding Required?</label>
                        <div className="flex flex-wrap gap-2">
                          {yesNo.map((v) => (
                            <button key={v} type="button" onClick={() => set('logoRequired', v)}
                              className={`form-chip ${formData.logoRequired === v ? 'form-chip-active' : ''}`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="form-label mb-3 block text-sm">Sampling Required?</label>
                        <div className="flex flex-wrap gap-2">
                          {yesNo.map((v) => (
                            <button key={v} type="button" onClick={() => set('samplingRequired', v)}
                              className={`form-chip ${formData.samplingRequired === v ? 'form-chip-active' : ''}`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="form-label mb-1.5 block text-sm">Material Preference</label>
                          <input type="text" value={formData.materialPref} onChange={(e) => set('materialPref', e.target.value)}
                            placeholder="e.g. polyester, canvas, nylon" className={inputBase} />
                        </div>
                        <div>
                          <label className="form-label mb-1.5 block text-sm">Colour Preference</label>
                          <input type="text" value={formData.colorPref} onChange={(e) => set('colorPref', e.target.value)}
                            placeholder="e.g. black, navy, Pantone 286C" className={inputBase} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 4: Timeline & Notes ── */}
                  {step === 4 && (
                    <div>
                      <p className="form-section-title">Timeline & Additional Notes</p>
                      <p className="form-section-hint">Almost done. Just a few final details.</p>

                      <div className="mb-6">
                        <label className="form-label mb-3 block text-sm">Target Timeline</label>
                        <div className="flex flex-wrap gap-2">
                          {timelines.map((t) => (
                            <button key={t} type="button" onClick={() => set('timeline', t)}
                              className={`form-chip ${formData.timeline === t ? 'form-chip-active' : ''}`}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="form-label mb-1.5 block text-sm">Additional Notes <span className="text-white/35 font-normal">(optional)</span></label>
                        <textarea value={formData.notes} onChange={(e) => set('notes', e.target.value)}
                          rows={5} placeholder="Anything else we should know: specific features, reference products, target markets, deadlines, etc."
                          className={`${inputBase} resize-none`} />
                      </div>

                      {errors.submit && (
                        <p className="mt-3 text-sm text-destructive">{errors.submit}</p>
                      )}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className={`flex mt-8 gap-3 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                    {step > 0 && (
                      <button type="button" onClick={back}
                        className="px-6 py-3 text-sm font-semibold text-white/60 hover:text-white transition-colors border border-white/10 rounded-xl hover:border-white/20">
                        Back
                      </button>
                    )}
                    {step > 0 && step < TOTAL_STEPS && (
                      <button type="button" onClick={next} className="home-btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
                        Continue
                      </button>
                    )}
                    {step === TOTAL_STEPS && (
                      <button type="button" onClick={handleSubmit} disabled={submitInquiry.isPending}
                        className="home-btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem', opacity: submitInquiry.isPending ? 0.7 : 1 }}>
                        {submitInquiry.isPending ? 'Submitting…' : 'Request Quote'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Form trust row */}
                {step === TOTAL_STEPS && (
                  <div className="form-trust-row mt-5">
                    <span className="form-trust-item">
                      <Clock className="h-3.5 w-3.5" />
                      Response within 24 business hours
                    </span>
                    <span className="form-trust-item">
                      <Settings className="h-3.5 w-3.5" />
                      OEM and private label enquiries welcome
                    </span>
                    <span className="form-trust-item">
                      <Factory className="h-3.5 w-3.5" />
                      Factory-direct manufacturing support
                    </span>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-5">
                <div className="oem-capability-card">
                  <h3 className="font-semibold text-white text-sm mb-5">Contact Information</h3>
                  <div className="flex flex-col gap-4 pb-5 border-b border-white/8">
                    {([
                      { icon: <Mail className="h-4 w-4" />, label: 'Email', content: <a href="mailto:info@meghrajexports.com" className="text-yellow-400/80 hover:text-yellow-400 text-sm transition-colors">info@meghrajexports.com</a> },
                      { icon: <FaWhatsapp className="h-4 w-4" />, label: 'WhatsApp', content: <a href={whatsappContactUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-400/80 hover:text-yellow-400 text-sm transition-colors">Message us on WhatsApp</a> },
                      { icon: <MapPin className="h-4 w-4" />, label: 'Factory Location', content: <span className="text-white/60 text-sm">Jalandhar, Punjab, India</span> },
                      { icon: <Clock className="h-4 w-4" />, label: 'Response Time', content: <span className="text-white/60 text-sm">Within 24 business hours</span> },
                    ] as { icon: React.ReactNode; label: string; content: React.ReactNode }[]).map(({ icon, label, content }) => (
                      <div key={label} className="flex items-start gap-3">
                        <span className="text-yellow-400/60 flex-shrink-0 mt-0.5">{icon}</span>
                        <div>
                          <p className="text-white/35 text-xs mb-0.5">{label}</p>
                          {content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-5">
                    <h3 className="font-semibold text-white text-sm mb-4">Why Buyers Work With Us</h3>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        'Factory Direct Manufacturing',
                        'OEM & Private Label',
                        'IEC Registered Exporter',
                        'Custom Branding Available',
                        'Export Documentation Support',
                        'MOQ From 100 Units',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-white/65">
                          <CheckCircle className="h-3.5 w-3.5 text-yellow-400/60 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
