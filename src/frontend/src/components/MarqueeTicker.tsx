const items = [
  'OEM Manufacturing',
  'Private Label',
  'Factory Direct',
  '4th Generation',
  'Export Ready',
  '25+ Countries',
  'Punjab, India',
  'Bulk Production',
  'Custom Branding',
  'ISO Quality',
];

export default function MarqueeTicker() {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-live-badge">
        <span className="marquee-live-dot" />
        LIVE
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-sep">//</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
