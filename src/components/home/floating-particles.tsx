"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 10,
        opacity: Math.random() * 0.45 + 0.1,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-8px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "rgba(249, 115, 22, 0.8)",
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px rgba(249, 115, 22, 0.5)`,
            animation: `floatUp ${p.duration}s ${p.delay}s ease-in infinite`,
          }}
        />
      ))}
    </div>
  );
}
