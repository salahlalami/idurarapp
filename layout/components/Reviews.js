'use client';

import { useEffect, useState } from 'react';
import { Typography, Rate, Form, Input, Button, List, Alert } from 'antd';
import { REVIEWS_KEY, readJson, writeJson } from '@/lib/cart';

// Demo reviews: stored only in this browser, keyed by product id.
export default function Reviews({ productId, ui, lang }) {
  const [all, setAll] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const v = readJson(REVIEWS_KEY, {});
    setAll(v && typeof v === 'object' && !Array.isArray(v) ? v : {});
  }, []);

  const list = Array.isArray(all[productId]) ? all[productId] : [];
  const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;

  const onFinish = ({ name, rating, comment }) => {
    const next = { ...all, [productId]: [{ name, rating, comment, date: new Date().toISOString() }, ...list].slice(0, 50) };
    setAll(next);
    writeJson(REVIEWS_KEY, next);
    form.resetFields();
  };

  const req = { required: true, message: ui.required };

  return (
    <section style={{ marginTop: 48 }}>
      <Typography.Title level={3}>{ui.reviews}</Typography.Title>
      {list.length > 0 && <Rate disabled allowHalf value={Math.round(avg * 2) / 2} aria-label={`${avg.toFixed(1)} / 5`} />}
      <List
        locale={{ emptyText: ui.noReviews }}
        dataSource={list}
        renderItem={(r) => (
          <List.Item>
            <List.Item.Meta
              title={<>{r.name} <Rate disabled value={r.rating} style={{ fontSize: 12 }} /></>}
              description={<>{r.comment}<br /><Typography.Text type="secondary">{new Date(r.date).toLocaleDateString(lang)}</Typography.Text></>}
            />
          </List.Item>
        )}
      />
      <Typography.Title level={4} style={{ marginTop: 24 }}>{ui.writeReview}</Typography.Title>
      <Alert type="info" showIcon message={ui.reviewNotice} style={{ marginBottom: 16, maxWidth: 560 }} />
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} style={{ maxWidth: 560 }}>
        <Form.Item name="name" label={ui.yourName} rules={[req]}><Input /></Form.Item>
        <Form.Item name="rating" label={ui.rating} rules={[req]}><Rate /></Form.Item>
        <Form.Item name="comment" label={ui.yourReview} rules={[req]}><Input.TextArea rows={3} /></Form.Item>
        <Button type="primary" htmlType="submit">{ui.submitReview}</Button>
      </Form>
    </section>
  );
}
