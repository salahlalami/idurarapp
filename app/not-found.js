import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Providers from '@/layout/components/Providers';
import NotFoundResult from '@/layout/components/NotFoundResult';
import { defaultLang, getLangConfig } from '@/config/website';

export const metadata = { title: '404' };

export default function NotFound() {
  const { dir, antdLocale } = getLangConfig(defaultLang);
  return (
    <html lang={defaultLang} dir={dir}>
      <body style={{ margin: 0 }}>
        <AntdRegistry>
          <Providers antdLocale={antdLocale} dir={dir}>
            <NotFoundResult />
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
