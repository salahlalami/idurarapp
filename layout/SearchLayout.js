'use client';

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, List, Tag, Typography } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import { getUi } from '@/data/ui';

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function Results({ data, lang, ui, page }) {
  const router = useRouter();
  const q = useSearchParams().get('q') || '';
  const typeLabel = { blog: ui.typeBlog, portfolio: ui.typePortfolio, product: ui.typeProduct, page: ui.typePage, news: ui.typeNews, job: ui.typeJob, company: ui.typeCompany };

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return data.index.filter((i) => {
      const hay = norm(`${i.title} ${i.description} ${i.tags.join(' ')}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [q, data.index]);

  return (
    <>
      <Input.Search
        key={q}
        size="large"
        allowClear
        autoFocus
        defaultValue={q}
        placeholder={ui.searchPlaceholder}
        onSearch={(v) => router.replace(`/${lang}/${page.slug}${v.trim() ? `?q=${encodeURIComponent(v.trim())}` : ''}`)}
        style={{ margin: '16px 0 24px' }}
      />
      {!q.trim() ? (
        <Typography.Text type="secondary">{ui.searchHint}</Typography.Text>
      ) : (
        <>
          <Typography.Text type="secondary">{results.length} {ui.resultsFor}</Typography.Text>
          <List
            locale={{ emptyText: ui.noResults }}
            dataSource={results}
            renderItem={(r) => (
              <List.Item>
                <List.Item.Meta
                  title={<Link href={r.href}>{r.title}</Link>}
                  description={r.description}
                />
                <Tag>{typeLabel[r.type]}</Tag>
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
}

export default function SearchLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={800}>
      <Typography.Title>{page.title}</Typography.Title>
      <Suspense fallback={null}>
        <Results data={data} lang={lang} ui={ui} page={page} />
      </Suspense>
    </Shell>
  );
}
