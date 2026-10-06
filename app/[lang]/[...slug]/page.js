import { notFound } from 'next/navigation';
import { renderPage, resolvePage } from '@/lib/render-page';
import { getAllStaticParams, buildMetadata } from '@/lib/pages';

export const dynamicParams = false;

// Home ('' slug) is served by app/[lang]/page.js.
export function generateStaticParams() {
  return getAllStaticParams().filter((p) => p.slug.length > 0);
}

export async function generateMetadata({ params }) {
  const page = await resolvePage(params);
  if (!page) notFound();
  return buildMetadata(page);
}

export default function CatchAllPage({ params }) {
  return renderPage(params);
}
