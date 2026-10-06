'use client';

import { siteName } from '@/config/website';

// IDURAR logo (cloned from idurarapp.com).
export default function Logo({ size = 36 }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/logo.svg" alt={siteName} height={size} style={{ height: size, width: 'auto', display: 'block' }} />;
}
