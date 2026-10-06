'use client';

import { ConfigProvider } from 'antd';
import en_US from 'antd/locale/en_US';
import ar_EG from 'antd/locale/ar_EG';
import fr_FR from 'antd/locale/fr_FR';
import es_ES from 'antd/locale/es_ES';
import zh_CN from 'antd/locale/zh_CN';
import hi_IN from 'antd/locale/hi_IN';
import pt_PT from 'antd/locale/pt_PT';
import ru_RU from 'antd/locale/ru_RU';
import vi_VN from 'antd/locale/vi_VN';
import tr_TR from 'antd/locale/tr_TR';
import de_DE from 'antd/locale/de_DE';
import id_ID from 'antd/locale/id_ID';
import it_IT from 'antd/locale/it_IT';
import fa_IR from 'antd/locale/fa_IR';
import { theme } from './theme';

// Keys must match `antdLocale` in config/website.js.
const antdLocales = { en_US, ar_EG, fr_FR, es_ES, zh_CN, hi_IN, pt_PT, ru_RU, vi_VN, tr_TR, de_DE, id_ID, it_IT, fa_IR };

export default function Providers({ antdLocale, dir, children }) {
  return (
    <ConfigProvider direction={dir} locale={antdLocales[antdLocale] || en_US} theme={theme}>
      {children}
    </ConfigProvider>
  );
}
