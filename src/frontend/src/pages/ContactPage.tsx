import { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useSubmitInquiry } from '../hooks/useQueries';
import { productCategories } from '../data/productTaxonomy';
import { Mail, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const search = useSearch({ from: '/contact' });
  const prefilledCategory = (search as { category?: string })?.category || '';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    whatsapp: '',
    category: prefilledCategory,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useSubmitInquiry();

  useEffect(() => {
    if (prefilledCategory) {
      setFormData((prev) => ({ ...prev, category: prefilledCategory }));
    }
  }, [prefilledCategory]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.category) newErrors.category = 'Please select a product category';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await submitInquiry.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        country: '',
        email: '',
        whatsapp: '',
        category: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      // Extract backend error message if available
      let errorMessage = 'Failed to submit inquiry. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrors({ submit: errorMessage });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const categoryOptions = [
    'Catalogue Request',
    ...productCategories.map((cat) => cat.name),
    'General Inquiry',
  ];

  if (submitted) {
    return (
      <div className="home-section-cta py-32 md:py-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full home-icon-badge">
                <CheckCircle className="h-12 w-12 home-icon-color" />
              </div>
            </div>
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white">Thank You!</h1>
            <p className="mb-10 text-lg md:text-xl leading-relaxed text-white/85">
              Your inquiry has been successfully submitted. Our team will review your message and
              get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="home-btn-primary"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-section-highlights py-32 md:py-40">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-20 text-center">
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white">
              Contact Us
            </h1>
            <div className="mx-auto mb-6 w-24 home-gold-divider" style={{ height: '3px' }} />
            <p className="text-lg md:text-xl leading-relaxed text-white/85">
              Get in touch with us to discuss your requirements. We're here to help with your
              equestrian product needs.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${
                        errors.name ? 'border-destructive' : 'border-input'
                      } bg-background px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${
                        errors.country ? 'border-destructive' : 'border-input'
                      } bg-background px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.country && <p className="mt-1 text-sm text-destructive">{errors.country}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${
                        errors.email ? 'border-destructive' : 'border-input'
                      } bg-background px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+1234567890"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Product Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${
                        errors.category ? 'border-destructive' : 'border-input'
                      } bg-background px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">Select a category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-destructive">{errors.category}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full rounded-xl border ${
                      errors.message ? 'border-destructive' : 'border-input'
                    } bg-background px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                    placeholder="Tell us about your requirements..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                </div>

                {errors.submit && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4">
                    <p className="text-sm text-destructive">{errors.submit}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitInquiry.isPending}
                  className="home-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitInquiry.isPending ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="home-highlight-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full home-icon-badge">
                  <Mail className="h-6 w-6 home-icon-color" />
                </div>
                <h3 className="mb-3 text-lg font-serif font-semibold text-white">Email Us</h3>
                <p className="text-sm text-white/80">
                  info@meghrajexports.com
                </p>
              </div>

              <div className="home-highlight-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full home-icon-badge">
                  <MessageSquare className="h-6 w-6 home-icon-color" />
                </div>
                <h3 className="mb-3 text-lg font-serif font-semibold text-white">Response Time</h3>
                <p className="text-sm text-white/80">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
