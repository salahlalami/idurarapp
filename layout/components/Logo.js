'use client';

import { siteName, tagline } from '@/config/website';

// Animated logo. `variant="full"` = icon + wordmark, `"icon"` = icon only.
// `light` renders the wordmark in white for dark backgrounds.
export default function Logo({ variant = 'full', size = 36, light = false }) {
  const ink = light ? '#fff' : '#111827';
  return (
    <span className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, color: ink }}>
      <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label={siteName} className="logo-icon">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f97316" />
            <stop offset=".55" stopColor="#e11d48" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="11" fill="url(#logo-g)" />
        <path className="logo-wave" d="M9 25c3-5 5.500-5 8 0s5 5 7.500 0 5-5 7.500 0 4 4 6 1" fill="none" stroke="#fff" strokeWidth="3.200" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
      </svg>
      {variant === 'full' && (
        <span className="logo-text" style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontWeight: 800, fontSize: size * 0.58, letterSpacing: '.02em' }}>{siteName}</span>
          {tagline && <span style={{ fontStyle: 'italic', fontSize: size * 0.3, opacity: 0.65, marginTop: 3 }}>{tagline}</span>}
        </span>
      )}
      <style>{`
        .logo-wave{stroke-dasharray:100;stroke-dashoffset:100;animation:logo-draw 1.2s .2s ease forwards}
        .logo-icon{animation:logo-pop .6s cubic-bezier(.2,1.4,.4,1) both}
        .logo-text{animation:logo-slide .6s .25s ease both}
        .logo:hover .logo-wave{animation:logo-flow 1.1s linear infinite;stroke-dashoffset:0}
        .logo:hover .logo-icon{transform:rotate(-6deg) scale(1.06);transition:transform .25s}
        .logo-icon{transition:transform .25s}
        @keyframes logo-draw{to{stroke-dashoffset:0}}
        @keyframes logo-flow{from{stroke-dasharray:100;transform:translateX(-2px)}50%{transform:translateX(2px)}to{transform:translateX(-2px)}}
        @keyframes logo-pop{from{opacity:0;transform:scale(.5) rotate(-20deg)}}
        @keyframes logo-slide{from{opacity:0;transform:translateX(-8px)}}
        [dir=rtl] .logo-text{animation-name:logo-slide-rtl}
        @keyframes logo-slide-rtl{from{opacity:0;transform:translateX(8px)}}
        @media (prefers-reduced-motion:reduce){.logo *,.logo{animation:none!important;transition:none!important}.logo-wave{stroke-dashoffset:0}}
      `}</style>
    </span>
  );
}
