import { useState, useEffect } from 'react';

const SLIDES = [
  { src: '/images/bags/backpacks/laptop/1.jpg',       cat: 'Laptop Backpacks',   tag: 'OEM · Private Label' },
  { src: '/images/bags/duffel-gym/gym/1.jpg',          cat: 'Gym Bags',           tag: 'Custom Branding'     },
  { src: '/images/bags/backpacks/business/2.jpg',      cat: 'Business Backpacks', tag: 'Factory Direct'      },
  { src: '/images/bags/sports/cricket/3.jpg',          cat: 'Cricket Kit Bags',   tag: 'Sport Series'        },
  { src: '/images/bags/duffel-gym/travel/2.jpg',       cat: 'Travel Duffels',     tag: 'Bulk Export'         },
  { src: '/images/bags/backpacks/school/1.jpg',        cat: 'School Backpacks',   tag: 'MOQ: 100 pcs'        },
  { src: '/images/bags/duffel-gym/convertible/2.jpg',  cat: 'Convertible Bags',   tag: 'New Collection'      },
];

const INTERVAL = 2800;

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);

  useEffect(() => {
    const slide = setTimeout(() => {
      setExiting(active);
      setActive(i => (i + 1) % SLIDES.length);
    }, INTERVAL);

    return () => { clearTimeout(slide); };
  }, [active]);

  useEffect(() => {
    if (exiting === null) return;
    const t = setTimeout(() => setExiting(null), 650);
    return () => clearTimeout(t);
  }, [exiting]);

  const goTo = (i: number) => {
    if (i === active) return;
    setExiting(active);
    setActive(i);
  };

  return (
    <div className="showcase-wrap">
      <div className="showcase-frame">
        <div className="hero-corner hero-corner-tl" />
        <div className="hero-corner hero-corner-tr" />
        <div className="hero-corner hero-corner-bl" />
        <div className="hero-corner hero-corner-br" />

        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.cat}
            className={`showcase-img${i === active ? ' sc-active' : ''}${i === exiting ? ' sc-exit' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

        <div className="showcase-overlay">
          <span className="showcase-tag">{SLIDES[active].tag}</span>
          <span className="showcase-cat">{SLIDES[active].cat}</span>
        </div>
      </div>

      <div className="showcase-dots" role="tablist" aria-label="Product slides">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`View ${s.cat}`}
            className={`showcase-dot${i === active ? ' sc-dot-active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
