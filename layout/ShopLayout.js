'use client';

import { Row, Col, Typography, Menu } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import ProductCard from './components/ProductCard';
import Breadcrumbs from './components/Breadcrumbs';
import { getUi } from '@/data/ui';

// Used for both the shop index (all products) and a category page (page.layout === 'category').
export default function ShopLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const isCategory = page.layout === 'category';
  const shopHref = data.parent?.href ?? alternates[lang];
  const menuItems = [
    { key: 'all', label: <Link href={shopHref}>{ui.all}</Link> },
    ...data.categories.map((c) => ({ key: c.itemId, label: <Link href={c.href}>{c.title}</Link> })),
  ];

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      {isCategory && (
        <Breadcrumbs items={[{ title: ui.home, href: `/${lang}` }, { title: data.parent?.title, href: shopHref }, { title: page.title }]} />
      )}
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>
      <Row gutter={[32, 24]}>
        <Col xs={24} md={6}>
          <Typography.Title level={5}>{ui.categories}</Typography.Title>
          <Menu mode="inline" selectedKeys={[isCategory ? page.itemId : 'all']} items={menuItems} />
        </Col>
        <Col xs={24} md={18}>
          {data.products.length === 0 && <Typography.Text type="secondary">{ui.noResults}</Typography.Text>}
          <Row gutter={[24, 24]}>
            {data.products.map((p) => (
              <Col key={p.id} xs={24} sm={12} lg={8}><ProductCard product={p} ui={ui} lang={lang} /></Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Shell>
  );
}
