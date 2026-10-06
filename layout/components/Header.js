'use client';

import { useState } from 'react';
import { Layout, Menu, Dropdown, Drawer, Button, Grid, Flex } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { getUi } from '@/data/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages, siteName } from '@/config/website';
import Logo from './Logo';
import { colors } from './theme';

export default function Header({ lang, alternates, navLinks, floating = false }) {
  const screens = Grid.useBreakpoint();
  const [open, setOpen] = useState(false);
  // `md` is undefined until the first client measurement; render desktop meanwhile.
  const mobile = screens.md === false;
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

  const path = usePathname();
  const navItem = (l) => {
    const active = l.href === path;
    return (
      <Link
        key={l.key}
        href={l.href}
        className="idr-nav"
        style={{ padding: '0 17px', height: 78, display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: '#0a143c', borderBottom: `3px solid ${active ? '#0050c8' : 'transparent'}`, whiteSpace: 'nowrap' }}
      >
        {l.label}
      </Link>
    );
  };
  const current = languages.find((l) => l.code === lang);

  return (
    <header style={{ position: floating ? 'relative' : 'sticky', top: 0, zIndex: 100, background: floating ? 'transparent' : '#f9fafc', padding: '0 24px 16px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Flex justify="flex-end" style={{ padding: '30px 0 22px' }}>
          <Dropdown menu={{ items: langItems, selectedKeys: [lang] }} trigger={['click']}>
            <button type="button" aria-label={ui.language} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 4, padding: '8px 12px', fontWeight: 700, fontSize: 15, color: '#0a143c', cursor: 'pointer', fontFamily: 'inherit' }}>
              🌐 {current?.label}
            </button>
          </Dropdown>
        </Flex>
        <Flex align="center" gap={16} style={{ background: '#fff', borderRadius: 8, padding: '0 16px', height: 78, boxShadow: '0 0 30px 8px rgba(150, 190, 238, 0.15)' }}>
          <Link href={`/${lang}`} aria-label={siteName} style={{ display: 'inline-flex' }}>
            <Logo size={mobile ? 36 : 48} />
          </Link>
          <div style={{ flex: 1 }} />
          {!mobile && <nav style={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>{navLinks.map(navItem)}</nav>}
          {mobile && <Button type="text" shape="circle" aria-label={ui.menu} icon={<MenuOutlined />} onClick={() => setOpen(true)} />}
        </Flex>
      </div>
      <Drawer
        title={<Logo size={32} />}
        placement={['ar', 'fa'].includes(lang) ? 'left' : 'right'}
        open={open && mobile}
        onClose={() => setOpen(false)}
        size={280}
        styles={{ body: { padding: 8 } }}
      >
        <Menu mode="vertical" items={items} selectable={false} style={{ border: 0, fontSize: 16 }} />
      </Drawer>
    </header>
  );
}
