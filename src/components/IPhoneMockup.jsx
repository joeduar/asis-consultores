// iPhone 17 style mockup wrapping dashboard content for mobile
const IPhoneMockup = ({ children }) => (
  <div style={{
    position: 'relative',
    width: '100%',
    maxWidth: 320,
    margin: '0 auto',
  }}>
    {/* Phone shell */}
    <div style={{
      background: 'linear-gradient(145deg, #1a1a2e, #16213e, #0f3460)',
      borderRadius: '2.5rem',
      padding: '12px',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
      position: 'relative',
    }}>
      {/* Dynamic island */}
      <div style={{
        position: 'absolute',
        top: 20, left: '50%',
        transform: 'translateX(-50%)',
        width: 100, height: 26,
        background: '#000',
        borderRadius: 20,
        zIndex: 10,
      }}/>
      {/* Side buttons */}
      <div style={{
        position: 'absolute', right: -3, top: 100,
        width: 3, height: 40,
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '0 2px 2px 0',
      }}/>
      <div style={{
        position: 'absolute', left: -3, top: 80,
        width: 3, height: 30,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '2px 0 0 2px',
      }}/>
      <div style={{
        position: 'absolute', left: -3, top: 120,
        width: 3, height: 30,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '2px 0 0 2px',
      }}/>
      {/* Screen */}
      <div style={{
        background: '#020617',
        borderRadius: '2rem',
        overflow: 'hidden',
        position: 'relative',
        minHeight: 420,
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '36px 20px 8px',
          fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
        }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: '0.55rem' }}>●●●●</span>
            <span>WiFi</span>
            <span>100%</span>
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: '0 12px 20px' }}>
          {children}
        </div>
      </div>
    </div>
    {/* Reflection */}
    <div style={{
      position: 'absolute', bottom: -20, left: '10%',
      width: '80%', height: 20,
      background: 'rgba(53,132,228,0.08)',
      filter: 'blur(12px)',
      borderRadius: '50%',
    }}/>
  </div>
)

export default IPhoneMockup
