'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WISHLIST_KEY, readJson, writeJson } from '@/lib/cart';

const WishlistContext = createContext(null);

const sanitize = (v) => (Array.isArray(v) ? [...new Set(v.filter((x) => typeof x === 'string'))] : []);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(sanitize(readJson(WISHLIST_KEY, [])));
    setReady(true);
    const onStorage = (e) => {
      if (e.key === WISHLIST_KEY) setIds(sanitize(readJson(WISHLIST_KEY, [])));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback((id) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeJson(WISHLIST_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ ids, ready, count: ids.length, has: (id) => ids.includes(id), toggle }),
    [ids, ready, toggle],
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>');
  return ctx;
}
