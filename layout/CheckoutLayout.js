'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Radio, Button, Typography, Row, Col, Card, Alert, List, Empty } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import { useCart } from './components/CartProvider';
import { detailLines, subtotal, formatPrice, newOrderId, applyDiscount, readJson, writeJson, ORDERS_KEY } from '@/lib/cart';
import discounts from '@/data/discounts';
import pages from '@/data/pages';
import { getUi } from '@/data/ui';

const slugOf = (id, lang) => pages.find((p) => p.id === id)?.translations[lang]?.slug;

export default function CheckoutLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const router = useRouter();
  const { lines, ready, clear, code } = useCart();
  const rows = detailLines(lines, data.products);
  const currency = data.products[0]?.currency || 'USD';
  const fmt = (n) => formatPrice(n, currency, lang);
  const sub = subtotal(rows);
  const disc = applyDiscount(code, discounts, sub);
  const total = sub - disc.amount;

  const confirmationHref = `/${lang}/${slugOf('order-confirmation', lang)}`;

  // Prefetch so the redirect after placing an order is instant.
  useEffect(() => { router.prefetch(confirmationHref); }, [router, confirmationHref]);

  const onFinish = (values) => {
    const order = {
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      currency,
      customer: values,
      lines: rows.map((r) => ({ id: r.id, title: r.product.title, price: r.product.price, qty: r.qty })),
      discount: disc.valid ? { code: disc.code, amount: disc.amount } : null,
      total,
    };
    const orders = readJson(ORDERS_KEY, []);
    writeJson(ORDERS_KEY, [order, ...(Array.isArray(orders) ? orders : [])].slice(0, 20));
    clear();
    router.push(`${confirmationHref}?order=${order.id}`);
  };

  const req = { required: true, message: ui.required };

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title>{page.title}</Typography.Title>
      {ready && rows.length === 0 ? (
        <Empty description={ui.cartEmpty}>
          <Link href={`/${lang}/${slugOf('shop', lang) ?? ''}`}><Button type="primary">{ui.continueShopping}</Button></Link>
        </Empty>
      ) : (
        <Row gutter={[32, 24]}>
          <Col xs={24} md={14}>
            <Alert type="info" showIcon message={ui.demoNotice} style={{ marginBottom: 24 }} />
            <Form layout="vertical" onFinish={onFinish} initialValues={{ payment: 'cod' }} requiredMark={false}>
              <Form.Item name="name" label={ui.fullName} rules={[req]}><Input autoComplete="name" /></Form.Item>
              <Form.Item name="email" label={ui.email} rules={[req, { type: 'email', message: ui.invalidEmail }]}><Input autoComplete="email" /></Form.Item>
              <Form.Item name="phone" label={ui.phone} rules={[req]}><Input autoComplete="tel" /></Form.Item>
              <Form.Item name="address" label={ui.address} rules={[req]}><Input autoComplete="street-address" /></Form.Item>
              <Row gutter={16}>
                <Col span={12}><Form.Item name="city" label={ui.city} rules={[req]}><Input autoComplete="address-level2" /></Form.Item></Col>
                <Col span={12}><Form.Item name="country" label={ui.country} rules={[req]}><Input autoComplete="country-name" /></Form.Item></Col>
              </Row>
              <Form.Item name="payment" label={ui.payment}>
                <Radio.Group options={[{ value: 'cod', label: ui.cod }, { value: 'bank', label: ui.bankTransfer }]} />
              </Form.Item>
              <Button type="primary" htmlType="submit" size="large" disabled={!ready || rows.length === 0}>{ui.placeOrder}</Button>
            </Form>
          </Col>
          <Col xs={24} md={10}>
            <Card title={ui.orderSummary}>
              <List
                dataSource={rows}
                renderItem={(r) => (
                  <List.Item extra={fmt(r.total)}>{r.product.title} × {r.qty}</List.Item>
                )}
              />
              {disc.valid && <Typography.Paragraph type="success">{ui.discount} ({disc.code}): −{fmt(disc.amount)}</Typography.Paragraph>}
              <Typography.Title level={4} style={{ marginBottom: 0 }}>{ui.total}: {fmt(total)}</Typography.Title>
            </Card>
          </Col>
        </Row>
      )}
    </Shell>
  );
}
