import { ArrowRight } from 'lucide-react'
import useIsMobile from './useIsMobile'

// ── Badge de estado ──
const StatusBadge = ({ label, type = 'live' }) => {
  const styles = {
    live:    { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  color: '#22c55e', dot: '#22c55e' },
    beta:    { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b', dot: '#f59e0b' },
    coming:  { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', color: '#a855f7', dot: '#a855f7' },
  }
  const s = styles[type]
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      padding: '0.2rem 0.6rem', borderRadius: '9999px',
      background: s.bg, border: `1px solid ${s.border}`,
    }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot,
        animation: type === 'live' ? 'pulse 2s infinite' : 'none' }} />
      <span style={{ fontSize: '0.5rem', fontWeight: 700, color: s.color,
        textTransform: 'uppercase', letterSpacing: '0.15em' }}>{label}</span>
    </div>
  )
}

const EcosystemSection = () => {
  const isMobile = useIsMobile()

  const mainTools = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:24,height:24}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
        </svg>
      ),
      color: '#25D366',
      title: 'Chatbots IA',
      subtitle: 'WhatsApp & Telegram',
      desc: 'Agentes conversacionales inteligentes que atienden consultas de contribuyentes, ejecutan consultas de deuda, generan estados de cuenta y procesan solicitudes — sin intervención humana, disponibles 24/7.',
      features: ['Consulta de deuda en tiempo real', 'Generación de estado de cuenta', 'Solicitudes y trámites automáticos', 'Integración directa con el sistema'],
      status: 'live',
      statusLabel: 'Activo',
      accent: 'rgba(37,211,102,0.08)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:24,height:24}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>
        </svg>
      ),
      color: '#a855f7',
      title: 'Agentes IA de Voz y Texto',
      subtitle: 'Primer contacto inteligente',
      desc: 'Agentes autónomos capaces de mantener conversaciones naturales por voz y texto para el primer contacto con clientes u organizaciones. Resuelven consultas, califican leads y escalan casos complejos al equipo humano.',
      features: ['Conversación natural por voz', 'Calificación automática de leads', 'Escalado inteligente a agente humano', 'Multicanal: web, telefónico, chat'],
      status: 'beta',
      statusLabel: 'En desarrollo',
      accent: 'rgba(168,85,247,0.08)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:24,height:24}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"/>
        </svg>
      ),
      color: '#3584E4',
      title: 'Automatización de Procesos',
      subtitle: 'Cero errores, máxima velocidad',
      desc: 'Los procesos más críticos y delicados del sistema se ejecutan de forma completamente automática. Estados de cuenta bancarios, conciliación bancaria, reportes periódicos y protocolos internos — sin margen de error humano.',
      features: ['Estados de cuenta automáticos', 'Conciliación bancaria automática', 'Reportes y cierres periódicos', 'Protocolos y flujos del sistema'],
      status: 'live',
      statusLabel: 'Activo',
      accent: 'rgba(53,132,228,0.08)',
    },
  ]

  const extraTools = [
    {
      icon: '📊', color: '#f59e0b',
      title: 'Reportes Power BI',
      desc: 'Dashboards financieros modernos con análisis básico y avanzado de datos. Integración de modelos IA para relaciones de datos más profundas.',
      tag: 'Business Intelligence',
    },
    {
      icon: '🏛️', color: '#00d4ff',
      title: 'Portal del Contribuyente',
      desc: 'Plataforma web donde el ciudadano consulta su deuda, descarga solvencias, realiza pagos y gestiona sus trámites sin ir a oficinas.',
      tag: 'Autogestión',
    },
    {
      icon: '🔗', color: '#ec4899',
      title: 'Integraciones API',
      desc: 'Conexión con sistemas bancarios, catastrales, SENIAT y plataformas gubernamentales mediante APIs abiertas y seguras.',
      tag: 'Conectividad',
    },
    {
      icon: '🛡️', color: '#22c55e',
      title: 'Seguridad & Auditoría',
      desc: 'Encriptación de grado bancario, logs de auditoría completos y cumplimiento de normativas SUDEBAN para cada operación.',
      tag: 'Compliance',
    },
  ]

  const cardBase = {
    background: 'rgba(15,23,42,0.5)',
    border: '1px solid rgba(53,132,228,0.10)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1.5rem',
    transition: 'all 0.35s ease',
    cursor: 'default',
  }

  const pad = isMobile ? '1.25rem' : '3rem'

  return (
    <section id="ecosistema" style={{
      position: 'relative',
      paddingTop: isMobile ? '5rem' : '8rem',
      paddingBottom: isMobile ? '3rem' : '6rem',
      overflow: 'hidden',
      backgroundColor: '#020617',
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>

      <div style={{
        width: '100%', maxWidth: '1200px',
        marginLeft: 'auto', marginRight: 'auto',
        paddingLeft: pad, paddingRight: pad,
        boxSizing: 'border-box',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }} data-aos="fade-up">
          <p style={{
            color: '#a855f7', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            fontSize: '0.625rem', marginBottom: '1rem',
          }}>
            Ecosistema Tecnológico
          </p>
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.5rem,7vw,2rem)' : 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 300, color: '#ffffff',
            textTransform: 'uppercase', letterSpacing: isMobile ? '0.06em' : '0.12em',
            marginBottom: '1.25rem', lineHeight: 1.2,
          }}>
            Herramientas{' '}
            <span style={{ color: '#a855f7', fontWeight: 500 }}>con IA Integrada</span>
          </h2>
          <div style={{ width: '4rem', height: '1px', background: 'rgba(168,85,247,0.3)', margin: '0 auto 1.25rem' }}/>
          <p style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
            Más allá del software de recaudación — un ecosistema completo de automatización
            e inteligencia artificial que transforma cada proceso de tu institución.
          </p>
        </div>

        {/* Main tools — 1 col mobile, 3 col desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: '1.5rem', marginBottom: '1.5rem',
        }}>
          {mainTools.map((tool, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
              style={{
                ...cardBase,
                padding: isMobile ? '1.5rem' : '2rem',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
                background: tool.accent,
                border: `1px solid ${tool.color}20`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${tool.color}45`
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 20px 48px ${tool.color}12`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${tool.color}20`
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top row: icon + status */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '0.9rem',
                  background: `${tool.color}18`, border: `1px solid ${tool.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: tool.color, flexShrink: 0,
                }}>
                  {tool.icon}
                </div>
                <StatusBadge label={tool.statusLabel} type={tool.status} />
              </div>

              {/* Title */}
              <div>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : '1rem', fontWeight: 700, color: '#ffffff',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  lineHeight: 1.2, margin: '0 0 0.25rem',
                }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '0.65rem', color: tool.color, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
                  {tool.subtitle}
                </p>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 300, lineHeight: 1.75, margin: 0, flexGrow: 1 }}>
                {tool.desc}
              </p>

              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {tool.features.map((f, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: tool.color, flexShrink: 0, opacity: 0.8 }}/>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 300 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                color: tool.color, fontSize: '0.6rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                paddingTop: '0.5rem', borderTop: `1px solid ${tool.color}15`,
              }}>
                Conocer más <ArrowRight size={12}/>
              </div>
            </div>
          ))}
        </div>

        {/* Extra tools — 2 col mobile, 4 col desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? '0.75rem' : '1.5rem',
        }}>
          {extraTools.map((tool, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 80}
              style={{
                ...cardBase,
                padding: isMobile ? '1rem' : '1.5rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${tool.color}35`
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 12px 32px ${tool.color}10`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(53,132,228,0.10)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon + tag */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '0.65rem',
                  background: `${tool.color}12`, border: `1px solid ${tool.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  {tool.icon}
                </div>
                {!isMobile && (
                  <span style={{
                    fontSize: '0.48rem', color: tool.color, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    background: `${tool.color}10`, padding: '0.2rem 0.5rem',
                    borderRadius: '9999px', border: `1px solid ${tool.color}20`,
                  }}>
                    {tool.tag}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: isMobile ? '0.72rem' : '0.82rem', fontWeight: 700, color: '#ffffff',
                textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3, margin: 0,
              }}>
                {tool.title}
              </h3>

              {/* Desc */}
              <p style={{ fontSize: isMobile ? '0.68rem' : '0.75rem', color: '#94a3b8', fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
                {tool.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}

export default EcosystemSection
