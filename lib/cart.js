// Pure cart helpers + localStorage persistence. Only { id, qty } is stored;
// prices and titles are always resolved from product data at render time.
export const CART_KEY = 'idurar_cart_v1';
export const ORDERS_KEY = 'idurar_orders_v1';
export const DISCOUNT_KEY = 'idurar_discount_v1';
export const WISHLIST_KEY = 'idurar_wishlist_v1';
export const REVIEWS_KEY = 'idurar_reviews_v1';
export const NEWSLETTER_KEY = 'idurar_newsletter_v1';
export const MAX_QTY = 99;

const clamp = (n) => Math.max(1, Math.min(MAX_QTY, Math.floor(Number(n)) || 1));

export function addItem(lines, id, qty = 1) {
  const found = lines.find((l) => l.id === id);
  if (found) return lines.map((l) => (l.id === id ? { ...l, qty: clamp(l.qty + qty) } : l));
  return [...lines, { id, qty: clamp(qty) }];
}

export const removeItem = (lines, id) => lines.filter((l) => l.id !== id);

export function setQty(lines, id, qty) {
  return qty < 1 ? removeItem(lines, id) : lines.map((l) => (l.id === id ? { ...l, qty: clamp(qty) } : l));
}

export const countItems = (lines) => lines.reduce((n, l) => n + l.qty, 0);

// Join lines with product data; unknown products are dropped.
export function detailLines(lines, products) {
  const byId = new Map(products.map((p) => [p.itemId, p]));
  return lines
    .map((l) => ({ ...l, product: byId.get(l.id) }))
    .filter((l) => l.product)
    .map((l) => ({ ...l, total: l.product.price * l.qty }));
}

export const subtotal = (detailed) => detailed.reduce((s, l) => s + l.total, 0);

// Resolve a code against the discount table. Returns the discount amount (never more than the subtotal).
export function applyDiscount(code, discounts, sub) {
  const d = discounts.find((x) => x.code === String(code || '').trim().toUpperCase());
  if (!d) return { valid: false, amount: 0 };
  const raw = d.percent ? (sub * d.percent) / 100 : d.amount || 0;
  return { valid: true, code: d.code, amount: Math.min(sub, Math.round(raw * 100) / 100) };
}

export function readJson(key, fallback) {
  try {
    const v = JSON.parse(window.localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / quota: keep working in memory */
  }
}

export function sanitize(lines) {
  return Array.isArray(lines)
    ? lines.filter((l) => l && typeof l.id === 'string').map((l) => ({ id: l.id, qty: clamp(l.qty) }))
    : [];
}

export function formatPrice(amount, currency, lang) {
  try {
    return new Intl.NumberFormat(lang, { style: 'currency', currency }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

export function newOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}
