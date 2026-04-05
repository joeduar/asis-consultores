const AsisLogo = ({ className = '', size = 'default' }) => {
  const sizes = {
    small:   { globe: 36, fs: '1.0rem',  sub: '0.40rem', gap: 10 },
    default: { globe: 52, fs: '1.35rem', sub: '0.50rem', gap: 13 },
    large:   { globe: 72, fs: '1.85rem', sub: '0.66rem', gap: 18 },
  }
  const s = sizes[size] || sizes.default

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: s.gap,
      }}
    >
      {/* ── Globe image ── */}
      <img
        src="/globe-logo.png"
        alt="Asis globe"
        style={{
          width:     s.globe,
          height:    s.globe,
          objectFit: 'contain',
          flexShrink: 0,
          // Drop shadow gives depth on dark bg
          filter: 'drop-shadow(0 0 8px rgba(53,132,228,0.45))',
        }}
      />

      {/* ── Wordmark ── */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily:    "'Outfit', 'Inter', sans-serif",
          fontSize:      s.fs,
          fontWeight:    700,
          color:         '#ffffff',
          letterSpacing: '0.12em',
          lineHeight:    1,
        }}>
          ASIS
        </span>
        <div style={{
          height:     '1px',
          background: 'rgba(53,132,228,0.45)',
          margin:     '4px 0',
        }} />
        <span style={{
          fontFamily:    "'Outfit', 'Inter', sans-serif",
          fontSize:      s.sub,
          fontWeight:    300,
          color:         '#9090a8',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
        }}>
          Consultores
        </span>
      </div>
    </div>
  )
}

export default AsisLogo
