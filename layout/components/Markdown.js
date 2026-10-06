'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

// Renders markdown from @/data/* with antd typography. Raw HTML is not rendered.
// `inline` strips the wrapping paragraph margin (for cards / collapse bodies).
export default function Markdown({ children, size, inline, checks }) {
  const text = (c) => [c].flat().map((x) => (typeof x === 'string' ? x : '')).join('').trim();
  const mark = (c) => (text(c) === '✓' ? { color: '#2563eb', fontWeight: 700, fontSize: 18 } : text(c) === '✗' ? { color: '#ef4444', fontWeight: 700, fontSize: 18 } : {});
  const p = ({ children }) => <Paragraph style={{ fontSize: size, ...(inline ? { margin: 0 } : {}) }}>{children}</Paragraph>;
  const h = (level) => ({ children }) => <Title level={level} style={{ marginTop: 24 }}>{children}</Title>;
  const components = {
    p,
    h1: h(2), h2: h(3), h3: h(4), h4: h(5), h5: h(5), h6: h(5),
    strong: ({ children }) => <Text strong>{children}</Text>,
    em: ({ children }) => <Text italic>{children}</Text>,
    del: ({ children }) => <Text delete>{children}</Text>,
    code: ({ className, children }) => (className || String(children).includes('\n') ? <code className={className}>{children}</code> : <Text code>{children}</Text>),
    pre: ({ children }) => <pre style={{ background: '#f6f8fa', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 14, lineHeight: 1.6, margin: '16px 0' }}>{children}</pre>,
    blockquote: ({ children }) => <blockquote style={{ margin: '16px 0', paddingInlineStart: 16, borderInlineStart: '4px solid #d9d9d9', color: '#595959' }}>{children}</blockquote>,
    a: ({ href, children }) => <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>,
    img: ({ src, alt }) => <img src={src} alt={alt || ''} loading="lazy" style={{ display: 'block', maxWidth: '100%', height: 'auto', margin: '24px auto', borderRadius: 8 }} />,
    table: ({ children }) => <div className="md-table"><table>{children}</table></div>,
    th: ({ children }) => <th style={{ padding: '16px 20px', textAlign: 'start', background: '#f9fafb', fontWeight: 600, color: '#1f2937', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>{children}</th>,
    td: ({ children }) => <td style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', color: '#4b5563', ...mark(children) }}>{children}</td>,
    ...(checks
      ? {
          ul: ({ children }) => <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px' }}>{children}</ul>,
          li: ({ children }) => (
            <li style={{ position: 'relative', paddingBlock: 6, paddingInlineStart: 26, color: '#4b5563' }}>
              <span style={{ position: 'absolute', insetInlineStart: 0, color: '#10b981', fontWeight: 700 }}>✓</span>
              {children}
            </li>
          ),
        }
      : {}),
  };
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{String(children ?? '')}</ReactMarkdown>;
}
