'use client';

import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import frFR from 'antd/locale/fr_FR';
import arEG from 'antd/locale/ar_EG';
import { theme } from './theme';

// Keys must match `antdLocale` in config/website.js.
const antdLocales = { en_US: enUS, fr_FR: frFR, ar_EG: arEG };

export default function Providers({ antdLocale, dir, children }) {
  return (
    <ConfigProvider direction={dir} locale={antdLocales[antdLocale] || enUS} theme={theme}>
      {children}
    </ConfigProvider>
  );
}
