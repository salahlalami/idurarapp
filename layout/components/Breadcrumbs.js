'use client';

import { Breadcrumb } from 'antd';
import Link from 'next/link';

// items: [{ title, href? }]; the last one is the current page.
export default function Breadcrumbs({ items }) {
  return (
    <Breadcrumb
      style={{ marginBottom: 24 }}
      items={items.map((i) => ({ title: i.href ? <Link href={i.href}>{i.title}</Link> : i.title }))}
    />
  );
}
