'use client';

import { Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useWishlist } from './WishlistProvider';
import { colors } from './theme';

export default function WishlistButton({ product, ui, size = 'middle' }) {
  const { has, toggle, ready } = useWishlist();
  const on = ready && has(product.itemId);
  const label = on ? ui.removeFromWishlist : ui.addToWishlist;
  return (
    <Button
      type="text"
      size={size}
      aria-label={label}
      aria-pressed={on}
      title={label}
      icon={on ? <HeartFilled style={{ color: colors.accent }} /> : <HeartOutlined />}
      onClick={() => toggle(product.itemId)}
    />
  );
}
