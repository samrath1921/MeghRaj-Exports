const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.57) % 96}%`,
  delay: `${(i * 0.73) % 9}s`,
  duration: `${5 + (i * 1.1) % 7}s`,
  size: `${1.2 + (i % 4) * 0.6}px`,
  opacity: 0.35 + (i % 5) * 0.1,
}));

export default function HeroParticles() {
  return (
    <div className="hero-particles" aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
