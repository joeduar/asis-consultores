import { useEffect, useRef, useState } from 'react'

// ── Animated KPI donut ──
const AnimatedDonut = ({ percentage, color, label, sublabel, delay = 0 }) => {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={radius} fill="none"
          stroke="rgba(255,255,255,0.04)" strokeWidth="6"/>
        <circle cx="55" cy="55" r={radius} fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          transform="rotate(-90 55 55)"
          style={{ transition: `stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms` }}
        />
        <text x="55" y="50" textAnchor="middle" dominantBaseline="central"
          fill="white" style={{ fontSize: '17px', fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>
          {animated ? `${percentage}%` : '0%'}
        </text>
        <text x="55" y="66" textAnchor="middle" dominantBaseline="central"
          fill={color} style={{ fontSize: '7px', fontFamily: "'Outfit',sans-serif", fontWeight: 700, letterSpacing: '0.1em' }}>
          {sublabel}
        </text>
      </svg>
      <span style={{
        fontSize: '0.58rem', color: '#94a3b8', textAlign: 'center',
        fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  )
}

// ── Animated progress bar with Bs equivalence ──
// Tasa referencial real: 1 USD ≈ 86.50 Bs (BCV marzo 2026)
const USD_TO_BS = 86.50
const formatBs = (usdStr) => {
  const num = parseFloat(usdStr.replace(/[$MK]/g, ''))
  const mult = usdStr.includes('M') ? 1_000_000 : usdStr.includes('K') ? 1_000 : 1
  const bs = num * mult * USD_TO_BS
  if (bs >= 1_000_000_000) return `${(bs / 1_000_000_000).toFixed(2)} MMM Bs`
  if (bs >= 1_000_000) return `${Math.round(bs / 1_000_000).toLocaleString()} M Bs`
  return `${Math.round(bs / 1_000).toLocaleString()} K Bs`
}

const AnimatedBar = ({ label, value, percentage, color, delay, animate, highlight }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', gap: '0.35rem',
    padding: highlight ? '0.6rem 0.75rem' : '0',
    borderRadius: highlight ? '0.75rem' : '0',
    background: highlight ? `${color}08` : 'transparent',
    border: highlight ? `1px solid ${color}20` : 'none',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {highlight && <span style={{ fontSize: '0.55rem', color, fontWeight: 800 }}>★</span>}
        <span style={{ fontSize: '0.65rem', color: highlight ? '#ffffff' : '#94a3b8', fontWeight: highlight ? 600 : 500 }}>
          {label}
        </span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '0.72rem', color, fontWeight: 700 }}>{value}</div>
        <div style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 500 }}>
          ≈ {formatBs(value)}
        </div>
      </div>
    </div>
    <div style={{ height: highlight ? 6 : 5, background: 'rgba(255,255,255,0.05)', borderRadius: 9999, overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 9999,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        width: animate ? `${percentage}%` : '0%',
        transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        boxShadow: highlight ? `0 0 8px ${color}60` : 'none',
      }}/>
    </div>
  </div>
)

