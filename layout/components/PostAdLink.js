'use client';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import pages from '@/data/pages';

const postAdPage = pages.find((p) => p.id === 'post-ad');

export default function PostAdLink({ lang, label }) {
  const slug = postAdPage.translations[lang]?.slug;
  if (slug === undefined) return null;
  return <Link href={`/${lang}/${slug}`}><Button type="primary" icon={<PlusOutlined />}>{label}</Button></Link>;
}
