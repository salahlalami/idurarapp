"use client";

import {
  Layout,
  Typography,
  Flex,
  Row,
  Col,
  Card,
  Image,
  Button,
  Tag,
} from "antd";
import Link from "next/link";
import {
  GiftOutlined,
  BgColorsOutlined,
  PictureOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { services, gallery, cities, siteText } from "@/data/site";
import { whatsapp } from "@/config/website";
import Markdown from "./components/Markdown";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Parallax from "./components/Parallax";
import Testimonials from "./components/Testimonials";
import { getUi } from "@/data/ui";
import { colors } from "./components/theme";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const icons = {
  GiftOutlined,
  BgColorsOutlined,
  PictureOutlined,
  GlobalOutlined,
};
const heading = { textAlign: "center", margin: "0 0 32px" };
const wrap = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "clamp(40px, 8vw, 88px) 24px",
};

export default function HomeLayout({ page, lang, alternates, navLinks }) {
  const t = siteText[lang] || siteText.fr;
  const hrefOf = (key) => navLinks.find((l) => l.key === key)?.href;
  const contactHref = hrefOf("contact");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header lang={lang} alternates={alternates} navLinks={navLinks} />
      <Content>
        <section
          style={{
            background: `radial-gradient(60% 80% at 50% 0%, #ffe5ec 0%, #fff 70%)`,
            borderBottom: `1px solid ${colors.line}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Parallax
            speed={0.35}
            aria-hidden
            style={{
              position: "absolute",
              top: -80,
              insetInlineStart: "-6%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, #fecdd3, transparent 70%)",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />
          <Parallax
            speed={0.2}
            aria-hidden
            style={{
              position: "absolute",
              top: 40,
              insetInlineEnd: "-4%",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ddd6fe, transparent 70%)",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />
          <Parallax speed={-0.08} style={{ position: "relative" }}>
            <Flex
              vertical
              align="center"
              gap={8}
              style={{
                maxWidth: 820,
                margin: "0 auto",
                padding: "clamp(64px, 12vw, 140px) 24px",
                textAlign: "center",
              }}
            >
              <Title
                style={{
                  fontSize: "clamp(34px, 6vw, 64px)",
                  lineHeight: 1.1,
                  letterSpacing: "-.03em",
                  margin: 0,
                }}
              >
                {page.title}
              </Title>
              <Paragraph
                type="secondary"
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  maxWidth: 620,
                  marginTop: 16,
                }}
              >
                {page.description}
              </Paragraph>
              <Flex gap={12} wrap justify="center" style={{ marginTop: 16 }}>
                {contactHref && (
                  <Link href={contactHref}>
                    <Button type="primary" size="large">
                      {t.cta}
                    </Button>
                  </Link>
                )}
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="large">WhatsApp</Button>
                </a>
              </Flex>
            </Flex>
          </Parallax>
        </section>

        {page.content.length > 0 && (
          <section
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "clamp(40px, 8vw, 96px) 24px",
            }}
          >
            <Row gutter={[24, 24]} justify="center">
              {page.content.map((p, i) => (
                <Col key={i} xs={24} md={12} lg={8}>
                  <Card
                    variant="borderless"
                    style={{ background: colors.soft, height: "100%" }}
                  >
                    <Markdown size={17} inline>
                      {p}
                    </Markdown>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}
        <section style={wrap}>
          <Title level={2} style={heading}>
            {t.services}
          </Title>
          <Row gutter={[24, 24]}>
            {services.map((sv) => {
              const Icon = icons[sv.icon];
              const link = navLinks.find((l) => l.key === sv.pageId);
              if (!link) return null;
              return (
                <Col key={sv.pageId} xs={24} sm={12} lg={6}>
                  <Link href={link.href}>
                    <Card
                      hoverable
                      variant="borderless"
                      style={{ height: "100%", background: colors.soft }}
                    >
                      <Icon style={{ fontSize: 32, color: colors.accent }} />
                      <Title level={4} style={{ margin: "12px 0 8px" }}>
                        {link.label}
                      </Title>
                      <Paragraph type="secondary" style={{ margin: 0 }}>
                        {sv.text[lang] || sv.text.fr}
                      </Paragraph>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </section>

        <section style={{ background: colors.soft }}>
          <div style={wrap}>
            <Title level={2} style={heading}>
              {t.portfolio}
            </Title>
            <Image.PreviewGroup>
              <Row gutter={[16, 16]}>
                {gallery.map((src) => (
                  <Col key={src} xs={12} md={8} lg={6}>
                    <Image
                      src={src}
                      alt=""
                      width="100%"
                      height={220}
                      style={{ objectFit: "cover", borderRadius: 10 }}
                    />
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
          </div>
        </section>

        <section style={{ ...wrap, textAlign: "center" }}>
          <Title level={2} style={heading}>
            {t.studio}
          </Title>
          <Paragraph
            style={{ maxWidth: 720, margin: "0 auto 20px", fontSize: 17 }}
          >
            {t.studioText}
          </Paragraph>
          <Flex wrap justify="center" gap={8}>
            {cities.map((c) => (
              <Tag
                key={c}
                color="default"
                style={{ fontSize: 14, padding: "4px 12px" }}
              >
                {c}
              </Tag>
            ))}
          </Flex>
        </section>

        {/* <Testimonials lang={lang} ui={getUi(lang)} /> */}

        <section
          style={{
            background: colors.accent,
            color: "#fff",
            textAlign: "center",
          }}
        >
          <div style={wrap}>
            <Title level={2} style={{ color: "#fff", marginTop: 0 }}>
              {t.cta}
            </Title>
            <Paragraph style={{ color: "rgba(255,255,255,.9)", fontSize: 17 }}>
              {t.ctaText}
            </Paragraph>
            {contactHref && (
              <Link href={contactHref}>
                <Button size="large">{t.cta}</Button>
              </Link>
            )}
          </div>
        </section>
      </Content>
      <Footer lang={lang} alternates={alternates} navLinks={navLinks} />
    </Layout>
  );
}
