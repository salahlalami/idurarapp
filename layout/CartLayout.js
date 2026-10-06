'use client';

import { useState } from 'react';
import { Table, Typography, Button, InputNumber, Space, Empty, Flex, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Shell from './components/Shell';
import { useCart } from './components/CartProvider';
import { detailLines, subtotal, formatPrice, applyDiscount, MAX_QTY } from '@/lib/cart';
import discounts from '@/data/discounts';
import pages from '@/data/pages';
import { getUi } from '@/data/ui';

const slugOf = (id, lang) => pages.find((p) => p.id === id)?.translations[lang]?.slug;

export default function CartLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const { lines, ready, setQty, remove, clear, code, setCode } = useCart();
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);
  const rows = detailLines(lines, data.products);
  const currency = data.products[0]?.currency || 'USD';
  const fmt = (n) => formatPrice(n, currency, lang);

  const sub = subtotal(rows);
  const disc = applyDiscount(code, discounts, sub);

  const onApply = (v) => {
    const r = applyDiscount(v, discounts, sub);
    setCodeError(!r.valid);
    if (r.valid) { setCode(r.code); setCodeInput(''); }
  };

  const columns = [
    { title: ui.products, dataIndex: 'product', render: (p) => <Link href={p.href}>{p.title}</Link> },
    { title: ui.price, dataIndex: 'product', render: (p) => fmt(p.price) },
    {
      title: ui.quantity,
      dataIndex: 'qty',
      render: (q, r) => <InputNumber min={1} max={MAX_QTY} value={q} onChange={(v) => setQty(r.id, v || 1)} aria-label={ui.quantity} />,
    },
    { title: ui.total, dataIndex: 'total', render: fmt },
    { title: '', render: (_, r) => <Button type="text" danger icon={<DeleteOutlined />} aria-label={ui.remove} onClick={() => remove(r.id)} /> },
  ];

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Flex justify="space-between" align="center" wrap>
        <Typography.Title>{page.title}</Typography.Title>
        <Space wrap>
          <Link href={`/${lang}/${slugOf('wishlist', lang)}`}><Button type="link">{ui.wishlist}</Button></Link>
          <Link href={`/${lang}/${slugOf('orders', lang)}`}><Button type="link">{ui.myOrders}</Button></Link>
        </Space>
      </Flex>
      {ready && rows.length === 0 ? (
        <Empty description={ui.cartEmpty}>
          <Link href={`/${lang}/${slugOf('shop', lang) ?? ''}`}><Button type="primary">{ui.continueShopping}</Button></Link>
        </Empty>
      ) : (
        <>
          <Table rowKey="id" columns={columns} dataSource={rows} pagination={false} loading={!ready} scroll={{ x: true }} />
          <Flex vertical align="flex-end" gap={12} style={{ marginTop: 24 }}>
            <Input.Search
              value={codeInput}
              onChange={(e) => { setCodeInput(e.target.value); setCodeError(false); }}
              onSearch={onApply}
              enterButton={ui.apply}
              placeholder={ui.discountCode}
              status={codeError ? 'error' : undefined}
              style={{ maxWidth: 320 }}
            />
            {codeError && <Typography.Text type="danger">{ui.invalidCode}</Typography.Text>}
            {disc.valid && (
              <Typography.Text type="success">
                {ui.discount} ({disc.code}): −{fmt(disc.amount)}{' '}
                <Button type="link" size="small" onClick={() => setCode('')}>{ui.remove}</Button>
              </Typography.Text>
            )}
            <Typography.Title level={4} style={{ margin: 0 }}>{ui.total}: {fmt(sub - disc.amount)}</Typography.Title>
            <Space wrap>
              <Button onClick={clear}>{ui.clearCart}</Button>
              <Link href={`/${lang}/${slugOf('shop', lang) ?? ''}`}><Button>{ui.continueShopping}</Button></Link>
              <Link href={`/${lang}/${slugOf('checkout', lang)}`}><Button type="primary">{ui.checkout}</Button></Link>
            </Space>
          </Flex>
        </>
      )}
    </Shell>
  );
}
