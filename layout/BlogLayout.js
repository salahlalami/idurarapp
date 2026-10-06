'use client';

import { Typography, Tag, Row, Col, Space } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import Markdown from './components/Markdown';
import Cover from './components/Cover';
import Breadcrumbs from './components/Breadcrumbs';
import { getUi } from '@/data/ui';

const { Title, Paragraph, Text } = Typography;

export default function BlogLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={760}>
      <Breadcrumbs items={[{ title: ui.home, href: `/${lang}` }, { title: data.parent?.title, href: data.parent?.href }, { title: page.title }]} />
      <article>
        <Cover item={page} height={240} />
        <Title style={{ marginTop: 24, lineHeight: 1.25 }}>{page.title}</Title>
        <Space wrap>
          <Text type="secondary">{ui.publishedOn} {page.date}</Text>
          {page.tags?.map((t) => <Tag key={t}>{t}</Tag>)}
        </Space>
        <div className="post-content" style={{ marginTop: 32 }}>
          {page.content.map((p, i) => <Markdown key={i} size={17}>{p}</Markdown>)}
        </div>
      </article>
      <Row gutter={16} style={{ marginTop: 48 }}>
        <Col span={12}>{data.prev && <Link href={data.prev.href}>← {ui.previous}: {data.prev.title}</Link>}</Col>
        <Col span={12} style={{ textAlign: 'end' }}>{data.next && <Link href={data.next.href}>{ui.next}: {data.next.title} →</Link>}</Col>
      </Row>
    </Shell>
  );
}
