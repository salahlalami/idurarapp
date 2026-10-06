'use client';

import { useEffect, useState } from 'react';
import { Typography, Collapse, List, Empty, Button, Tag } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import { readJson, formatPrice, ORDERS_KEY } from '@/lib/cart';
import pages from '@/data/pages';
import { getUi } from '@/data/ui';

export default function OrdersLayout({ page, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const [orders, setOrders] = useState(undefined);
  const shop = pages.find((p) => p.id === 'shop')?.translations[lang]?.slug ?? '';

  useEffect(() => {
    const v = readJson(ORDERS_KEY, []);
    setOrders(Array.isArray(v) ? v : []);
  }, []);

  const items = (orders || []).map((o) => ({
    key: o.id,
    label: (
      <>
        <strong>{o.id}</strong>{' '}
        <Typography.Text type="secondary">{new Date(o.createdAt).toLocaleDateString(lang)}</Typography.Text>{' '}
        <Tag>{formatPrice(o.total, o.currency, lang)}</Tag>
      </>
    ),
    children: (
      <>
        <List
          size="small"
          dataSource={o.lines}
          renderItem={(l) => <List.Item extra={formatPrice(l.price * l.qty, o.currency, lang)}>{l.title} × {l.qty}</List.Item>}
        />
        {o.discount && <Typography.Paragraph type="success" style={{ marginTop: 12 }}>{ui.discount} ({o.discount.code}): −{formatPrice(o.discount.amount, o.currency, lang)}</Typography.Paragraph>}
      </>
    ),
  }));

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={800}>
      <Typography.Title>{page.title}</Typography.Title>
      {orders && orders.length === 0 ? (
        <Empty description={ui.noOrders}>
          <Link href={`/${lang}/${shop}`}><Button type="primary">{ui.continueShopping}</Button></Link>
        </Empty>
      ) : (
        <Collapse items={items} />
      )}
    </Shell>
  );
}
