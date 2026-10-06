'use client';

import { Card, Tag, Typography } from 'antd';
import Link from 'next/link';
import Cover from './Cover';
import AddToCart from './AddToCart';
import WishlistButton from './WishlistButton';
import { formatPrice } from '@/lib/cart';

export default function ProductCard({ product, ui, lang }) {
  return (
    <Card
      hoverable
      variant="outlined"
      styles={{ body: { padding: 20 } }}
      style={{ height: '100%', overflow: 'hidden', borderColor: '#eceef1' }}
      cover={<Link href={product.href}><Cover item={product} radius={0} /></Link>}
      actions={[<AddToCart key="add" product={product} ui={ui} size="middle" withQty={false} />, <WishlistButton key="wish" product={product} ui={ui} />]}
    >
      <Link href={product.href}>
        <Typography.Title level={5} style={{ marginTop: 0 }}>{product.title}</Typography.Title>
      </Link>
      <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>{product.description}</Typography.Paragraph>
      <Typography.Text strong>{formatPrice(product.price, product.currency, lang)}</Typography.Text>{' '}
      {product.stock <= 0 && <Tag color="red">{ui.outOfStock}</Tag>}
    </Card>
  );
}
