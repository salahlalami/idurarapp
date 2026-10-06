'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CART_KEY, DISCOUNT_KEY, addItem, removeItem, setQty, countItems, readJson, writeJson, sanitize } from '@/lib/cart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [ready, setReady] = useState(false);
  const [code, setCodeState] = useState('');

  // Hydrate after mount so server and first client render match.
  useEffect(() => {
    setLines(sanitize(readJson(CART_KEY, [])));
    setCodeState(String(readJson(DISCOUNT_KEY, '') || ''));
    setReady(true);
    const onStorage = (e) => {
      if (e.key === CART_KEY) setLines(sanitize(readJson(CART_KEY, [])));
      if (e.key === DISCOUNT_KEY) setCodeState(String(readJson(DISCOUNT_KEY, '') || ''));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const update = useCallback((fn) => {
    setLines((prev) => {
      const next = fn(prev);
      writeJson(CART_KEY, next);
      return next;
    });
  }, []);

  const setCode = useCallback((c) => {
    setCodeState(c);
    writeJson(DISCOUNT_KEY, c);
  }, []);

  const value = useMemo(
    () => ({
      lines,
      ready,
      code,
      setCode,
      count: countItems(lines),
      add: (id, qty = 1) => update((l) => addItem(l, id, qty)),
      remove: (id) => update((l) => removeItem(l, id)),
      setQty: (id, qty) => update((l) => setQty(l, id, qty)),
      clear: () => {
        update(() => []);
        setCode('');
      },
    }),
    [lines, ready, code, update, setCode],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
