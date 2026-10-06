// Stand-in for @/layout (JSX) when running outside Next.js: accepts every layout id.
export const layoutRegistry = new Proxy({}, { get: () => true });
