'use client';

import { useState } from 'react';
import { Button, InputNumber, Space, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from './CartProvider';
import { MAX_QTY } from '@/lib/cart';

export default function AddToCart({ product, ui, size = 'large', withQty = true }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [api, holder] = message.useMessage();
  const soldOut = product.stock <= 0;

  return (
    <Space wrap>
      {holder}
      {withQty && (
        <InputNumber min={1} max={MAX_QTY} value={qty} onChange={(v) => setQty(v || 1)} size={size} aria-label={ui.quantity} disabled={soldOut} />
      )}
      <Button
        type="primary"
        size={size}
        icon={<ShoppingCartOutlined />}
        disabled={soldOut}
        onClick={() => { add(product.itemId, qty); api.success(ui.added); }}
      >
        {soldOut ? ui.outOfStock : ui.addToCart}
      </Button>
    </Space>
  );
}
