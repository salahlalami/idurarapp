import '../globals.css';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Providers from '@/layout/components/Providers';
import { languages, siteUrl, siteName, isValidLang, getLangConfig } from '@/config/website';

const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-inter' });

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  icons: { icon: '/favicon.ico' },
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const { dir, antdLocale } = getLangConfig(lang);

  return (
    <html lang={lang} dir={dir}>
      <body className={inter.variable} style={{ margin: 0, WebkitFontSmoothing: 'antialiased' }}>
        <AntdRegistry>
          <Providers antdLocale={antdLocale} dir={dir}>
            {children}
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
