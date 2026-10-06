'use client';

import Link from 'next/link';
import { Button, Result } from 'antd';
import { defaultLang } from '@/config/website';

export default function NotFoundResult() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href={`/${defaultLang}`}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
      style={{ padding: '96px 24px' }}
    />
  );
}
