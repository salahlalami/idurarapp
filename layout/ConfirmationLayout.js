'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Result, Button, List, Typography } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import { readJson, ORDERS_KEY, formatPrice } from '@/lib/cart';
import pages from '@/data/pages';
import { getUi } from '@/data/ui';

const shopSlug = (lang) => pages.find((p) => p.id === 'shop')?.translations[lang]?.slug ?? '';

function Order({ lang, ui }) {
  const id = useSearchParams().get('order');
  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    const orders = readJson(ORDERS_KEY, []);
    setOrder((Array.isArray(orders) && orders.find((o) => o.id === id)) || null);
  }, [id]);

  if (order === undefined) return null;
  if (!order) return <Result status="info" title={ui.noOrder} />;

  return (
    <Result
      status="success"
      title={ui.orderPlaced}
      subTitle={`${ui.orderNumber}: ${order.id}`}
      extra={<Link href={`/${lang}/${shopSlug(lang)}`}><Button type="primary">{ui.continueShopping}</Button></Link>}
    >
      <List
        dataSource={order.lines}
        renderItem={(l) => <List.Item extra={formatPrice(l.price * l.qty, order.currency, lang)}>{l.title} × {l.qty}</List.Item>}
      />
      {order.discount && <Typography.Paragraph type="success">{ui.discount} ({order.discount.code}): −{formatPrice(order.discount.amount, order.currency, lang)}</Typography.Paragraph>}
      <Typography.Title level={4}>{ui.total}: {formatPrice(order.total, order.currency, lang)}</Typography.Title>
    </Result>
  );
}

export default function ConfirmationLayout({ lang, alternates, navLinks }) {
  const ui = getUi(lang);
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={760}>
      <Suspense fallback={null}>
        <Order lang={lang} ui={ui} />
      </Suspense>
    </Shell>
  );
}
