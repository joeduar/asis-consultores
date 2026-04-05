import { useEffect, useRef, useState } from 'react'
import useIsMobile from './useIsMobile'

const USD_TO_BS = 86.50
const formatBs = (usdStr) => {
  const num = parseFloat(usdStr.replace(/[$MK]/g,''))
  const mult = usdStr.includes('M') ? 1_000_000 : usdStr.includes('K') ? 1_000 : 1
  const bs = num * mult * USD_TO_BS
  if (bs >= 1_000_000_000) return `${(bs/1_000_000_000).toFixed(2)} MMM Bs`
  if (bs >= 1_000_000) return `${Math.round(bs/1_000_000).toLocaleString()} M Bs`
  return `${Math.round(bs/1_000).toLocaleString()} K Bs`
}

const AnimatedDonut = ({ percentage, color, label, sublabel, delay=0 }) => {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)
  const isMobile = useIsMobile()
  const size = isMobile ? 90 : 120
  const r = isMobile ? 33 : 45
  const circ = 2 * Math.PI * r
  const offset = circ - (percentage/100)*circ

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setAnimated(true) }, { threshold:0.3 })
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: isMobile ? '0.4rem' : '0.75rem' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={isMobile?5:6}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={isMobile?5:6} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={animated?offset:circ}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition:`stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms` }}
        />
        <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
          fill="white" style={{ fontSize: isMobile?'14px':'20px', fontFamily:"'Outfit',sans-serif", fontWeight:300 }}>
          {animated?`${percentage}%`:'0%'}
        </text>
        {sublabel && (
          <text x={size/2} y={size/2+(isMobile?11:14)} textAnchor="middle" dominantBaseline="central"
            fill={color} style={{ fontSize: isMobile?'6px':'8px', fontFamily:"'Outfit',sans-serif", fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' }}>
            {sublabel}
          </text>
        )}
      </svg>
      <span style={{ fontSize: isMobile?'0.55rem':'0.6rem', color:'#94a3b8', textAlign:'center', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase' }}>
        {label}
      </span>
    </div>
  )
}

const AnimatedBar = ({ label, value, percentage, color, delay, animate, highlight }) => {
  const isMobile = useIsMobile()
  return (
    <div style={{
      display:'flex', flexDirection:'column', gap:'0.35rem',
      padding: highlight ? '0.6rem 0.75rem' : '0',
      borderRadius: highlight ? '0.75rem' : '0',
      background: highlight ? `${color}08` : 'transparent',
      border: highlight ? `1px solid ${color}20` : 'none',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', flex:1, minWidth:0 }}>
          {highlight && <span style={{ fontSize:'0.55rem', color, fontWeight:800, flexShrink:0 }}>★</span>}
          <span style={{ fontSize: isMobile?'0.6rem':'0.65rem', color: highlight?'#ffffff':'#94a3b8', fontWeight: highlight?600:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
            {label}
          </span>
        </div>
        <div style={{ textAlign:'right', flexShrink:0, marginLeft:'0.5rem' }}>
          <div style={{ fontSize: isMobile?'0.65rem':'0.72rem', color, fontWeight:700 }}>{value}</div>
          <div style={{ fontSize:'0.5rem', color:'#64748b', fontWeight:500 }}>≈ {formatBs(value)}</div>
        </div>
      </div>
      <div style={{ height: highlight?6:5, background:'rgba(255,255,255,0.05)', borderRadius:9999, overflow:'hidden' }}>
        <div style={{
          height:'100%', borderRadius:9999,
          background:`linear-gradient(90deg,${color}88,${color})`,
          width: animate?`${percentage}%`:'0%',
          transition:`width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          boxShadow: highlight?`0 0 8px ${color}60`:'none',
        }}/>
      </div>
    </div>
  )
}

const IntelligenceSection = () => {
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setAnimate(true) }, { threshold:0.1 })
    if(sectionRef.current) obs.observe(sectionRef.current)
    return ()=>obs.disconnect()
  }, [])

  const recaudacionBars = [
    { label:'Actividad Económica', value:'$28.4M', percentage:95, color:'#22c55e', delay:0,   highlight:false },
    { label:'Inmuebles Urbanos',   value:'$19.8M', percentage:78, color:'#3584E4', delay:100, highlight:false },
    { label:'Aseo Urbano',         value:'$21.2M', percentage:85, color:'#f97316', delay:200, highlight:true  },
    { label:'Vehículos',           value:'$8.6M',  percentage:44, color:'#a855f7', delay:300, highlight:false },
    { label:'Otros Módulos',       value:'$3.1M',  percentage:22, color:'#00d4ff', delay:400, highlight:false },
  ]

  const advisoryItems = [
    { icon:'📋', color:'#3584E4', title:'Diagnóstico Tributario', desc:'Análisis profundo de la cartera de contribuyentes, identificación de brechas y oportunidades de mejora.' },
    { icon:'📣', color:'#22c55e', title:'Estrategias de Cobro',   desc:'Diseño e implementación de campañas y protocolos de cobro adaptados al perfil del ente.' },
    { icon:'⚖️', color:'#f97316', title:'Normativa & Compliance', desc:'Asesoría legal y normativa para el cumplimiento de ordenanzas, tasas y procesos tributarios vigentes.' },
    { icon:'📊', color:'#a855f7', title:'Análisis de Resultados', desc:'Revisión periódica de KPIs, reportes comparativos y recomendaciones ejecutivas.' },
  ]

  const pad = isMobile ? '1.25rem' : '3rem'
  const cardBase = { background:'rgba(15,23,42,0.5)', border:'1px solid rgba(168,85,247,0.10)', borderRadius:'1.5rem' }

  return (
    <section id="inteligencia" ref={sectionRef} style={{
      position:'relative', paddingTop: isMobile?'5rem':'8rem',
      paddingBottom: isMobile?'3rem':'6rem',
      overflow:'hidden', backgroundColor:'#020617',
    }}>
      <div style={{
        width:'100%', maxWidth:'1200px',
        marginLeft:'auto', marginRight:'auto',
        paddingLeft: pad, paddingRight: pad,
        boxSizing:'border-box',
      }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom: isMobile?'2.5rem':'4rem' }} data-aos="fade-up">
          <p style={{ color:'#a855f7', fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', fontSize:'0.625rem', marginBottom:'0.75rem' }}>
            KPIs Operativos
          </p>
          <h2 style={{
            fontSize: isMobile?'clamp(1.4rem,7vw,1.8rem)':'clamp(1.8rem,3vw,2.8rem)',
            fontWeight:300, color:'#ffffff',
            textTransform:'uppercase', letterSpacing: isMobile?'0.06em':'0.12em',
            marginBottom:'1rem', lineHeight:1.2,
          }}>
            Métricas de{' '}<span style={{ color:'#a855f7', fontWeight:500 }}>Rendimiento</span>
          </h2>
          <div style={{ width:'4rem', height:'1px', background:'rgba(168,85,247,0.3)', margin:'0 auto' }}/>
        </div>

        {/* ── Row 1: Donuts ── */}
        <div style={{ ...cardBase, padding: isMobile?'1.5rem':'2.5rem', marginBottom:'1.5rem' }} data-aos="fade-up">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: isMobile?'0.75rem':'2rem' }}>
            <AnimatedDonut percentage={94} color="#a855f7" label="Eficiencia Cobro"     sublabel="Índice"  delay={0}/>
            <AnimatedDonut percentage={91} color="#3584E4" label="Tasa Recaudación"    sublabel="Anual"   delay={250}/>
            <AnimatedDonut percentage={87} color="#22c55e" label="Digitalización"      sublabel="Trámite" delay={500}/>
          </div>
        </div>

        {/* ── Row 2: Bars + Live metrics ── */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile?'1fr':'2fr 1fr',
          gap:'1.5rem', marginBottom:'1.5rem',
        }}>
          {/* Bars */}
          <div style={{ ...cardBase, padding: isMobile?'1.25rem':'2rem' }} data-aos="fade-up" data-aos-delay="100">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
              <div>
                <p style={{ fontSize:'0.55rem', color:'#a855f7', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.3rem' }}>
                  Distribución por Módulo
                </p>
                <h3 style={{ fontSize: isMobile?'1rem':'1.2rem', fontWeight:600, color:'#ffffff' }}>
                  Recaudación Anual
                </h3>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.35rem 0.8rem', borderRadius:'9999px', background:'rgba(242,166,44,0.10)', border:'1px solid rgba(242,166,44,0.25)', flexShrink:0 }}>
                <span style={{ fontSize:'0.85rem' }}>⚡</span>
                <span style={{ fontSize:'0.52rem', color:'#f2a62c', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em' }}>Power BI</span>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>
              {recaudacionBars.map((bar,i)=>(
                <AnimatedBar key={i} {...bar} animate={animate}/>
              ))}
            </div>
          </div>

          {/* Live metrics */}
          <div style={{ ...cardBase, padding: isMobile?'1.25rem':'2rem' }} data-aos="fade-up" data-aos-delay="150">
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', animation:'ping2 1.5s infinite' }}/>
              <span style={{ fontSize:'0.55rem', color:'#22c55e', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>En Vivo</span>
            </div>
            {/* Mini chart */}
            <svg viewBox="0 0 330 60" style={{ width:'100%', marginBottom:'1rem' }}>
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(53,132,228,0.15)"/>
                  <stop offset="100%" stopColor="rgba(53,132,228,0)"/>
                </linearGradient>
              </defs>
              <polygon points="0,60 0,48 40,38 80,42 120,28 160,32 200,20 240,25 280,12 330,8 330,60"
                fill="url(#lg1)" style={{ opacity: animate?1:0, transition:'opacity 0.8s ease-out 0.5s' }}/>
              <polyline points="0,48 40,38 80,42 120,28 160,32 200,20 240,25 280,12 330,8"
                fill="none" stroke="#3584E4" strokeWidth="2" strokeLinejoin="round"
                style={{ opacity: animate?1:0, transition:'opacity 0.8s ease-out 0.7s' }}/>
            </svg>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem', paddingTop:'0.75rem', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
              {[
                { label:'Trx procesadas hoy', value:'9,335',  color:'#3584E4', trend:'↑ 14.2%' },
                { label:'Recaudado hoy',       value:'$761K',  color:'#22c55e', trend:'↑ 30.4%' },
                { label:'Mora activa',          value:'8.3%',  color:'#f97316', trend:'↓ 2.1%'  },
              ].map((m,i)=>(
                <div key={i} style={{
                  opacity: animate?1:0, transform: animate?'translateY(0)':'translateY(6px)',
                  transition:`all 0.5s ease ${i*150}ms`,
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                }}>
                  <span style={{ fontSize:'0.62rem', color:'#64748b', fontWeight:500 }}>{m.label}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    <span style={{ fontSize: isMobile?'0.8rem':'0.9rem', fontWeight:700, color:'#ffffff' }}>{m.value}</span>
                    <span style={{ fontSize:'0.55rem', color:m.color, fontWeight:700 }}>{m.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Advisory ── */}
        <div style={{ ...cardBase, padding: isMobile?'1.5rem':'2.5rem', background:'rgba(53,132,228,0.04)', border:'1px solid rgba(53,132,228,0.16)' }} data-aos="fade-up" data-aos-delay="200">
          {/* Header */}
          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.3rem 0.8rem', borderRadius:'9999px', background:'rgba(53,132,228,0.12)', border:'1px solid rgba(53,132,228,0.3)', marginBottom:'1rem' }}>
              <span style={{ fontSize:'1rem' }}>🎓</span>
              <span style={{ fontSize:'0.52rem', color:'#3584E4', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em' }}>Servicio Incluido</span>
            </div>
            <h3 style={{ fontSize: isMobile?'1.1rem':'1.4rem', fontWeight:600, color:'#ffffff', lineHeight:1.3, marginBottom:'0.75rem' }}>
              Asesoría Estratégica{' '}<span style={{ color:'#3584E4' }}>& Financiera</span>
            </h3>
            <p style={{ fontSize:'0.78rem', color:'#64748b', lineHeight:1.7, fontWeight:300, maxWidth:500 }}>
              Equipo especializado que acompaña al cliente durante todo el contrato, garantizando el máximo rendimiento del sistema.
            </p>
          </div>

          {/* 4 pillars — 1 col mobile, 2 col desktop */}
          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile?'1fr':'repeat(2,1fr)',
            gap: isMobile?'0.75rem':'1rem',
          }}>
            {advisoryItems.map((item,i)=>(
              <div key={i} style={{
                padding:'1rem', background:'rgba(2,6,23,0.4)',
                border:`1px solid ${item.color}18`, borderRadius:'1rem',
                display:'flex', gap:'0.75rem', alignItems:'flex-start',
                transition:'all 0.3s ease',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${item.color}40`; e.currentTarget.style.background=`${item.color}08` }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${item.color}18`; e.currentTarget.style.background='rgba(2,6,23,0.4)' }}
              >
                <div style={{ width:34,height:34,borderRadius:'0.6rem',background:`${item.color}15`,border:`1px solid ${item.color}25`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',flexShrink:0 }}>
                  {item.icon}
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:'0.68rem',fontWeight:700,color:'#ffffff',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'0.3rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize:'0.66rem',color:'#64748b',fontWeight:300,lineHeight:1.6 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes ping2 { 0%{transform:scale(1);opacity:1;} 75%,100%{transform:scale(2.2);opacity:0;} }
      `}</style>
    </section>
  )
}

export default IntelligenceSection
