'use client';

import { useState } from 'react';
import { Typography, Button, Descriptions, Row, Col, Card, Space, Image } from 'antd';
import { ShareAltOutlined, PhoneOutlined, MailOutlined, FlagOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Shell from './components/Shell';
import Markdown from './components/Markdown';
import Breadcrumbs from './components/Breadcrumbs';
import Cover from './components/Cover';
import AdBadges, { formatPrice } from './components/AdBadges';
import AdFavoriteButton from './components/AdFavoriteButton';
import { getUi } from '@/data/ui';

const { Title, Paragraph, Text } = Typography;

function Gallery({ ad }) {
  const [i, setI] = useState(0);
  const images = ad.images || [];
  if (!images.length) return <Cover item={ad} height={320} />;
  return (
    <>
      <Image src={images[i]} alt={ad.title} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 14 }} />
      {images.length > 1 && (
        <Space wrap style={{ marginTop: 8 }}>
          {images.map((src, n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" width={64} height={64} onClick={() => setI(n)}
              style={{ objectFit: 'cover', borderRadius: 8, cursor: 'pointer', outline: n === i ? '2px solid var(--ant-color-primary)' : 'none' }} />
          ))}
        </Space>
      )}
    </>
  );
}

function ShareButton({ ad, ui }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: ad.title, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return <Button icon={<ShareAltOutlined />} onClick={share}>{copied ? ui.linkCopied : ui.share}</Button>;
}

export default function ClassifiedLayout({ page, data, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  const reportHref = `mailto:${page.email}?subject=${encodeURIComponent(`${ui.reportAd}: ${page.title}`)}`;
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks} width={960}>
      <Breadcrumbs items={[{ title: ui.home, href: `/${lang}` }, { title: data.parent?.title, href: data.parent?.href }, { title: data.category }, { title: data.subCategory }, { title: page.title }]} />
      <Row gutter={[32, 24]}>
        <Col xs={24} md={14}>
          <Gallery ad={{ ...page, title: page.title }} />
          <Title style={{ marginTop: 24 }}>{page.title}</Title>
          <Paragraph type="secondary">{page.description}</Paragraph>
          {page.content.map((p, i) => <Markdown key={i}>{p}</Markdown>)}
        </Col>
        <Col xs={24} md={10}>
          <Card>
            <Title level={2} style={{ marginTop: 0 }}>{formatPrice(lang, page.price, page.currency)}</Title>
            <div style={{ marginBottom: 16 }}><AdBadges ad={page} ui={ui} /></div>
            <Descriptions column={1} size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label={ui.category}>{data.category}</Descriptions.Item>
              <Descriptions.Item label={ui.subCategory}>{data.subCategory}</Descriptions.Item>
              <Descriptions.Item label={ui.location}>{page.location}</Descriptions.Item>
              {page.condition && <Descriptions.Item label={ui.condition}>{page.condition === 'new' ? ui.conditionNew : ui.conditionUsed}</Descriptions.Item>}
              <Descriptions.Item label={ui.postedOn}>{page.postedOn}</Descriptions.Item>
              {page.expiresOn && <Descriptions.Item label={ui.expiresOn}>{page.expiresOn}</Descriptions.Item>}
            </Descriptions>
            <Card size="small" title={ui.seller} style={{ marginBottom: 16 }}>
              <Text strong>{page.posterName}</Text> <Text type="secondary">· {ui[page.posterType]}</Text>
              <div style={{ marginTop: 8 }}><AdBadges ad={{ verified: page.verified }} ui={ui} /></div>
            </Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <a href={`mailto:${page.email}?subject=${encodeURIComponent(page.title)}`}><Button type="primary" size="large" block icon={<MailOutlined />}>{ui.contactSeller}</Button></a>
              {page.phone && <a href={`tel:${page.phone.replace(/\s/g, '')}`}><Button size="large" block icon={<PhoneOutlined />}>{ui.call} {page.phone}</Button></a>}
              <Space>
                <AdFavoriteButton ad={page} ui={ui} size="large" />
                <ShareButton ad={page} ui={ui} />
                <a href={reportHref}><Button type="text" icon={<FlagOutlined />}>{ui.reportAd}</Button></a>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
      {data.related.length > 0 && (
        <>
          <Title level={3} style={{ marginTop: 48 }}>{ui.relatedAds}</Title>
          <Row gutter={[24, 24]}>
            {data.related.map((a) => (
              <Col key={a.id} xs={24} md={8}>
                <Link href={a.href}>
                  <Card hoverable cover={<Cover item={a} height={140} radius={0} />}>
                    <Text strong>{formatPrice(lang, a.price, a.currency)}</Text>
                    <Paragraph style={{ margin: 0 }}>{a.title}</Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Shell>
  );
}
