'use client';

import { useState } from 'react';
import { Layout, Menu, Dropdown, Drawer, Button, Grid, Flex } from 'antd';
import { GlobalOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { getUi } from '@/data/ui';
import Link from 'next/link';
import { languages, siteName } from '@/config/website';
import Logo from './Logo';
import pages from '@/data/pages';
import { colors } from './theme';

const searchPage = pages.find((p) => p.id === 'search');

export default function Header({ lang, alternates, navLinks }) {
  const screens = Grid.useBreakpoint();
  const [open, setOpen] = useState(false);
  // `md` is undefined until the first client measurement; render desktop meanwhile.
  const mobile = screens.md === false;
  const searchSlug = searchPage.translations[lang]?.slug;
  const ui = getUi(lang);

  const items = navLinks.map((l) => ({ key: l.key, label: <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link> }));

  // Only offer languages in which this page exists; switch to the translated slug.
  const langItems = languages
    .filter((l) => alternates[l.code])
    .map((l) => ({
      key: l.code,
      label: (
        <a href={alternates[l.code]} hrefLang={l.code} lang={l.code}>
          {l.label}
        </a>
      ),
    }));

  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,.85)',
        backdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: `1px solid ${colors.line}`,
        lineHeight: 'normal',
      }}
    >
      <Flex align="center" gap={16} style={{ maxWidth: 1200, margin: '0 auto', height: '100%', padding: '0 24px' }}>
        <Link href={`/${lang}`} aria-label={siteName} style={{ display: 'inline-flex' }}>
          <Logo variant={mobile ? 'icon' : 'full'} size={mobile ? 34 : 38} />
        </Link>

        {!mobile && (
          <Menu
            className="desktop-menu"
            mode="horizontal"
            items={items}
            selectable={false}
            disabledOverflow
            style={{ flex: 1, minWidth: 0, background: 'transparent', borderBottom: 0, justifyContent: 'center' }}
          />
        )}
        {mobile && <div style={{ flex: 1 }} />}

        {searchSlug !== undefined && (
          <Link href={`/${lang}/${searchSlug}`} aria-label={ui.search} style={{ color: colors.ink }}>
            <SearchOutlined style={{ fontSize: 20 }} />
          </Link>
        )}
        <Dropdown menu={{ items: langItems, selectedKeys: [lang] }} trigger={['click']}>
          <Button type="text" shape="circle" aria-label={ui.language} icon={<GlobalOutlined style={{ fontSize: 18 }} />} />
        </Dropdown>
        {mobile && (
          <Button type="text" shape="circle" aria-label={ui.menu} icon={<MenuOutlined />} onClick={() => setOpen(true)} />
        )}
      </Flex>

      <Drawer
        title={<Logo size={32} />}
        placement={lang === 'ar' ? 'left' : 'right'}
        open={open && mobile}
        onClose={() => setOpen(false)}
        size={280}
        styles={{ body: { padding: 8 } }}
      >
        <Menu mode="vertical" items={items} selectable={false} style={{ border: 0, fontSize: 16 }} />
      </Drawer>
    </Layout.Header>
  );
}
