// const stats = [
// 	{ value: "15+", label: "Projects Completed" },
// 	{ value: "2+", label: "Years Experience" },
// 	{ value: "100+", label: "Students Trained" },
// 	{ value: "10+", label: "Technologies" },
// ];

// export default function HomeStats() {
// 	return <section className="stats-section"><div className="container stats-grid">{stats.map((stat) => <article className="stat-card" key={stat.label}><div><strong>{stat.value}</strong><span>{stat.label}</span></div></article>)}</div></section>;
// }


"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Students Trained" },
  { value: 10, suffix: "+", label: "Technologies" },
];

// Ek card ka count-up logic
function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;

            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease-out effect (fast start, slow end)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = Math.floor(easeOut * target);

              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 } // 30% visible hone par start
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <article className="stat-card" ref={ref}>
      <div>
        <strong>
          {count}
          {suffix}
        </strong>
        <span>{label}</span>
      </div>
    </article>
  );
}

export default function HomeStats() {
  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            target={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}