'use client';

// Placeholder cover (no image assets yet). Pass `image` to use a real picture.
export default function Cover({ item, height = 200, radius = 14 }) {
  const base = { height, borderRadius: radius, width: '100%' };
  if (item.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.image} alt={item.title} style={{ ...base, objectFit: 'cover' }} />;
  }
  return (
    <div
      role="img"
      aria-label={item.title}
      style={{
        ...base,
        background: `linear-gradient(135deg, ${item.color || '#e11d48'}, ${item.color || '#e11d48'}99)`,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(height / 3),
        fontWeight: 700,
      }}
    >
      {[...item.title][0]}
    </div>
  );
}