const IntelligenceSection = () => {
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const cardBase = {
    background: 'rgba(15,23,42,0.5)',
    border: '1px solid rgba(168,85,247,0.10)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1.5rem',
  }

  const recaudacionBars = [
    { label: 'Actividad Económica', value: '$28.4M',  percentage: 95, color: '#22c55e', delay: 0,   highlight: false },
    { label: 'Inmuebles Urbanos',   value: '$19.8M',  percentage: 78, color: '#3584E4', delay: 100, highlight: false },
    { label: 'Aseo Urbano',         value: '$21.2M',  percentage: 85, color: '#f97316', delay: 200, highlight: true  },
    { label: 'Vehículos',           value: '$8.6M',   percentage: 44, color: '#a855f7', delay: 300, highlight: false },
    { label: 'Otros Módulos',       value: '$3.1M',   percentage: 22, color: '#00d4ff', delay: 400, highlight: false },
  ]

  const powerBiFeatures = [
    {
      icon: '📊',
      title: 'Dashboards Interactivos',
      desc: 'Visualizaciones dinámicas de recaudación, mora, eficiencia y tendencias actualizadas en tiempo real.',
    },
    {
      icon: '🤖',
      title: 'IA para Análisis Profundo',
      desc: 'Modelos de IA integrados para detectar patrones, relaciones de datos y anomalías automáticamente.',
      badge: 'En proceso',
    },
    {
      icon: '📈',
      title: 'Reportes Financieros',
      desc: 'Estados financieros, proyecciones y análisis comparativo por período — exportables en múltiples formatos.',
    },
    {
      icon: '🎯',
      title: 'KPIs Estratégicos',
      desc: 'Indicadores clave configurables por rol: directivo, operativo y financiero.',
    },
  ]

  return (
    <section id="inteligencia" ref={sectionRef} style={{
      position: 'relative',
      paddingTop: '8rem',
      paddingBottom: '6rem',
      overflow: 'hidden',
      backgroundColor: '#020617',
    }}>

      <div style={{
        position: 'absolute', top: '30%', right: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>

      <div style={{
        width: '100%', maxWidth: '1200px',
        marginLeft: 'auto', marginRight: 'auto',
        paddingLeft: '3rem', paddingRight: '3rem',
        boxSizing: 'border-box', position: 'relative', zIndex: 10,
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-aos="fade-up">
          <p style={{
            color: '#a855f7', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            fontSize: '0.625rem', marginBottom: '1rem',
          }}>
            Business Intelligence
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 300, color: '#ffffff',
            textTransform: 'uppercase', letterSpacing: '0.12em',
            marginBottom: '1.25rem', lineHeight: 1.2,
          }}>
            Reportes &{' '}
            <span style={{ color: '#a855f7', fontWeight: 500 }}>Análisis de Datos</span>
          </h2>
          <div style={{
            width: '4rem', height: '1px',
            background: 'rgba(168,85,247,0.3)',
            margin: '0 auto 1.25rem',
          }}/>
          <p style={{
            fontSize: '0.8rem', color: '#64748b',
            maxWidth: '540px', margin: '0 auto',
            lineHeight: 1.8, fontWeight: 300,
          }}>
            Dashboards modernos en <strong style={{ color: '#a855f7', fontWeight: 600 }}>Power BI</strong> con
            análisis básico y avanzado. Datos traducidos en decisiones estratégicas de mayor
            eficiencia operativa y financiera.
          </p>
        </div>

        {/* Row 1: KPIs + Barras por módulo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

          {/* KPI Donuts */}
          <div data-aos="fade-up" data-aos-delay="100"
            style={{ ...cardBase, padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
              KPIs Operativos
            </span>
            <h3 style={{ fontSize: '1rem', fontWeight: 300, color: '#ffffff',
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem', textAlign: 'center' }}>
              Métricas de Rendimiento
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', width: '100%' }}>
              <AnimatedDonut percentage={94} color="#a855f7" label="Eficiencia Cobro"  sublabel="ÍNDICE"   delay={0}/>
              <AnimatedDonut percentage={91} color="#3584E4" label="Tasa Recaudación" sublabel="ANUAL"    delay={200}/>
              <AnimatedDonut percentage={87} color="#22c55e" label="Digitalización"   sublabel="TRÁMITES" delay={400}/>
            </div>
          </div>

          {/* Recaudación por módulo */}
          <div data-aos="fade-up" data-aos-delay="200"
            style={{ ...cardBase, padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.3rem' }}>
                  Distribución por Módulo
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', margin: 0, letterSpacing: '0.05em' }}>
                  Recaudación Anual
                </h3>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.35rem 0.8rem', borderRadius: '9999px',
                background: 'rgba(242,166,44,0.10)',
                border: '1px solid rgba(242,166,44,0.25)',
              }}>
                <span style={{ fontSize: '0.85rem' }}>⚡</span>
                <span style={{ fontSize: '0.52rem', color: '#f2a62c', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em' }}>Power BI</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'center' }}>
              {recaudacionBars.map((bar, i) => (
                <AnimatedBar key={i} {...bar} animate={animate}/>
              ))}
            </div>
          </div>

        </div>

        {/* Row 2: Power BI features + live metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

          {/* Power BI features */}
          <div data-aos="fade-up" data-aos-delay="300"
            style={{ ...cardBase, padding: '2.5rem' }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.5rem' }}>
                Plataforma de Análisis
              </span>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', letterSpacing: '0.05em', margin: 0 }}>
                Capacidades Power BI
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {powerBiFeatures.map((f, i) => (
                <div key={i} style={{
                  padding: '1.25rem',
                  background: 'rgba(2,6,23,0.4)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '1rem',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                    e.currentTarget.style.background = 'rgba(168,85,247,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.background = 'rgba(2,6,23,0.4)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                    {f.badge && (
                      <span style={{
                        fontSize: '0.45rem', color: '#f59e0b', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        background: 'rgba(245,158,11,0.10)',
                        border: '1px solid rgba(245,158,11,0.25)',
                        padding: '0.15rem 0.5rem', borderRadius: '9999px',
                      }}>{f.badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ffffff',
                    textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 300, lineHeight: 1.6 }}>
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend + live metrics */}
          <div data-aos="fade-up" data-aos-delay="400"
            style={{ ...cardBase, padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Sparkline */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  Proyección IA
                </span>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.2rem 0.6rem', borderRadius: '9999px',
                  background: 'rgba(34,197,94,0.10)',
                  border: '1px solid rgba(34,197,94,0.25)',
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }}/>
                  <span style={{ fontSize: '0.48rem', color: '#22c55e', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em' }}>En vivo</span>
                </div>
              </div>
              <svg viewBox="0 0 200 60" style={{ width: '100%', height: 70 }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trendGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(168,85,247,0.3)"/>
                    <stop offset="100%" stopColor="rgba(168,85,247,0)"/>
                  </linearGradient>
                </defs>
                <polygon
                  points="0,60 0,48 25,44 50,46 75,38 100,40 125,28 150,30 175,18 200,10 200,60"
                  fill="url(#trendGrad)"
                  style={{ opacity: animate ? 1 : 0, transition: 'opacity 1s ease-out 0.4s' }}
                />
                <polyline
                  points="0,48 25,44 50,46 75,38 100,40 125,28 150,30 175,18 200,10"
                  fill="none" stroke="#a855f7" strokeWidth="2" strokeLinejoin="round"
                  style={{ opacity: animate ? 1 : 0, transition: 'opacity 0.8s ease-out 0.7s' }}
                />
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                {['Ene','Mar','May','Jul','Sep','Nov'].map(m => (
                  <span key={m} style={{ fontSize: '0.5rem', color: '#475569' }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Live metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem',
              paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {[
                { label: 'Trx procesadas hoy', value: '9,335',  color: '#3584E4', trend: '↑ 14.2%' },
                { label: 'Recaudado hoy',       value: '$761K',  color: '#22c55e', trend: '↑ 30.4%' },
                { label: 'Mora activa',          value: '8.3%',  color: '#f97316', trend: '↓ 2.1%'  },
              ].map((m, i) => (
                <div key={i} style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateY(0)' : 'translateY(6px)',
                  transition: `all 0.5s ease ${i * 150}ms`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '0.62rem', color: '#64748b', fontWeight: 500 }}>{m.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{m.value}</span>
                    <span style={{ fontSize: '0.55rem', color: m.color, fontWeight: 700 }}>{m.trend}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Row 3: Asesoría Estratégica y Financiera ── */}
        <div style={{ marginTop: '1.5rem' }} data-aos="fade-up" data-aos-delay="200">
          <div style={{
            ...cardBase,
            padding: '2.5rem',
            background: 'rgba(53,132,228,0.05)',
            border: '1px solid rgba(53,132,228,0.18)',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '3rem',
            alignItems: 'center',
          }}>

            {/* Left: title + badge */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.3rem 0.8rem', borderRadius: '9999px',
                background: 'rgba(53,132,228,0.12)',
                border: '1px solid rgba(53,132,228,0.3)',
                marginBottom: '1.25rem',
              }}>
                <span style={{ fontSize: '1rem' }}>🎓</span>
                <span style={{ fontSize: '0.52rem', color: '#3584E4', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Servicio Incluido
                </span>
              </div>
              <h3 style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontWeight: 600, color: '#ffffff',
                letterSpacing: '0.05em', lineHeight: 1.3,
                marginBottom: '1rem',
              }}>
                Asesoría Estratégica{' '}
                <span style={{ color: '#3584E4' }}>& Financiera</span>
              </h3>
              <p style={{
                fontSize: '0.8rem', color: '#64748b',
                fontWeight: 300, lineHeight: 1.75,
              }}>
                Equipo especializado de consultores que acompaña al cliente durante todo el contrato,
                garantizando el máximo rendimiento del sistema y la mejora continua en los indicadores
                de recaudación.
              </p>
            </div>

            {/* Right: 4 pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
              {[
                {
                  icon: '📋',
                  color: '#3584E4',
                  title: 'Diagnóstico Tributario',
                  desc: 'Análisis profundo del estado actual de la cartera de contribuyentes, identificación de brechas y oportunidades de mejora.',
                },
                {
                  icon: '📣',
                  color: '#22c55e',
                  title: 'Estrategias de Cobro',
                  desc: 'Diseño e implementación de campañas y protocolos de cobro adaptados al perfil del ente, aumentando la tasa de recuperación.',
                },
                {
                  icon: '⚖️',
                  color: '#f97316',
                  title: 'Normativa & Compliance',
                  desc: 'Asesoría legal y normativa para el cumplimiento de ordenanzas, tasas y procesos tributarios vigentes.',
                },
                {
                  icon: '📊',
                  color: '#a855f7',
                  title: 'Análisis de Resultados',
                  desc: 'Revisión periódica de KPIs, reportes comparativos y recomendaciones ejecutivas para la toma de decisiones.',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '1.1rem',
                  background: 'rgba(2,6,23,0.4)',
                  border: `1px solid ${item.color}18`,
                  borderRadius: '1rem',
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${item.color}40`
                    e.currentTarget.style.background = `${item.color}08`
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${item.color}18`
                    e.currentTarget.style.background = 'rgba(2,6,23,0.4)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: '0.6rem',
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ffffff',
                      textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b',
                      fontWeight: 300, lineHeight: 1.6 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes ping2 {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default IntelligenceSection
