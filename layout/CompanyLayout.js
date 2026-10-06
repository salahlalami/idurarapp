'use client';

import { Row, Col, Typography, Button, Descriptions, Space, Tag, Card } from 'antd';
import { GlobalOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Shell from './components/Shell';
import Markdown from './components/Markdown';
import Breadcrumbs from './components/Breadcrumbs';
import CompanyCard, { CompanyLogo } from './components/CompanyCard';
import { getUi } from '@/data/ui';

export default function CompanyLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={960}>
      <Breadcrumbs
        items={[
          { title: ui.home, href: `/${lang}` },
          { title: data.parent?.title, href: data.parent?.href },
          { title: data.category?.title, href: data.category?.href },
          { title: data.sub?.title, href: data.sub?.href },
          { title: page.title },
        ]}
      />
      <Space size={24} align="center" style={{ marginBottom: 24 }}>
        <CompanyLogo company={page} size={96} />
        <div>
          <Typography.Title style={{ margin: 0 }}>{page.title}</Typography.Title>
          <Typography.Text type="secondary">{page.city}, {page.country}</Typography.Text>
        </div>
      </Space>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={15}>
          <Typography.Title level={4}>{ui.about}</Typography.Title>
          <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>
          {page.content.map((p, i) => <Markdown key={i}>{p}</Markdown>)}
          <div>{page.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        </Col>
        <Col xs={24} md={9}>
          <Card title={ui.contactDetails} style={{ borderColor: '#eceef1' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label={ui.location}>{page.city}, {page.country}</Descriptions.Item>
              <Descriptions.Item label={ui.founded}>{page.founded}</Descriptions.Item>
              <Descriptions.Item label={ui.employees}>{page.employees}</Descriptions.Item>
            </Descriptions>
            <Space direction="vertical" style={{ width: '100%' }}>
              <a href={page.website} target="_blank" rel="noopener noreferrer nofollow"><Button block type="primary" icon={<GlobalOutlined />}>{ui.visitSite}</Button></a>
              <a href={`mailto:${page.email}`}><Button block icon={<MailOutlined />}>{page.email}</Button></a>
              <a href={`tel:${page.phone.replace(/\s/g, '')}`}><Button block icon={<PhoneOutlined />}>{page.phone}</Button></a>
            </Space>
          </Card>
        </Col>
      </Row>

      {data.related.length > 0 && (
        <>
          <Typography.Title level={3} style={{ marginTop: 48 }}>{ui.similarCompanies}</Typography.Title>
          <Row gutter={[24, 24]}>
            {data.related.map((c) => <Col key={c.id} xs={24} md={8}><CompanyCard company={c} /></Col>)}
          </Row>
        </>
      )}
    </Shell>
  );
}
