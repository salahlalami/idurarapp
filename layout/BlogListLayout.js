'use client';

import { useState } from 'react';
import { Row, Col, Typography, Tag, Space } from 'antd';
import Shell from './components/Shell';
import ContentCard from './components/ContentCard';
import { getUi } from '@/data/ui';

export default function BlogListLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const [tag, setTag] = useState(null);
  const tags = [...new Set(data.posts.flatMap((p) => p.tags || []))];
  const posts = tag ? data.posts.filter((p) => p.tags?.includes(tag)) : data.posts;

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>
      <Space wrap style={{ marginBottom: 24 }}>
        <Tag.CheckableTag checked={!tag} onChange={() => setTag(null)}>{ui.all}</Tag.CheckableTag>
        {tags.map((t) => (
          <Tag.CheckableTag key={t} checked={tag === t} onChange={() => setTag(tag === t ? null : t)}>{t}</Tag.CheckableTag>
        ))}
      </Space>
      <Row gutter={[24, 24]}>
        {posts.map((p) => (
          <Col key={p.id} xs={24} md={12} lg={8}>
            <ContentCard item={p} meta={p.date} tags={p.tags} cta={ui.readMore} />
          </Col>
        ))}
      </Row>
    </Shell>
  );
}
