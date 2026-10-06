'use client';

import { Typography, Image, Row, Col } from 'antd';
import { pageImages } from '@/data/site';
import Shell from './components/Shell';
import Markdown from './components/Markdown';

const { Title, Paragraph } = Typography;

export default function DefaultLayout({ page, lang, alternates, navLinks }) {
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={820}>
      <Title style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-.02em' }}>{page.title}</Title>
      {page.content.map((p, i) => (
        <Markdown key={i} size={17}>{p}</Markdown>
      ))}
      {pageImages[page.id] && (
        <Image.PreviewGroup>
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            {pageImages[page.id].map((src) => (
              <Col key={src} xs={12} sm={8}>
                <Image src={src} alt={page.title} width="100%" height={200} style={{ objectFit: 'cover', borderRadius: 10 }} />
              </Col>
            ))}
          </Row>
        </Image.PreviewGroup>
      )}
    </Shell>
  );
}
