'use client';

import { Layout, Typography, Flex, Row, Col, Card, Button } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import Markdown from './components/Markdown';
import { colors } from './components/theme';
import { getUi } from '@/data/ui';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const wrap = { maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 8vw, 100px) 24px' };
const GREEN = '#10b981';
const BLUE = '#2563eb';
const gradients = ['linear-gradient(135deg,#2563eb,#1d4ed8)', 'linear-gradient(135deg,#10b981,#059669)', 'linear-gradient(135deg,#f59e0b,#d97706)'];
const isIcon = (l) => l.trim().length > 0 && l.trim().length <= 8 && !/[\p{L}\p{N}]/u.test(l);
const headingOf = (l) => /^(#{1,6})\s+(.*)$/.exec(l);

// Hero: h1 / subtitle / paragraph / buttons / image, parsed from the markdown.
function parseHero(md) {
  const lines = md.split('\n');
  const h1 = [];
  let i = 0;
  if (/^#\s/.test(lines[0])) {
    h1.push(lines[0].replace(/^#\s+/, ''));
    i = 1;
    while (i < lines.length && lines[i].trim() && !/^#/.test(lines[i])) h1.push(lines[i++].trim());
  }
  const rest = lines.slice(i).join('\n');
  const sub = /^##\s+(.*)$/m.exec(rest)?.[1];
  const image = /!\[([^\]]*)\]\(([^)]+)\)/.exec(rest);
  const buttons = [...rest.matchAll(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({ text: m[1], href: m[2] }));
  const text = rest
    .split('\n')
    .filter((l) => l.trim() && !/^#/.test(l) && !/!\[/.test(l) && !/(?<!!)\[[^\]]+\]\([^)]+\)/.test(l))
    .join('\n\n');
  return { title: h1, sub, text, image, buttons };
}

// Splits "## Title\nbody" into { title, intro, items[] } (items = deeper headings).
function parseSection(md) {
  const lines = md.split('\n');
  const first = headingOf(lines[0]);
  const title = first?.[2];
  const body = lines.slice(first ? 1 : 0);
  const levels = body.map(headingOf).filter(Boolean).map((m) => m[1].length);
  const lvl = levels.length ? Math.min(...levels) : 0;
  const intro = [];
  const items = [];
  let cur = null;
  let pendingIcon = null;
  for (const l of body) {
    const h = headingOf(l);
    if (h && h[1].length === lvl) {
      cur = { icon: pendingIcon, title: h[2], lines: [] };
      pendingIcon = null;
      items.push(cur);
    } else if (cur) cur.lines.push(l);
    else intro.push(l);
  }
  // An emoji line right before an item heading belongs to that item.
  const moveIcon = (arr, target) => {
    while (arr.length && !arr[arr.length - 1].trim()) arr.pop();
    if (arr.length && isIcon(arr[arr.length - 1])) target.icon = arr.pop().trim();
  };
  items.forEach((it, k) => moveIcon(k === 0 ? intro : items[k - 1].lines, it));
  return {
    title,
    intro: intro.join('\n').trim(),
    items: items.map((it) => ({ ...it, body: it.lines.join('\n').trim() })),
  };
}

function parse(md) {
  // The hero is everything before the first h3 (its h1 may span lines and include an h2 subtitle).
  const k = md.search(/\n(?=###\s)/);
  let heroMd = md;
  let rest = '';
  if (k > 0) {
    heroMd = md.slice(0, k);
    rest = md.slice(k + 1);
  } else {
    const parts = md.split(/\n(?=## )/);
    heroMd = parts.shift();
    rest = parts.join('\n');
  }
  const sections = rest ? rest.split(/\n(?=## )/).map(parseSection) : [];
  return { hero: parseHero(heroMd), sections };
}


const linkRe = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g;
const uniqLinks = (md) => {
  const seen = new Set();
  return [...md.matchAll(linkRe)]
    .map((m) => ({ text: m[1], href: m[2] }))
    .filter((b) => !seen.has(b.href + b.text) && seen.add(b.href + b.text));
};
const stripLinks = (md) => md.split('\n').filter((l) => !/(?<!!)\[[^\]]+\]\([^)]+\)/.test(l) || /^\s*-\s/.test(l)).join('\n');

function Btn({ b, kind = 'solid', dark }) {
  const base = { display: 'inline-block', padding: '16px 32px', borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: 'none', transition: 'all .3s', border: '2px solid transparent', textAlign: 'center' };
  const styles = {
    green: { background: GREEN, color: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / .15)' },
    white: { background: '#fff', color: BLUE },
    ghost: { background: 'transparent', color: '#fff', borderColor: '#fff' },
    solid: { background: BLUE, color: '#fff', borderColor: BLUE },
    outline: { background: 'transparent', color: BLUE, borderColor: BLUE },
    outlineWhite: { background: '#fff', color: BLUE, borderColor: BLUE, minWidth: 300 },
  };
  return (
    <a href={b.href} target={b.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ ...base, ...styles[kind] }} className="idr-btn">
      {b.text}
    </a>
  );
}

function SectionHead({ s, light }) {
  const intro = s.intro.split('\n').filter((l) => !l.startsWith('|')).join('\n').trim();
  return (
    <>
      {s.title && (
        <Title level={2} style={{ textAlign: 'center', margin: '0 0 16px', fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 700, color: light ? '#fff' : '#1f2937' }}>
          {s.title}
        </Title>
      )}
      {intro && (
        <div style={{ maxWidth: 760, margin: '0 auto 56px', textAlign: 'center', color: light ? 'rgba(255,255,255,.9)' : colors.muted }}>
          <Markdown size={18}>{intro}</Markdown>
        </div>
      )}
    </>
  );
}

const hasTable = (s) => s.intro.split('\n').some((l) => l.startsWith('|'));
const tableOf = (s) => s.intro.split('\n').filter((l) => l.startsWith('|')).join('\n');

function Features({ s }) {
  return (
    <Row gutter={[40, 40]}>
      {s.items.map((it, j) => (
        <Col key={j} xs={24} md={s.items.length === 2 ? 12 : 24} lg={s.items.length === 4 ? 12 : 8}>
          <div className="idr-lift" style={{ background: '#fff', padding: 36, borderRadius: 16, border: `1px solid ${colors.line}`, boxShadow: '0 4px 6px -1px rgb(0 0 0 / .08)', height: '100%' }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 28, color: '#fff', background: gradients[j % 3] }}>
              {it.icon || j + 1}
            </div>
            <Title level={3} style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px' }}>{it.title}</Title>
            <Markdown size={15} checks>{it.body}</Markdown>
          </div>
        </Col>
      ))}
    </Row>
  );
}

function Highlights({ s }) {
  return (
    <Flex wrap justify="center" align="stretch" gap={32}>
      {s.items.map((it, j) => (
        <div key={j} className="idr-lift" style={{ flex: '1 1 260px', maxWidth: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 1px 2px rgb(0 0 0 / .06)' }}>
          <span style={{ fontSize: 56, display: 'block', marginBottom: 12, lineHeight: 1.2 }}>{it.icon}</span>
          <Title level={4} style={{ margin: '0 0 8px', fontWeight: 700 }}>{it.title}</Title>
          <Markdown size={15} inline>{it.body}</Markdown>
        </div>
      ))}
    </Flex>
  );
}

function Pricing({ s, ui }) {
  return (
    <Row gutter={[32, 40]} justify="center" align="stretch">
      {s.items.map((it, j) => {
        const lines = it.body.split('\n');
        const plain = lines.filter((l) => l.trim() && !/^\s*-\s/.test(l) && !/\]\(/.test(l));
        const [price, ...period] = plain.map((l) => l.trim());
        const list = lines.filter((l) => /^\s*-\s/.test(l)).join('\n');
        const buttons = uniqLinks(it.body);
        const featured = s.items.length === 3 && j === 1;
        return (
          <Col key={j} xs={24} md={12} lg={8}>
            <div className={`idr-lift ${featured ? 'idr-featured' : ''}`} style={{ position: 'relative', height: '100%', padding: 40, borderRadius: 16, border: `2px solid ${featured ? BLUE : colors.line}`, background: featured ? 'linear-gradient(135deg,#eff6ff,#dbeafe)' : '#fff', display: 'flex', flexDirection: 'column' }}>
              {featured && (
                <span style={{ position: 'absolute', top: -14, insetInlineStart: '50%', transform: 'translateX(-50%)', background: BLUE, color: '#fff', padding: '6px 22px', borderRadius: 20, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{ui.mostPopular}</span>
              )}
              <div style={{ textAlign: 'center' }}>
                <Title level={3} style={{ fontSize: 24, fontWeight: 600, margin: '0 0 16px' }}>{it.title}</Title>
                <div style={{ fontSize: 48, fontWeight: 800, color: BLUE, lineHeight: 1.1 }}>{price}</div>
                <div style={{ color: colors.muted, margin: '8px 0 28px' }}>{period.join(' ')}</div>
              </div>
              <div style={{ flex: 1 }}><Markdown size={15} checks>{list}</Markdown></div>
              <Flex vertical gap={12} style={{ marginTop: 24 }}>
                {buttons.map((b, k) => (
                  <Btn key={k} b={b} kind={k === 0 ? 'solid' : 'outline'} />
                ))}
              </Flex>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default function HomeLayout({ page, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const { hero, sections } = parse(page.content.join('\n\n'));
  const last = sections.length > 1 ? sections[sections.length - 1] : null;
  const body = last ? sections.slice(0, -1) : sections;
  const pricingAt = body.findIndex((s) => /buy\.stripe\.com|\$\s?\d/.test(s.items.map((i) => i.body).join(' ')) && s.items.some((i) => /\]\(/.test(i.body)));
  const ctaLinks = last ? uniqLinks(last.intro) : [];
  const ctaText = last?.intro.split('\n').filter((l) => l.trim() && !/\]\(/.test(l)).join(' ');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <section style={{ background: "#f9fafc url('/images/hero-bg.png') center top / cover no-repeat" }}>
          <Header lang={lang} alternates={alternates} navLinks={navLinks} floating />
          <div style={{ ...wrap, paddingBlock: 'clamp(40px, 6vw, 80px)' }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12} style={{ textAlign: 'center' }}>
                <Title style={{ color: '#0a143c', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
                  {hero.title.map((t, i) => (
                    <span key={i} style={{ display: 'block' }}>{t}</span>
                  ))}
                </Title>
                {hero.sub && (
                  <Title level={2} style={{ color: BLUE, margin: '20px 0 0', fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 700 }}>{hero.sub}</Title>
                )}
                {hero.text && (
                  <Paragraph style={{ color: '#0a143c', fontSize: 18, marginTop: 20 }}>{hero.text}</Paragraph>
                )}
                <Flex vertical align="center" gap={16} style={{ marginTop: 32 }}>
                  {hero.buttons.map((b, i) => (
                    <Btn key={b.href + i} b={b} kind={i === 0 ? 'green' : 'outlineWhite'} />
                  ))}
                </Flex>
              </Col>
              {hero.image && (
                <Col xs={24} lg={12}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hero.image[2]} alt={hero.image[1]} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </Col>
              )}
            </Row>
          </div>
        </section>

        {body.map((s, i) => {
          const isPricing = i === pricingAt;
          const feature = s.items.length > 0 && s.items.some((it) => /^\s*-\s/m.test(it.body));
          const highlights = s.items.length > 0 && !feature && !isPricing;
          const table = hasTable(s);
          const bg = highlights ? '#f0f4f8' : i % 2 === 0 ? '#f9fafb' : '#fff';
          return (
            <section key={i} id={isPricing ? 'pricing' : undefined} style={{ background: bg, scrollMarginTop: 72 }}>
              <div style={wrap}>
                <SectionHead s={s} />
                {table && <Markdown>{tableOf(s)}</Markdown>}
                {isPricing ? <Pricing s={s} ui={ui} /> : feature ? <Features s={s} /> : highlights ? <Highlights s={s} /> : null}
              </div>
            </section>
          );
        })}

        {last && (
          <section style={{ background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', color: '#fff', textAlign: 'center' }}>
            <div style={{ ...wrap, maxWidth: 860 }}>
              <Title level={2} style={{ color: '#fff', marginTop: 0, fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 700 }}>{last.title}</Title>
              {ctaText && <Paragraph style={{ color: 'rgba(255,255,255,.9)', fontSize: 18, marginBottom: 40 }}>{ctaText}</Paragraph>}
              <Flex gap={24} wrap justify="center">
                {ctaLinks.map((b, i) => (
                  <Btn key={b.href + i} b={b} kind={i === 0 ? 'green' : 'ghost'} />
                ))}
              </Flex>
            </div>
          </section>
        )}
      </Content>
      <Footer lang={lang} alternates={alternates} navLinks={navLinks} />
    </Layout>
  );
}
