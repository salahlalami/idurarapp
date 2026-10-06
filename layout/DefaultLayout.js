'use client';

import { Typography } from 'antd';
import Shell from './components/Shell';
import Markdown from './components/Markdown';

const { Title } = Typography;

export default function DefaultLayout({ page, lang, alternates, navLinks }) {
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={820}>
      {!/^#\s/.test(page.content[0] || '') && (
        <Title style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-.02em' }}>{page.title}</Title>
      )}
      {page.content.map((p, i) => (
        <Markdown key={i} size={17}>{p}</Markdown>
      ))}
    </Shell>
  );
}
