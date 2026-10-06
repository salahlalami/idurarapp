'use client';

import { Card, Avatar, Tag, Typography, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Link from 'next/link';

export const initials = (name) => name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// Logo image, or colored initials when the company has none.
export function CompanyLogo({ company, size = 56 }) {
  return (
    <Avatar shape="square" size={size} src={company.logo} style={{ background: company.logo ? '#fff' : company.color, border: '1px solid #eceef1', flex: 'none' }}>
      {initials(company.title)}
    </Avatar>
  );
}

export default function CompanyCard({ company }) {
  return (
    <Link href={company.href} style={{ display: 'block', height: '100%' }}>
      <Card hoverable style={{ height: '100%', borderColor: '#eceef1' }} styles={{ body: { padding: 20 } }}>
        <Space align="start" size={16}>
          <CompanyLogo company={company} />
          <div>
            <Typography.Title level={5} style={{ margin: 0 }}>{company.title}</Typography.Title>
            <Typography.Text type="secondary"><EnvironmentOutlined /> {company.city}, {company.country}</Typography.Text>
          </div>
        </Space>
        <Typography.Paragraph type="secondary" style={{ margin: '12px 0 8px' }}>{company.description}</Typography.Paragraph>
        {company.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </Card>
    </Link>
  );
}
