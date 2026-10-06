"use client";

import { Typography, Row, Col } from "antd";
import Shell from "./components/Shell";

export default function ContactLayout({ page, lang, alternates, navLinks }) {
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">
        {page.description}
      </Typography.Paragraph>
      <Row gutter={[32, 24]}>
        <Col span={24}>
          <iframe
            src="https://cloud.idurarapp.com/form/static_lead_7oqvtCoFWFr_W"
            title="Contact IDURAR"
            width="100%"
            height="700"
            style={{ border: "none" }}
          />
        </Col>
      </Row>
    </Shell>
  );
}
