import { useEffect, useRef, useState } from 'react'

// ── Bank logo using real image — with entrance animation ──
const BankLogo = ({ src, name, borderColor, blendMode = 'lighten', visible, delay }) => (
  <div
    style={{
      width: '100%',
      borderRadius: '0.75rem',
      background: '#020617',
      border: `1px solid ${borderColor}35`,
      display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '0.6rem 0.75rem',
      height: 72,
      cursor: 'default',
      boxSizing: 'border-box',
      overflow: 'hidden',
      // Entrance animation
      opacity:   visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.92)',
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.2,0,0.1,1) ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = `${borderColor}70`
      e.currentTarget.style.transform   = 'translateY(-3px) scale(1)'
      e.currentTarget.style.boxShadow   = `0 8px 28px ${borderColor}25`
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = `${borderColor}35`
      e.currentTarget.style.transform   = 'translateY(0) scale(1)'
      e.currentTarget.style.boxShadow   = 'none'
    }}
  >
    <img
      src={src}
      alt={name}
      style={{
        maxHeight: 46,
        maxWidth: '88%',
        objectFit: 'contain',
        mixBlendMode: blendMode,
      }}
    />
  </div>
)

// ── Module tab pill ──
const ModuleTab = ({ label, icon, active, onClick, color }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      border: `1px solid ${active ? color : 'rgba(255,255,255,0.08)'}`,
      background: active ? `${color}18` : 'transparent',
      color: active ? color : '#64748b',
      fontSize: '0.6rem', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.12em',
      cursor: 'pointer', transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      fontFamily: "'Outfit', sans-serif",
    }}
  >
    <span style={{ fontSize: '0.8rem' }}>{icon}</span>
    {label}
  </button>
)

