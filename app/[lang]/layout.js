import '../globals.css';
import { notFound } from 'next/navigation';
import { Lato } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Providers from '@/layout/components/Providers';
import { WishlistProvider } from '@/layout/components/WishlistProvider';
import { languages, siteUrl, siteName, isValidLang, getLangConfig } from '@/config/website';

const lato = Lato({ subsets: ['latin', 'latin-ext'], weight: ['400', '700', '900'], display: 'swap', variable: '--font-lato' });

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  icons: { icon: '/favicon.png' },
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const { dir, antdLocale } = getLangConfig(lang);

  return (
    <html lang={lang} dir={dir}>
      <body className={lato.variable} style={{ margin: 0, WebkitFontSmoothing: 'antialiased' }}>
        <AntdRegistry>
          <Providers antdLocale={antdLocale} dir={dir}>
            <WishlistProvider>{children}</WishlistProvider>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
