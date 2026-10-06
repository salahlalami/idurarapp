'use client';

import { Typography, Row, Col, Empty, Button } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import ProductCard from './components/ProductCard';
import { useWishlist } from './components/WishlistProvider';
import pages from '@/data/pages';
import { getUi } from '@/data/ui';

export default function WishlistLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const { ids, ready } = useWishlist();
  const items = data.products.filter((p) => ids.includes(p.itemId));
  const shop = pages.find((p) => p.id === 'shop')?.translations[lang]?.slug ?? '';

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title>{page.title}</Typography.Title>
      {ready && items.length === 0 ? (
        <Empty description={ui.wishlistEmpty}>
          <Link href={`/${lang}/${shop}`}><Button type="primary">{ui.continueShopping}</Button></Link>
        </Empty>
      ) : (
        <Row gutter={[24, 24]}>
          {items.map((p) => (
            <Col key={p.id} xs={24} sm={12} lg={8}><ProductCard product={p} ui={ui} lang={lang} /></Col>
          ))}
        </Row>
      )}
    </Shell>
  );
}
