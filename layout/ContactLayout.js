"use client";

import { Typography, Row, Col, Card } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Shell from "./components/Shell";
import { contactEmail, phone, whatsapp, address } from "@/config/website";
import { getUi } from "@/data/ui";

export default function ContactLayout({ page, lang, alternates, navLinks }) {
  const ui = getUi(lang);
  return (
    <Shell lang={lang} alternates={alternates} navLinks={navLinks}>
      <Typography.Title>{page.title}</Typography.Title>
      <Typography.Paragraph type="secondary">
        {page.description}
      </Typography.Paragraph>
      <Row gutter={[32, 24]}>
        <Col xs={24} md={15}>
          <iframe
            src="https://cloud.idurarapp.com/form/static_lead_7oqvtCoFWFr_W"
            title="Contact IDURAR"
            width="100%"
            height="700"
            style={{ border: "none" }}
          />
        </Col>
        <Col xs={24} md={9}>
          <Card title={ui.contactInfo}>
            {/* <Typography.Text type="secondary">{ui.emailUs}</Typography.Text>
            <br />
            <a href={`mailto:${contactEmail}`}><MailOutlined /> {contactEmail}</a>
            <br /> */}
            <a href={`tel:${phone.replace(/\s/g, "")}`}>
              <PhoneOutlined /> {phone}
            </a>
            <br />
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppOutlined /> WhatsApp
            </a>
            <br />
            <span>
              <EnvironmentOutlined /> {address}
            </span>
          </Card>
        </Col>
      </Row>
    </Shell>
  );
}
