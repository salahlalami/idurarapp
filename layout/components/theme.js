// Minimalist design tokens: neutral palette, one accent, soft radii, generous space.
export const colors = {
  accent: '#2563eb',
  ink: '#1f2937',
  muted: '#6b7280',
  line: '#e5e7eb',
  soft: '#f9fafb',
  dark: '#0a143c',
};

export const theme = {
  cssVar: true,
  token: {
    colorPrimary: colors.accent,
    colorTextBase: colors.ink,
    colorBgLayout: '#ffffff',
    colorBorderSecondary: colors.line,
    borderRadius: 10,
    borderRadiusLG: 14,
    fontFamily:
      "var(--font-inter), 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans Arabic', sans-serif",
    fontSize: 15,
    lineHeight: 1.7,
    boxShadow: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.06)',
  },
  components: {
    Layout: { headerBg: '#fff', headerPadding: 0, headerHeight: 72, footerBg: colors.dark, bodyBg: '#fff' },
    Button: { controlHeight: 42, fontWeight: 500, primaryShadow: 'none', defaultShadow: 'none' },
    Card: { borderRadiusLG: 14, boxShadowTertiary: 'none' },
    Typography: { titleMarginBottom: '0.6em', fontWeightStrong: 600 },
    Menu: { itemBg: 'transparent', horizontalItemSelectedColor: colors.accent, activeBarHeight: 0 },
  },
};
