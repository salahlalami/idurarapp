'use client';

import { Row, Col, Typography, Tag, Descriptions } from 'antd';
import Shell from './components/Shell';
import Markdown from './components/Markdown';
import Cover from './components/Cover';
import Breadcrumbs from './components/Breadcrumbs';
import AddToCart from './components/AddToCart';
import ProductCard from './components/ProductCard';
import WishlistButton from './components/WishlistButton';
import Reviews from './components/Reviews';
import { formatPrice } from '@/lib/cart';
import { getUi } from '@/data/ui';

const { Title, Paragraph, Text } = Typography;

export default function ProductLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const crumbs = [
    { title: ui.home, href: `/${lang}` },
    { title: data.parent?.title, href: data.parent?.href },
    ...(data.category ? [{ title: data.category.title, href: data.category.href }] : []),
    { title: page.title },
  ];
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Breadcrumbs items={crumbs} />
      <Row gutter={[48, 24]}>
        <Col xs={24} md={11}><Cover item={page} height={360} /></Col>
        <Col xs={24} md={13}>
          <Title>{page.title}</Title>
          <Title level={3} style={{ marginTop: 0 }}>{formatPrice(page.price, page.currency, lang)}</Title>
          <Tag color={page.stock > 0 ? 'green' : 'red'}>{page.stock > 0 ? ui.inStock : ui.outOfStock}</Tag>
          <Paragraph type="secondary" style={{ marginTop: 16 }}>{page.description}</Paragraph>
          {page.content.map((p, i) => <Markdown key={i}>{p}</Markdown>)}
          <AddToCart product={page} ui={ui} />
          <WishlistButton product={page} ui={ui} />
          <Descriptions column={1} size="small" style={{ marginTop: 24 }}>
            <Descriptions.Item label={ui.sku}><Text code>{page.sku}</Text></Descriptions.Item>
            {data.category && <Descriptions.Item label={ui.category}>{data.category.title}</Descriptions.Item>}
          </Descriptions>
        </Col>
      </Row>
      <Reviews productId={page.itemId} ui={ui} lang={lang} />
      {data.related.length > 0 && (
        <>
          <Title level={3} style={{ marginTop: 48 }}>{ui.related}</Title>
          <Row gutter={[24, 24]}>
            {data.related.map((p) => (
              <Col key={p.id} xs={24} sm={12} lg={8}><ProductCard product={p} ui={ui} lang={lang} /></Col>
            ))}
          </Row>
        </>
      )}
    </Shell>
  );
}
