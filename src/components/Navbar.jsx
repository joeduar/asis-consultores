import { useState, useEffect } from 'react'
import AsisLogo from './AsisLogo'

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Software',     href: '#software'     },
    { label: 'Ecosistema',   href: '#ecosistema'   },
    { label: 'Inteligencia', href: '#inteligencia' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.7s ease-out',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      background: scrolled ? 'rgba(2,6,23,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      padding: scrolled ? '0.75rem 0' : '1rem 0',
    }}>
      <div style={{
        width: '100%', maxWidth: '1200px',
        marginLeft: 'auto', marginRight: 'auto',
        paddingLeft: '1.5rem', paddingRight: '1.5rem',
        boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" style={{ flexShrink: 0, textDecoration: 'none' }}>
          <AsisLogo size="default" />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="desktop-nav">
          {links.map(link => (
            <a key={link.href} href={link.href} style={{
              fontSize: '0.625rem', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.22em',
              color: '#9090a8', textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#3584E4'}
              onMouseLeave={e => e.currentTarget.style.color = '#9090a8'}
            >{link.label}</a>
          ))}
          <a href="#contacto" style={{
            marginLeft: '0.5rem', padding: '0.6rem 1.4rem',
            fontSize: '0.6rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.18em',
            color: '#ffffff', background: 'transparent',
            border: '1px solid rgba(53,132,228,0.6)',
            borderRadius: '9999px', textDecoration: 'none',
            transition: 'all 0.3s ease', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3584E4'; e.currentTarget.style.color = '#020617' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff' }}
          >Agendar Reunión</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-nav-btn"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: 5, padding: 8,
          }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: 'rgba(255,255,255,0.8)', borderRadius: 2,
              transition: 'all 0.3s ease',
              transform: mobileOpen
                ? i===0 ? 'rotate(45deg) translate(5px,5px)'
                : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none'
                : 'none',
              opacity: mobileOpen && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: 'rgba(2,6,23,0.98)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        maxHeight: mobileOpen ? 400 : 0,
        opacity: mobileOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {links.map(link => (
            <a key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '0.8rem', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: '#9090a8', textDecoration: 'none',
              }}>{link.label}</a>
          ))}
          <a href="#contacto" onClick={() => setMobileOpen(false)} style={{
            textAlign: 'center', padding: '0.85rem 1.5rem',
            fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: '#ffffff', border: '1px solid rgba(53,132,228,0.6)',
            borderRadius: '9999px', textDecoration: 'none',
          }}>Agendar Reunión</a>
        </div>
      </div>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
