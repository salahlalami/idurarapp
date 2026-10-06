'use client';

import WishlistButton from './WishlistButton';

// Ads share the product wishlist store; ids are namespaced so they never clash.
export default function AdFavoriteButton({ ad, ui, size }) {
  return <WishlistButton product={{ itemId: `ad:${ad.itemId}` }} ui={{ addToWishlist: ui.favorite, removeFromWishlist: ui.unfavorite }} size={size} />;
}
