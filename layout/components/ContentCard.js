'use client';

import { Card, Tag, Typography } from 'antd';
import Link from 'next/link';
import Cover from './Cover';

// Generic card for blog posts, portfolio showcases and categories.
export default function ContentCard({ item, meta, tags = [], cta }) {
  return (
    <Link href={item.href} style={{ display: 'block', height: '100%' }}>
      <Card hoverable styles={{ body: { padding: 20 } }} style={{ height: '100%', overflow: 'hidden', borderColor: '#eceef1' }} cover={<Cover item={item} radius={0} />}>
        {meta && <Typography.Text type="secondary">{meta}</Typography.Text>}
        <Typography.Title level={4} style={{ marginTop: 4 }}>{item.title}</Typography.Title>
        <Typography.Paragraph type="secondary">{item.description}</Typography.Paragraph>
        {tags.map((t) => <Tag key={t}>{t}</Tag>)}
        {cta && <div style={{ marginTop: 8, color: 'var(--ant-color-primary)', fontWeight: 500 }}>{cta}</div>}
      </Card>
    </Link>
  );
}
