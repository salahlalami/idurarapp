'use client';

import { Typography, Button, Descriptions } from 'antd';
import Shell from './components/Shell';
import Markdown from './components/Markdown';
import Breadcrumbs from './components/Breadcrumbs';
import { contactEmail } from '@/config/website';
import { getUi } from '@/data/ui';

const { Title, Paragraph } = Typography;

export default function JobLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const applyHref = `mailto:${contactEmail}?subject=${encodeURIComponent(`${ui.application}: ${page.title}`)}`;
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={760}>
      <Breadcrumbs items={[{ title: ui.home, href: `/${lang}` }, { title: data.parent?.title, href: data.parent?.href }, { title: page.title }]} />
      <Title>{page.title}</Title>
      <Descriptions column={1} size="small" style={{ marginBottom: 16 }}>
        <Descriptions.Item label={ui.department}>{page.department}</Descriptions.Item>
        <Descriptions.Item label={ui.location}>{page.location}</Descriptions.Item>
        <Descriptions.Item label={ui.employmentType}>{ui[page.type === 'PART_TIME' ? 'partTime' : 'fullTime']}</Descriptions.Item>
        <Descriptions.Item label={ui.postedOn}>{page.postedOn}</Descriptions.Item>
      </Descriptions>
      <Paragraph type="secondary">{page.description}</Paragraph>
      {page.content.map((p, i) => <Markdown key={i}>{p}</Markdown>)}
      <a href={applyHref}><Button type="primary" size="large">{ui.applyNow}</Button></a>
      <Paragraph type="secondary" style={{ marginTop: 12 }}>{ui.applyNotice}</Paragraph>
    </Shell>
  );
}
