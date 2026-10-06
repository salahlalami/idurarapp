'use client';

import { Form, Input, InputNumber, Button, Typography, Row, Col, Alert, Select, Radio } from 'antd';
import Shell from './components/Shell';
import { contactEmail } from '@/config/website';
import { getUi } from '@/data/ui';

export default function ClassifiedFormLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const [form] = Form.useForm();
  const cat = Form.useWatch('category', form);
  const subs = data.categories.find((c) => c.id === cat)?.children || [];
  const req = { required: true, message: ui.required };

  // No backend: hand the ad to the visitor's email app for review.
  const onFinish = (v) => {
    const catName = data.categories.find((c) => c.id === v.category);
    const lines = [
      `${ui.posterType}: ${ui[v.posterType]}`,
      `${ui.category}: ${catName?.name} / ${catName?.children.find((s) => s.id === v.subCategory)?.name}`,
      `${ui.adTitle}: ${v.title}`,
      `${ui.adPrice}: ${v.price} ${v.currency}`,
      `${ui.condition}: ${v.condition || '-'}`,
      `${ui.location}: ${v.location}`,
      `${ui.adContactName}: ${v.name}`,
      `${ui.email}: ${v.email}`,
      `${ui.adPhone}: ${v.phone || '-'}`,
      `${ui.adImages}:\n${v.images || '-'}`,
      '',
      v.description,
    ];
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`${ui.postAd}: ${v.title}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={760}>
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>
      <Alert type="info" showIcon message={`${ui.adNotice} ${ui.adAnswerAfter}`} style={{ marginBottom: 24 }} />
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} initialValues={{ posterType: 'person', currency: 'USD' }}>
        <Form.Item name="posterType" label={ui.posterType}>
          <Radio.Group optionType="button" options={[{ value: 'person', label: ui.person }, { value: 'company', label: ui.company }]} />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="category" label={ui.category} rules={[req]}>
              <Select options={data.categories.map((c) => ({ value: c.id, label: c.name }))} onChange={() => form.setFieldValue('subCategory', undefined)} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="subCategory" label={ui.subCategory} rules={[req]}>
              <Select disabled={!cat} options={subs.map((c) => ({ value: c.id, label: c.name }))} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="title" label={ui.adTitle} rules={[req]}><Input maxLength={80} showCount /></Form.Item>
        <Form.Item name="description" label={ui.adDescription} rules={[req]}><Input.TextArea rows={5} /></Form.Item>
        <Row gutter={16}>
          <Col xs={12} sm={8}><Form.Item name="price" label={ui.adPrice} rules={[req]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
          <Col xs={12} sm={4}><Form.Item name="currency" label={ui.adCurrency}><Select options={['USD', 'EUR', 'MAD'].map((c) => ({ value: c, label: c }))} /></Form.Item></Col>
          <Col xs={12} sm={6}><Form.Item name="condition" label={ui.condition}><Select allowClear options={[{ value: 'new', label: ui.conditionNew }, { value: 'used', label: ui.conditionUsed }]} /></Form.Item></Col>
          <Col xs={12} sm={6}><Form.Item name="location" label={ui.location} rules={[req]}><Input /></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}><Form.Item name="name" label={ui.adContactName} rules={[req]}><Input autoComplete="name" /></Form.Item></Col>
          <Col xs={24} sm={12}><Form.Item name="email" label={ui.email} rules={[req, { type: 'email', message: ui.invalidEmail }]}><Input autoComplete="email" /></Form.Item></Col>
          <Col xs={24} sm={12}><Form.Item name="phone" label={ui.adPhone}><Input autoComplete="tel" /></Form.Item></Col>
        </Row>
        <Form.Item name="images" label={ui.adImages}><Input.TextArea rows={3} /></Form.Item>
        <Button type="primary" htmlType="submit" size="large">{ui.submitAd}</Button>
      </Form>
    </Shell>
  );
}
