'use client';

import { Tag } from 'antd';
import { StarFilled, SafetyCertificateFilled } from '@ant-design/icons';

// Featured / verified badges shown on ad cards and the ad page.
export default function AdBadges({ ad, ui }) {
  return (
    <>
      {ad.featured && <Tag color="gold" icon={<StarFilled />}>{ui.featured}</Tag>}
      {ad.verified && <Tag color="green" icon={<SafetyCertificateFilled />}>{ui.verified}</Tag>}
    </>
  );
}

export const formatPrice = (lang, price, currency) =>
  new Intl.NumberFormat(lang, { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
