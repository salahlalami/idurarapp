'use client';

import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

// Common page frame: header, centered content column, footer.
export default function Shell({ lang, alternates, navLinks, width = 1200, children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header lang={lang} alternates={alternates} navLinks={navLinks} />
      <Layout.Content style={{ padding: 'clamp(32px, 6vw, 72px) 24px', maxWidth: width, margin: '0 auto', width: '100%' }}>
        {children}
      </Layout.Content>
      <Footer lang={lang} alternates={alternates} navLinks={navLinks} />
    </Layout>
  );
}
