'use client';

import { useState } from 'react';
import { Typography, Segmented, Row, Col, Card, Button, Tag, Table, Flex } from 'antd';
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Shell from './components/Shell';
import Testimonials from './components/Testimonials';
import { colors } from './components/theme';
import { plans, featureList, currency } from '@/data/pricing';
import { formatPrice } from '@/lib/cart';
import pages from '@/data/pages';
import { getUi } from '@/data/ui';

export default function PricingLayout({ page, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const [yearly, setYearly] = useState(false);
  const contactSlug = pages.find((p) => p.id === 'contact')?.translations[lang]?.slug;
  const contactHref = `/${lang}/${contactSlug ?? ''}`;

  const columns = [
    { title: ui.feature, dataIndex: 'feature', key: 'feature' },
    ...plans.map((p) => ({
      title: p.translations[lang]?.name || p.translations.en.name,
      key: p.id,
      align: 'center',
      render: (_, row) =>
        row.plans.includes(p.id)
          ? <CheckOutlined style={{ color: colors.accent }} aria-label={ui.included} />
          : <MinusOutlined style={{ color: colors.muted }} aria-label={ui.notIncluded} />,
    })),
  ];
  const rows = Object.entries(featureList).map(([key, labels]) => ({
    key,
    feature: labels[lang] || labels.en,
    plans: plans.filter((p) => p.features.includes(key)).map((p) => p.id),
  }));

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title style={{ textAlign: 'center' }}>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary" style={{ textAlign: 'center' }}>{page.description}</Typography.Paragraph>
      <Flex justify="center" style={{ margin: '24px 0 32px' }}>
        <Segmented
          value={yearly ? 'yearly' : 'monthly'}
          onChange={(v) => setYearly(v === 'yearly')}
          options={[{ value: 'monthly', label: ui.monthly }, { value: 'yearly', label: ui.yearly }]}
        />
      </Flex>

      <Row gutter={[24, 24]} align="stretch">
        {plans.map((p) => {
          const t = p.translations[lang] || p.translations.en;
          const amount = yearly ? p.yearly : p.price;
          return (
            <Col xs={24} md={8} key={p.id}>
              <Card
                style={{ height: '100%', borderColor: p.popular ? colors.accent : undefined }}
                title={<Flex justify="space-between" align="center">{t.name}{p.popular && <Tag color="red">{ui.mostPopular}</Tag>}</Flex>}
              >
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {amount === null ? ui.custom : formatPrice(amount, currency, lang)}
                  {amount !== null && <Typography.Text type="secondary" style={{ fontSize: 14 }}> {ui.perMonth}</Typography.Text>}
                </Typography.Title>
                <Typography.Text type="secondary">{yearly && amount ? ui.yearlyNote : ' '}</Typography.Text>
                <Typography.Paragraph style={{ marginTop: 12 }}>{t.blurb}</Typography.Paragraph>
                <Link href={contactHref}>
                  <Button type={p.popular ? 'primary' : 'default'} block>{t.cta}</Button>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Typography.Title level={3} style={{ marginTop: 48 }}>{ui.compareFeatures}</Typography.Title>
      <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 'max-content' }} />
      <Testimonials lang={lang} ui={ui} />
    </Shell>
  );
}
