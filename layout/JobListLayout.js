'use client';

import { useState } from 'react';
import { Row, Col, Typography, Tag, Space, Empty } from 'antd';
import Shell from './components/Shell';
import ContentCard from './components/ContentCard';
import { getUi } from '@/data/ui';

export default function JobListLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const [dept, setDept] = useState(null);
  const depts = [...new Set(data.jobs.map((j) => j.department))];
  const jobs = dept ? data.jobs.filter((j) => j.department === dept) : data.jobs;

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>
      <Space wrap style={{ marginBottom: 24 }}>
        <Tag.CheckableTag checked={!dept} onChange={() => setDept(null)}>{ui.all}</Tag.CheckableTag>
        {depts.map((d) => (
          <Tag.CheckableTag key={d} checked={dept === d} onChange={() => setDept(dept === d ? null : d)}>{d}</Tag.CheckableTag>
        ))}
      </Space>
      {jobs.length === 0 ? (
        <Empty description={ui.noOpenings} />
      ) : (
        <Row gutter={[24, 24]}>
          {jobs.map((j) => (
            <Col key={j.id} xs={24} md={12} lg={8}>
              <ContentCard item={j} meta={`${j.location} · ${ui[j.type === 'PART_TIME' ? 'partTime' : 'fullTime']}`} tags={[j.department]} cta={ui.viewJob} />
            </Col>
          ))}
        </Row>
      )}
    </Shell>
  );
}