// ── Dashboard Mockup ──
const DashboardMockup = () => {
  const [activeModule, setActiveModule] = useState(0)
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const modules = [
    {
      label: 'Inmuebles',
      icon: '🏢',
      color: '#3584E4',
      stats: [
        { label: 'Recaudado', value: '$4.2M',   change: '+14.2%' },
        { label: 'Contribuyentes', value: '12,840', change: '+3.1%'  },
        { label: 'Tasa Cobro',   value: '91.4%', change: '+1.8%'  },
      ],
      bars: [58, 72, 48, 85, 62, 78, 55, 90, 68, 74, 88, 71],
    },
    {
      label: 'Act. Económica',
      icon: '🏪',
      color: '#22c55e',
      stats: [
        { label: 'Recaudado',      value: '$2.8M',  change: '+9.7%'  },
        { label: 'Contribuyentes', value: '5,320',  change: '+5.4%'  },
        { label: 'Tasa Cobro',     value: '88.2%',  change: '+2.3%'  },
      ],
      bars: [42, 65, 38, 72, 55, 68, 45, 80, 60, 70, 75, 62],
    },
    {
      label: 'Vehículos',
      icon: '🚗',
      color: '#a855f7',
      stats: [
        { label: 'Recaudado',      value: '$1.1M',  change: '+6.3%'  },
        { label: 'Contribuyentes', value: '8,910',  change: '+2.8%'  },
        { label: 'Tasa Cobro',     value: '94.7%',  change: '+0.9%'  },
      ],
      bars: [70, 55, 80, 62, 75, 58, 88, 65, 72, 60, 85, 68],
    },
    {
      label: 'Aseo Urbano',
      icon: '♻️',
      color: '#f97316',
      stats: [
        { label: 'Recaudado',      value: '$680K',  change: '+11.5%' },
        { label: 'Contribuyentes', value: '18,200', change: '+4.2%'  },
        { label: 'Tasa Cobro',     value: '78.9%',  change: '+3.6%'  },
      ],
      bars: [45, 60, 35, 70, 50, 65, 40, 78, 55, 62, 72, 58],
    },
  ]

  const mod = modules[activeModule]

  return (
    <div ref={ref} style={{
      background: 'rgba(8,15,35,0.95)',
      border: '1px solid rgba(53,132,228,0.15)',
      borderRadius: '1.5rem',
      overflow: 'hidden',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0.75rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F56','#FFBD2E','#27C93F'].map((c,i) => (
            <div key={i} style={{ width:10, height:10, borderRadius:'50%', background:c, opacity:0.85 }}/>
          ))}
        </div>
        <span style={{ flex:1, textAlign:'center', fontSize:9, color:'#606080', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>
          Asis Recaudación — Panel de Control
        </span>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }}/>
          <span style={{ fontSize:8, color:'#22c55e', fontWeight:700, letterSpacing:'0.1em' }}>EN VIVO</span>
        </div>
      </div>

      {/* Module tabs */}
      <div style={{
        display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        overflowX: 'auto',
      }}>
        {modules.map((m, i) => (
          <ModuleTab
            key={i}
            label={m.label}
            icon={m.icon}
            active={activeModule === i}
            onClick={() => setActiveModule(i)}
            color={m.color}
          />
        ))}
      </div>

      {/* Dashboard body */}
      <div style={{ padding: '1.25rem' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.75rem', marginBottom:'1rem' }}>
          {mod.stats.map((stat, i) => (
            <div key={i} style={{
              borderRadius:'0.75rem', padding:'0.9rem',
              background:'rgba(255,255,255,0.02)',
              border:`1px solid ${mod.color}20`,
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 0.5s ease ${i*120}ms`,
            }}>
              <div style={{ fontSize:8, color:mod.color, textTransform:'uppercase', letterSpacing:'0.15em', fontWeight:700, marginBottom:6 }}>
                {stat.label}
              </div>
              <div style={{ fontSize:'1.35rem', fontWeight:300, color:'#fff', marginBottom:4, lineHeight:1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize:9, color:'rgba(74,222,128,0.85)', fontWeight:700, letterSpacing:'0.1em' }}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{
          borderRadius:'0.75rem', padding:'1rem',
          background:'rgba(10,20,45,0.4)',
          border:'1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ fontSize:8, fontWeight:700, letterSpacing:'0.15em', color:'#606080', textTransform:'uppercase', marginBottom:'0.75rem' }}>
            Tendencia Mensual — {mod.label}
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:80 }}>
            {mod.bars.map((h, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', height:'100%' }}>
                <div style={{
                  borderRadius:'2px 2px 0 0',
                  height: animate ? `${h}%` : '0%',
                  background:`linear-gradient(to top, ${mod.color}60, ${mod.color}18)`,
                  transition:`height 0.7s ease ${i*40}ms`,
                }}/>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
            {['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'].map(m => (
              <span key={m} style={{ fontSize:7, color:'#475569', fontWeight:500 }}>{m}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Payment method card ──
const PayMethod = ({ icon, label, desc, color }) => (
  <div style={{
    display:'flex', alignItems:'center', gap:'0.75rem',
    padding:'0.7rem 0.9rem',
    borderRadius:'0.75rem',
    background:`${color}0D`,
    border:`1px solid ${color}25`,
    transition:'all 0.3s ease',
  }}
    onMouseEnter={e => {
      e.currentTarget.style.background = `${color}1A`
      e.currentTarget.style.borderColor = `${color}50`
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = `${color}0D`
      e.currentTarget.style.borderColor = `${color}25`
    }}
  >
    <div style={{
      width:34, height:34, borderRadius:'0.5rem',
      background:`${color}20`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:'1rem', flexShrink:0,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize:'0.7rem', fontWeight:700, color:'#ffffff', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:'0.6rem', color:'#64748b', lineHeight:1.4 }}>{desc}</div>
    </div>
  </div>
)

// ── Main Section ──
const SoftwareSection = () => {
  const banksRef     = useRef(null)
  const [banksVisible, setBanksVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBanksVisible(true) },
      { threshold: 0.3 }
    )
    if (banksRef.current) observer.observe(banksRef.current)
    return () => observer.disconnect()
  }, [])
  const payMethods = [
    { icon:'📱', label:'Pago Móvil',       desc:'El método más usado en Venezuela. Rápido y sin comisiones.',  color:'#3584E4' },
    { icon:'💳', label:'Botón de Pago',     desc:'Integración directa con la banca online del contribuyente.',  color:'#22c55e' },
    { icon:'🏧', label:'Punto de Venta',    desc:'Terminal POS físico y virtual en oficinas municipales.',       color:'#a855f7' },
    { icon:'🔄', label:'Transferencia',     desc:'Bancaria directa con confirmación automática en el sistema.',  color:'#f97316' },
    { icon:'⚡', label:'Débito Inmediato',  desc:'Cargo automático autorizado para contribuyentes frecuentes.', color:'#00d4ff' },
    { icon:'📲', label:'Otros Métodos',     desc:'Divisas, criptoactivos y métodos adicionales por convenio.',  color:'#ec4899' },
  ]

  const banks = [
    { src:'/banks/banco-banesco.png',   name:'Banesco',            borderColor:'#1a3a7a', blendMode:'lighten' },
    { src:'/banks/banco-bdv.png',       name:'Banco de Venezuela', borderColor:'#CC2020', blendMode:'lighten' },
    { src:'/banks/banco-100.png',       name:'100% Banco',         borderColor:'#FF6B00', blendMode:'lighten' },
    { src:'/banks/banco-bancamiga.png', name:'Bancamiga',          borderColor:'#3aaa35', blendMode:'lighten' },
    { src:'/banks/banco-bnc.png',       name:'BNC',                borderColor:'#f97316', blendMode:'lighten' },
  ]

  const advantages = [
    {
      icon: '⚡',
      color: '#3584E4',
      title: 'Procesamiento Instantáneo',
      desc: 'Confirmación de pago en tiempo real. El sistema actualiza el estado del contribuyente automáticamente sin intervención humana.',
    },
    {
      icon: '🔐',
      color: '#22c55e',
      title: 'Seguridad Bancaria',
      desc: 'Encriptación de extremo a extremo y cumplimiento de normativas SUDEBAN. Auditoría completa de cada transacción.',
    },
    {
      icon: '🏦',
      color: '#a855f7',
      title: 'Multi-banco',
      desc: 'Convenios activos con los principales bancos venezolanos. El contribuyente paga desde su banco preferido.',
    },
  ]

  return (
    <section id="software" style={{
      position:'relative',
      paddingTop:'8rem',
      paddingBottom:'6rem',
      overflow:'hidden',
      backgroundColor:'#020617',
    }}>
      {/* Subtle bg glow */}
      <div style={{
        position:'absolute', top:'30%', right:'-10%',
        width:500, height:500,
        background:'radial-gradient(circle, rgba(53,132,228,0.05) 0%, transparent 70%)',
        borderRadius:'50%', pointerEvents:'none',
      }}/>

      <div style={{
        width:'100%', maxWidth:'1200px',
        marginLeft:'auto', marginRight:'auto',
        paddingLeft:'3rem', paddingRight:'3rem',
        boxSizing:'border-box',
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign:'center', marginBottom:'4rem' }} data-aos="fade-up">
          <p style={{
            color:'#3584E4', fontWeight:700,
            letterSpacing:'0.3em', textTransform:'uppercase',
            fontSize:'0.625rem', marginBottom:'1rem',
          }}>
            Plataforma de Recaudación
          </p>
          <h2 style={{
            fontSize:'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight:300, color:'#ffffff',
            textTransform:'uppercase', letterSpacing:'0.12em',
            marginBottom:'1.25rem', lineHeight:1.2,
          }}>
            Software de{' '}
            <span style={{ color:'#3584E4', fontWeight:500 }}>Recaudación Inteligente</span>
          </h2>
          <div style={{ width:'4rem', height:'1px', background:'rgba(53,132,228,0.3)', margin:'0 auto 1.25rem' }}/>
          <p style={{
            fontSize:'0.8rem', color:'#64748b', maxWidth:'560px',
            margin:'0 auto', lineHeight:1.8, fontWeight:300,
          }}>
            Sistema modular, adaptable y 100% automatizado. Diseñado para municipios e instituciones
            que buscan eficiencia real en la gestión tributaria.
          </p>
        </div>

        {/* ── Dashboard + Advantages ── */}
        <div style={{
          display:'grid', gridTemplateColumns:'3fr 2fr',
          gap:'2.5rem', alignItems:'start', marginBottom:'4rem',
        }}>
          <div data-aos="fade-up" data-aos-delay="100">
            <DashboardMockup />
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }} data-aos="fade-up" data-aos-delay="200">
            <div style={{ marginBottom:'0.5rem' }}>
              <p style={{ fontSize:'0.6rem', color:'#3584E4', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.5rem' }}>
                Módulos disponibles
              </p>
              <h3 style={{ fontSize:'1.1rem', fontWeight:600, color:'#ffffff', lineHeight:1.3, letterSpacing:'0.05em' }}>
                Un sistema para cada tipo de impuesto y gestión
              </h3>
              <p style={{ fontSize:'0.8rem', color:'#64748b', lineHeight:1.7, marginTop:'0.5rem', fontWeight:300 }}>
                Inmuebles Urbanos, Actividad Económica, Vehículos, Aseo Urbano y módulos personalizados
                para cualquier área de gestión institucional.
              </p>
            </div>

            {advantages.map((a, i) => (
              <div key={i} style={{
                background:'rgba(15,23,42,0.4)',
                border:`1px solid ${a.color}18`,
                backdropFilter:'blur(16px)',
                borderRadius:'1rem',
                padding:'1.25rem',
                display:'flex', gap:'1rem', alignItems:'flex-start',
                transition:'all 0.3s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${a.color}40`
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${a.color}18`
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div style={{
                  width:38, height:38, borderRadius:'0.6rem',
                  background:`${a.color}15`,
                  border:`1px solid ${a.color}25`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1rem', flexShrink:0,
                }}>
                  {a.icon}
                </div>
                <div>
                  <div style={{ fontSize:'0.75rem', fontWeight:700, color:'#ffffff', marginBottom:'0.25rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize:'0.72rem', color:'#64748b', lineHeight:1.6, fontWeight:300 }}>
                    {a.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pasarela de Pagos ── */}
        <div style={{
          background:'rgba(8,15,35,0.6)',
          border:'1px solid rgba(53,132,228,0.12)',
          borderRadius:'1.5rem',
          padding:'2.5rem',
          marginBottom:'2rem',
        }} data-aos="fade-up">

          {/* Header */}
          <div style={{ marginBottom:'2rem' }}>
            <p style={{ fontSize:'0.6rem', color:'#3584E4', fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:'0.5rem' }}>
              Integración Bancaria
            </p>
            <h3 style={{ fontSize:'1.3rem', fontWeight:600, color:'#ffffff', letterSpacing:'0.05em', lineHeight:1.2, marginBottom:'0.5rem' }}>
              Alianzas con la Banca Venezolana
            </h3>
            <p style={{ fontSize:'0.78rem', color:'#64748b', maxWidth:'600px', lineHeight:1.7, fontWeight:300 }}>
              Convenios directos con los principales bancos del país. El contribuyente paga
              desde su banco preferido — el sistema confirma y registra en segundos, sin intervención humana.
            </p>
          </div>

          {/* Banks — protagonismo total, grid grande */}
          <div
            ref={banksRef}
            style={{
              display:'grid',
              gridTemplateColumns:'repeat(5,1fr)',
              gap:'1rem',
              marginBottom:'2rem',
            }}
          >
            {banks.map((b, i) => (
              <BankLogo
                key={i}
                src={b.src}
                name={b.name}
                borderColor={b.borderColor}
                blendMode={b.blendMode}
                visible={banksVisible}
                delay={i * 100}
              />
            ))}
          </div>

          {/* Métodos de pago — discreta fila de pills */}
          <div style={{
            paddingTop:'1.25rem',
            borderTop:'1px solid rgba(255,255,255,0.05)',
            display:'flex', flexWrap:'wrap', alignItems:'center', gap:'0.6rem',
          }}>
            <span style={{
              fontSize:'0.55rem', color:'#64748b', fontWeight:700,
              letterSpacing:'0.2em', textTransform:'uppercase', marginRight:'0.5rem',
            }}>
              Métodos:
            </span>
            {['Pago Móvil','Botón de Pago','Punto de Venta','Transferencia','Débito Inmediato','Otros'].map((m,i) => (
              <span key={i} style={{
                fontSize:'0.6rem', color:'#94a3b8', fontWeight:500,
                padding:'0.25rem 0.75rem',
                borderRadius:'9999px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.08)',
              }}>
                {m}
              </span>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(1.3); }
        }
      `}</style>
    </section>
  )
}

export default SoftwareSection
