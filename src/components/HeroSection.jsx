import { useState, useEffect, useRef } from 'react'
import Globe3D from './Globe3D'
import useIsMobile from './useIsMobile'

/* ---- Typewriter hook ---- */
const useTypewriter = (text, speed = 50, startDelay = 0, enabled = true) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay, enabled])

  return { displayed, done }
}

const HeroSection = () => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  const title1 = useTypewriter('Recaudación', 60, 500, visible)
  const title2 = useTypewriter('Inteligente', 55, 1300, visible)

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#020617',
        paddingTop: '7rem',
        paddingBottom: '5rem',
      }}
    >
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '50%', right: 0,
          transform: 'translateY(-50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(53,132,228,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '25%', left: '25%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(53,132,228,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Main container */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: isMobile ? '1.25rem' : '3rem',
        paddingRight: isMobile ? '1.25rem' : '3rem',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'center',
        }}>

          {/* ── LEFT: Text ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            {/* Title */}
            <h1 style={{ marginBottom: '2rem', padding: 0 }}>
              <span style={{
                display: 'block',
                fontSize: isMobile ? 'clamp(2.2rem, 10vw, 3rem)' : 'clamp(2.6rem, 4.5vw, 4.2rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#ffffff',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s ease-out 0.3s',
              }}>
                {title1.displayed}
                {!title1.done && <span className="typing-cursor" />}
              </span>
              <span style={{
                display: 'block',
                fontSize: isMobile ? 'clamp(2.2rem, 10vw, 3rem)' : 'clamp(2.6rem, 4.5vw, 4.2rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#3584E4',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s ease-out 1.3s',
              }}>
                {title2.displayed}
                {title1.done && !title2.done && <span className="typing-cursor" />}
              </span>
              <span style={{
                display: 'block',
                fontSize: isMobile ? 'clamp(0.8rem, 3.5vw, 1.1rem)' : 'clamp(1.1rem, 1.8vw, 1.6rem)',
                fontWeight: 300,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.30)',
                marginTop: '0.5rem',
                textTransform: 'uppercase',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s ease-out 2.5s',
              }}>
                Automatizada & con IA
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              color: '#9090a8',
              fontSize: isMobile ? '0.9rem' : '1rem',
              maxWidth: '460px',
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: '2.5rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.7s ease-out 2.8s',
            }}>
              Software de recaudación modular y adaptable, pasarela de pago integrada,
              automatización de procesos y consultoría estratégica — todo en un solo contrato.
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'wrap',
              gap: '1rem',
              width: isMobile ? '100%' : 'auto',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.7s ease-out 3.1s',
            }}>
              <a href="#contacto" className="axioma-btn group" style={isMobile ? { textAlign: 'center', justifyContent: 'center' } : {}}>
                Agendar Reunión
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </a>
              <a href="#software" className="axioma-btn-outline" style={isMobile ? { textAlign: 'center' } : {}}>
                Ver Servicios
              </a>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '1.5rem' : '2.5rem',
              marginTop: '3.5rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.7s ease-out 3.4s',
            }}>
              {[
                { value: '+10',   label: 'Clientes activos'  },
                { value: '94%',   label: 'Tasa de cobro'     },
                { value: '24/7',  label: 'Soporte incluido'  },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: '#3584E4', fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 700, lineHeight: 1 }}>
                    {stat.value}
                  </span>
                  <span style={{ color: '#9090a8', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Globe — hidden on mobile ── */}
          {!isMobile && (
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 1s ease-out 0.7s',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                <div style={{
                  width: 360, height: 360,
                  background: 'radial-gradient(circle, rgba(53,132,228,0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
              </div>

              {/* Floating tag — Automatización */}
              <div style={{
                position: 'absolute', top: '2rem', left: '-1rem', zIndex: 20,
                background: 'rgba(2,6,23,0.7)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(53,132,228,0.2)',
                borderRadius: '0.75rem', padding: '0.75rem 1rem',
                animation: 'floatTag 8s ease-in-out infinite',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3584E4' }} />
                  <div>
                    <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Automatización</div>
                    <div style={{ fontSize: '0.6rem', color: '#606080' }}>Procesos 100% automáticos</div>
                  </div>
                </div>
              </div>

              {/* Floating tag — Recaudación */}
              <div style={{
                position: 'absolute', bottom: '3rem', right: '-1rem', zIndex: 20,
                background: 'rgba(2,6,23,0.7)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '0.75rem', padding: '0.75rem 1rem',
                animation: 'floatTag 9s ease-in-out infinite',
                animationDelay: '3s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <div>
                    <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Recaudación</div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(134,239,172,0.8)' }}>+30% promedio</div>
                  </div>
                </div>
              </div>

              {/* Globe */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <Globe3D size={420} />
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes floatTag {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
