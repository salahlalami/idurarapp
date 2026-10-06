import { renderPage, resolvePage } from '@/lib/render-page';
import { buildMetadata } from '@/lib/pages';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const page = await resolvePage(params);
  if (!page) notFound();
  return buildMetadata(page);
}

export default function HomePage({ params }) {
  return renderPage(params);
}
