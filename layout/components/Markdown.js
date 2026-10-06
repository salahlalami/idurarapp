'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

// Renders markdown from @/data/* with antd typography. Raw HTML is not rendered.
// `inline` strips the wrapping paragraph margin (for cards / collapse bodies).
export default function Markdown({ children, size, inline }) {
  const p = ({ children }) => <Paragraph style={{ fontSize: size, ...(inline ? { margin: 0 } : {}) }}>{children}</Paragraph>;
  const h = (level) => ({ children }) => <Title level={level} style={{ marginTop: 24 }}>{children}</Title>;
  const components = {
    p,
    h1: h(2), h2: h(3), h3: h(4), h4: h(5), h5: h(5), h6: h(5),
    strong: ({ children }) => <Text strong>{children}</Text>,
    em: ({ children }) => <Text italic>{children}</Text>,
    del: ({ children }) => <Text delete>{children}</Text>,
    code: ({ children }) => <Text code>{children}</Text>,
    pre: ({ children }) => <pre style={{ background: '#f6f8fa', padding: 16, borderRadius: 8, overflowX: 'auto' }}>{children}</pre>,
    blockquote: ({ children }) => <blockquote style={{ margin: '16px 0', paddingInlineStart: 16, borderInlineStart: '4px solid #d9d9d9', color: '#595959' }}>{children}</blockquote>,
    a: ({ href, children }) => <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>,
    img: ({ src, alt }) => <img src={src} alt={alt || ''} style={{ maxWidth: '100%' }} />,
    table: ({ children }) => <div style={{ overflowX: 'auto' }}><table style={{ borderCollapse: 'collapse', margin: '16px 0' }}>{children}</table></div>,
    th: ({ children }) => <th style={{ border: '1px solid #eceef1', padding: '8px 12px', textAlign: 'start', background: '#fafafa' }}>{children}</th>,
    td: ({ children }) => <td style={{ border: '1px solid #eceef1', padding: '8px 12px' }}>{children}</td>,
  };
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{String(children ?? '')}</ReactMarkdown>;
}
