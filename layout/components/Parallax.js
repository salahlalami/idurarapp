'use client';

import { useEffect, useRef } from 'react';
import { parallax } from '@/config/website';

// Moves its children vertically at a fraction of scroll speed.
// Negative `speed` moves against the scroll. Does nothing when disabled in
// config/website.js or when the visitor prefers reduced motion.
export default function Parallax({ speed = parallax.speed, style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!parallax.enabled || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${Math.round(window.scrollY * speed)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [speed]);

  return (
    <div ref={ref} style={{ willChange: 'transform', ...style }} {...rest}>
      {children}
    </div>
  );
}
