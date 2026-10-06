'use client';

import { Typography, Collapse } from 'antd';
import Shell from './components/Shell';
import Markdown from './components/Markdown';
import faq from '@/data/faq';

export default function FaqLayout({ page, lang, alternates, navLinks }) {
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={800}>
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>
      {faq.map((g) => (
        <section key={g.id} style={{ marginTop: 32 }}>
          <Typography.Title level={3}>{g.translations[lang] || g.translations.en}</Typography.Title>
          <Collapse
            items={g.items.map((it, i) => {
              const t = it[lang] || it.en;
              return { key: `${g.id}-${i}`, label: t.q, children: <Markdown inline>{t.a}</Markdown> };
            })}
          />
        </section>
      ))}
    </Shell>
  );
}
