'use client';

import { useState } from 'react';
import { Row, Col, Typography, Card, Input, Empty, Tag, Space } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import Breadcrumbs from './components/Breadcrumbs';
import CompanyCard from './components/CompanyCard';
import { getUi } from '@/data/ui';

// Serves three layouts: directory (all categories), directoryCategory and directorySub.
export default function DirectoryLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const [q, setQ] = useState('');
  const isIndex = page.layout === 'directory';
  const isSub = page.layout === 'directorySub';

  const subsOf = (catId) => data.subcategories.filter((s) => s.category === catId);
  const countOf = (subId) => (data.companies || []).filter((c) => c.sub === subId).length;
  const needle = q.trim().toLowerCase();
  const companies = (data.companies || []).filter(
    (c) => !needle || [c.title, c.description, c.city, c.country, ...c.tags].join(' ').toLowerCase().includes(needle),
  );

  const crumbs = [{ title: ui.home, href: `/${lang}` }];
  if (!isIndex) crumbs.push({ title: data.parent?.title, href: data.parent?.href });
  if (isSub) crumbs.push({ title: data.category?.title, href: data.category?.href });
  crumbs.push({ title: page.title });

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      {!isIndex && <Breadcrumbs items={crumbs} />}
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>

      {isIndex && (
        <Row gutter={[24, 24]}>
          {data.categories.map((cat) => (
            <Col key={cat.id} xs={24} md={12} lg={8}>
              <Card style={{ height: '100%', borderColor: '#eceef1', borderTop: `3px solid ${cat.color}` }}>
                <Typography.Title level={4} style={{ marginTop: 0 }}><Link href={cat.href}>{cat.title}</Link></Typography.Title>
                <Typography.Paragraph type="secondary">{cat.description}</Typography.Paragraph>
                <Space direction="vertical" size={4}>
                  {subsOf(cat.itemId).map((s) => (
                    <Link key={s.id} href={s.href}>{s.title} <Tag>{countOf(s.itemId)}</Tag></Link>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {page.layout === 'directoryCategory' && (
        <>
          <Typography.Title level={4}>{ui.subcategories}</Typography.Title>
          <Space wrap style={{ marginBottom: 32 }}>
            {data.subcategories.map((s) => (
              <Link key={s.id} href={s.href}><Tag color="blue" style={{ fontSize: 14, padding: '4px 12px' }}>{s.title} ({countOf(s.itemId)})</Tag></Link>
            ))}
          </Space>
        </>
      )}

      {isSub && (
        <Space wrap style={{ marginBottom: 24 }}>
          {data.siblings.map((s) => (
            <Link key={s.id} href={s.href}><Tag color={s.itemId === page.itemId ? 'blue' : undefined} style={{ fontSize: 14, padding: '4px 12px' }}>{s.title}</Tag></Link>
          ))}
        </Space>
      )}

      {!isIndex && (
        <>
          <Input.Search allowClear placeholder={ui.filterCompanies} value={q} onChange={(e) => setQ(e.target.value)} style={{ maxWidth: 420, marginBottom: 24 }} />
          {companies.length === 0 ? (
            <Empty description={ui.noCompanies} />
          ) : (
            <Row gutter={[24, 24]}>
              {companies.map((c) => (
                <Col key={c.id} xs={24} md={12} lg={8}><CompanyCard company={c} /></Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Shell>
  );
}
