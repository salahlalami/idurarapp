'use client';

import { Typography, Tag, Row, Col, Descriptions, Button, Space } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import Markdown from './components/Markdown';
import Cover from './components/Cover';
import Breadcrumbs from './components/Breadcrumbs';
import ContentCard from './components/ContentCard';
import { getUi } from '@/data/ui';

const { Title, Paragraph } = Typography;

export default function PortfolioItemLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Breadcrumbs items={[{ title: ui.home, href: `/${lang}` }, { title: data.parent?.title, href: data.parent?.href }, { title: page.title }]} />
      <Cover item={page} height={320} />
      <Row gutter={[48, 24]} style={{ marginTop: 32 }}>
        <Col xs={24} md={15}>
          <Title>{page.title}</Title>
          <Paragraph type="secondary">{page.description}</Paragraph>
          {page.content.map((p, i) => <Markdown key={i}>{p}</Markdown>)}
          {page.url && <Button type="primary" href={page.url} target="_blank" rel="noopener noreferrer">{ui.visitSite}</Button>}
        </Col>
        <Col xs={24} md={9}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={ui.client}>{page.client}</Descriptions.Item>
            <Descriptions.Item label={ui.role}>{page.role}</Descriptions.Item>
            <Descriptions.Item label={ui.year}>{page.year}</Descriptions.Item>
            <Descriptions.Item label={ui.stack}><Space wrap>{page.stack?.map((s) => <Tag key={s}>{s}</Tag>)}</Space></Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={16} style={{ margin: '48px 0 24px' }}>
        <Col span={12}><Link href={data.prev.href}>← {ui.previous}: {data.prev.title}</Link></Col>
        <Col span={12} style={{ textAlign: 'end' }}><Link href={data.next.href}>{ui.next}: {data.next.title} →</Link></Col>
      </Row>
      <Title level={3}>{ui.related}</Title>
      <Row gutter={[24, 24]}>
        {data.related.map((p) => (
          <Col key={p.id} xs={24} md={12}><ContentCard item={p} meta={`${p.client} · ${p.year}`} cta={ui.viewProject} /></Col>
        ))}
      </Row>
    </Shell>
  );
}
