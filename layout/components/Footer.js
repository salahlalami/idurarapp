"use client";

import { Layout, Flex, Typography, Divider } from "antd";
import Link from "next/link";
import { languages, tagline, contactEmail, copyright, social } from "@/config/website";

const link = { color: "rgba(255,255,255,.65)" };

export default function Footer({ lang, alternates = {}, navLinks = [] }) {
  const langs = languages.filter((l) => alternates[l.code]);
  return (
    <Layout.Footer style={{ padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Flex vertical align="center" gap={24} style={{ textAlign: "center" }}>
          <Typography.Text strong style={{ color: "#fff", fontSize: 18 }}>
            {tagline}
          </Typography.Text>
          <a href={`mailto:${contactEmail}`} style={link}>
            {contactEmail}
          </a>
          <Flex wrap justify="center" gap="small 24px">
            {navLinks.map((l) => (
              <Link key={l.key} href={l.href} style={link}>
                {l.label}
              </Link>
            ))}
          </Flex>
          <Flex gap={16}>
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt={s.label} width={28} height={28} />
              </a>
            ))}
          </Flex>
          {langs.length > 1 && (
            <Flex wrap justify="center" gap="small 20px">
              {langs.map((l) => (
                <a
                  key={l.code}
                  href={alternates[l.code]}
                  hrefLang={l.code}
                  lang={l.code}
                  style={{
                    ...link,
                    color: l.code === lang ? "#fff" : link.color,
                    fontWeight: l.code === lang ? 600 : 400,
                    padding: "4px 8px",
                  }}
                >
                  {l.label}
                </a>
              ))}
            </Flex>
          )}
        </Flex>
        <Divider style={{ borderColor: "rgba(255,255,255,.1)", margin: "32px 0 20px" }} />
        <Typography.Paragraph style={{ color: "rgba(255,255,255,.45)", textAlign: "center", margin: 0, fontSize: 13 }}>
          ©{new Date().getFullYear()} {copyright}
        </Typography.Paragraph>
      </div>
    </Layout.Footer>
  );
}
