'use client';

import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Typography, Tag, Space, Empty, Input, Select, Slider, Segmented, Button, Card } from 'antd';
import Link from 'next/link';
import Shell from './components/Shell';
import Cover from './components/Cover';
import AdBadges, { formatPrice } from './components/AdBadges';
import AdFavoriteButton from './components/AdFavoriteButton';
import PostAdLink from './components/PostAdLink';
import { getUi } from '@/data/ui';

const INITIAL = { q: '', cat: '', sub: '', loc: '', cond: '', who: '', sort: 'newest', max: null };

export default function ClassifiedListLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const [f, setF] = useState(INITIAL);
  const set = (patch) => setF((p) => ({ ...p, ...patch }));

  const top = Math.max(...data.ads.map((a) => a.price), 0);
  const currency = data.ads[0]?.currency || 'USD';
  const locations = [...new Set(data.ads.map((a) => a.location))];
  const subs = data.categories.find((c) => c.id === f.cat)?.children || [];

  // Filters live in the URL (?q=&cat=…) so a search can be shared; read once on mount.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const max = sp.get('max');
    setF({ ...INITIAL, ...Object.fromEntries([...sp].filter(([k]) => k in INITIAL && k !== 'max')), max: max ? Number(max) : null });
  }, []);
  useEffect(() => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(f)) if (v && v !== INITIAL[k] && !(k === 'max' && v >= top)) sp.set(k, v);
    const qs = sp.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [f, top]);

  const ads = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const max = f.max ?? top;
    const list = data.ads.filter((a) =>
      (!q || `${a.title} ${a.description} ${a.posterName}`.toLowerCase().includes(q)) &&
      (!f.cat || a.category === f.cat) && (!f.sub || a.subCategory === f.sub) &&
      (!f.loc || a.location === f.loc) && (!f.cond || a.condition === f.cond) &&
      (!f.who || a.posterType === f.who) && a.price <= max);
    const cmp = {
      newest: (a, b) => Number(b.featured) - Number(a.featured) || b.postedOn.localeCompare(a.postedOn),
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
    }[f.sort];
    return [...list].sort(cmp);
  }, [data.ads, f, top]);

  const filtered = JSON.stringify(f) !== JSON.stringify(INITIAL);

  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{page.description}</Typography.Paragraph>
      <PostAdLink lang={lang} label={ui.postAd} />

      <Card style={{ margin: '16px 0 24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}><Input.Search allowClear placeholder={ui.searchAds} value={f.q} onChange={(e) => set({ q: e.target.value })} /></Col>
          <Col xs={12} md={4}>
            <Select style={{ width: '100%' }} value={f.cat} onChange={(cat) => set({ cat, sub: '' })} aria-label={ui.category}
              options={[{ value: '', label: ui.allCategories }, ...data.categories.map((c) => ({ value: c.id, label: c.name }))]} />
          </Col>
          <Col xs={12} md={4}>
            <Select style={{ width: '100%' }} value={f.sub} disabled={!f.cat} onChange={(sub) => set({ sub })} aria-label={ui.subCategory}
              options={[{ value: '', label: ui.allSubCategories }, ...subs.map((c) => ({ value: c.id, label: c.name }))]} />
          </Col>
          <Col xs={12} md={4}>
            <Select style={{ width: '100%' }} value={f.loc} onChange={(loc) => set({ loc })} aria-label={ui.location}
              options={[{ value: '', label: ui.allLocations }, ...locations.map((l) => ({ value: l, label: l }))]} />
          </Col>
          <Col xs={12} md={4}>
            <Select style={{ width: '100%' }} value={f.sort} onChange={(sort) => set({ sort })} aria-label={ui.sortBy}
              options={[{ value: 'newest', label: ui.sortNewest }, { value: 'priceAsc', label: ui.sortPriceAsc }, { value: 'priceDesc', label: ui.sortPriceDesc }]} />
          </Col>
          <Col xs={24} md={8}>
            <Typography.Text type="secondary">{ui.priceRange}: {formatPrice(lang, 0, currency)} – {formatPrice(lang, f.max ?? top, currency)}</Typography.Text>
            <Slider min={0} max={top} value={f.max ?? top} onChange={(max) => set({ max })} tooltip={{ formatter: (v) => formatPrice(lang, v, currency) }} />
          </Col>
          <Col xs={24} md={8}>
            <Segmented block value={f.cond} onChange={(cond) => set({ cond })}
              options={[{ value: '', label: ui.anyCondition }, { value: 'new', label: ui.conditionNew }, { value: 'used', label: ui.conditionUsed }]} />
          </Col>
          <Col xs={24} md={8}>
            <Segmented block value={f.who} onChange={(who) => set({ who })}
              options={[{ value: '', label: ui.anyPoster }, { value: 'company', label: ui.company }, { value: 'person', label: ui.person }]} />
          </Col>
        </Row>
      </Card>

      <Space style={{ marginBottom: 16 }}>
        <Typography.Text strong>{ads.length} {ui.ads}</Typography.Text>
        {filtered && <Button type="link" onClick={() => setF(INITIAL)}>{ui.resetFilters}</Button>}
      </Space>

      {ads.length === 0 ? (
        <Empty description={ui.noAds} />
      ) : (
        <Row gutter={[24, 24]}>
          {ads.map((a) => (
            <Col key={a.id} xs={24} md={12} lg={8}>
              <Card hoverable style={{ height: '100%', overflow: 'hidden', borderColor: a.featured ? '#faad14' : '#eceef1' }}
                cover={<Link href={a.href}><Cover item={{ ...a, image: a.images?.[0] }} radius={0} /></Link>}
                extra={<AdFavoriteButton ad={a} ui={ui} />} title={<Typography.Text strong style={{ fontSize: 18 }}>{formatPrice(lang, a.price, a.currency)}</Typography.Text>}>
                <Link href={a.href} style={{ color: 'inherit' }}>
                  <Typography.Title level={5} style={{ marginTop: 0 }}>{a.title}</Typography.Title>
                  <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>{a.description}</Typography.Paragraph>
                </Link>
                <Typography.Text type="secondary">{a.location} · {a.posterName}</Typography.Text>
                <div style={{ marginTop: 8 }}>
                  <AdBadges ad={a} ui={ui} />
                  <Tag>{ui[a.posterType]}</Tag>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Shell>
  );
}
