'use client';

import { Row, Col, Card, Typography, Flex } from 'antd';
import { testimonials, clients } from '@/data/testimonials';
import { colors } from './theme';

export default function Testimonials({ lang, ui }) {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px, 6vw, 72px) 24px' }}>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>{ui.trustedBy}</Typography.Title>
      <Flex wrap justify="center" gap="12px 40px" style={{ margin: '16px 0 40px' }}>
        {clients.map((c) => (
          <Typography.Text key={c} strong style={{ color: colors.muted, fontSize: 18, letterSpacing: '.02em' }}>{c}</Typography.Text>
        ))}
      </Flex>
      <Row gutter={[24, 24]}>
        {testimonials.map((t) => {
          const tr = t.translations[lang] || t.translations.en;
          return (
            <Col key={t.id} xs={24} md={8}>
              <Card variant="borderless" style={{ background: colors.soft, height: '100%' }}>
                <Typography.Paragraph style={{ fontSize: 16 }}>“{tr.quote}”</Typography.Paragraph>
                <Typography.Text strong>{t.name}</Typography.Text>
                <br />
                <Typography.Text type="secondary">{tr.role}, {t.company}</Typography.Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
}
