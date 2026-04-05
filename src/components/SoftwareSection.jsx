import { useEffect, useRef, useState } from 'react'
import useIsMobile from './useIsMobile'
import IPhoneMockup from './IPhoneMockup'

// ── Bank logo ──
const BankLogo = ({ src, name, borderColor, blendMode='lighten', visible, delay, mobile }) => (
  <div style={{
    width: '100%',
    borderRadius: '0.75rem',
    background: '#020617',
    border: `1px solid ${borderColor}35`,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: mobile ? '0.75rem 0.5rem' : '0.6rem 0.75rem',
    height: mobile ? 80 : 72,
    cursor: 'default',
    boxSizing: 'border-box',
    overflow: 'hidden',
    gap: '0.4rem',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.92)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.2,0,0.1,1) ${delay}ms, border-color 0.3s ease`,
  }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = `${borderColor}70`
      e.currentTarget.style.transform = 'translateY(-3px) scale(1)'
      e.currentTarget.style.boxShadow = `0 8px 28px ${borderColor}25`
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = `${borderColor}35`
      e.currentTarget.style.transform = 'translateY(0) scale(1)'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <img src={src} alt={name} style={{
      maxHeight: mobile ? 40 : 46,
      maxWidth: '85%',
      objectFit: 'contain',
      mixBlendMode: blendMode,
    }}/>
    {mobile && (
      <span style={{
        fontSize: '0.5rem', color: '#64748b',
        fontWeight: 600, textAlign: 'center',
        letterSpacing: '0.05em', lineHeight: 1.2,
      }}>{name}</span>
    )}
  </div>
)

// ── Module tab ──
const ModuleTab = ({ label, icon, active, onClick, color, mobile }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: mobile ? '0.4rem 0.6rem' : '0.5rem 1rem',
    borderRadius: '9999px',
    border: `1px solid ${active ? color : 'rgba(255,255,255,0.08)'}`,
    background: active ? `${color}18` : 'transparent',
    color: active ? color : '#64748b',
    fontSize: mobile ? '0.55rem' : '0.6rem',
    fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: mobile ? '0.06em' : '0.12em',
    cursor: 'pointer', transition: 'all 0.3s ease',
    whiteSpace: 'nowrap', fontFamily: "'Outfit',sans-serif",
  }}>
    <span style={{ fontSize: mobile ? '0.7rem' : '0.8rem' }}>{icon}</span>
    {!mobile && label}
    {mobile && label.split(' ')[0]}
  </button>
)

// ── Dashboard content (shared between desktop and iPhone mockup) ──
const DashboardContent = ({ animate, mod, modules, activeModule, setActiveModule, mobile }) => {
  const bars = mod.bars
  return (
    <div>
      {/* Title bar */}
      <div style={{
        display:'flex', alignItems:'center', gap:6,
        padding: mobile ? '8px 12px' : '0.75rem 1.25rem',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        background:'rgba(255,255,255,0.02)',
        marginBottom: 0,
      }}>
        {!mobile && (
          <div style={{ display:'flex', gap:4 }}>
            {['#FF5F56','#FFBD2E','#27C93F'].map((c,i)=>(
              <div key={i} style={{ width:9,height:9,borderRadius:'50%',background:c,opacity:0.85 }}/>
            ))}
          </div>
        )}
        <span style={{ flex:1, textAlign:'center', fontSize: mobile ? 7 : 9, color:'#606080', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>
          {mobile ? 'Asis Recaudación' : 'Asis Recaudación — Panel de Control'}
        </span>
        <div style={{ display:'flex', alignItems:'center', gap:3 }}>
          <div style={{ width:5,height:5,borderRadius:'50%',background:'#22c55e' }}/>
          <span style={{ fontSize:7, color:'#22c55e', fontWeight:700 }}>EN VIVO</span>
        </div>
      </div>

      {/* Module tabs */}
      <div style={{
        display:'flex', gap:'0.4rem',
        padding: mobile ? '6px 8px' : '0.75rem 1.25rem',
        borderBottom:'1px solid rgba(255,255,255,0.04)',
        overflowX:'auto',
      }}>
        {modules.map((m,i)=>(
          <ModuleTab key={i} label={m.label} icon={m.icon}
            active={activeModule===i} onClick={()=>setActiveModule(i)}
            color={m.color} mobile={mobile}/>
        ))}
      </div>

      {/* Stats */}
      <div style={{
        padding: mobile ? '8px' : '1.25rem',
      }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: mobile ? 6 : 10, marginBottom: mobile ? 8 : 12 }}>
          {mod.stats.map((stat,i)=>(
            <div key={i} style={{
              borderRadius:'0.6rem', padding: mobile ? '0.5rem' : '0.9rem',
              background:'rgba(255,255,255,0.02)',
              border:`1px solid ${mod.color}20`,
              opacity: animate?1:0,
              transform: animate?'translateY(0)':'translateY(6px)',
              transition:`all 0.5s ease ${i*120}ms`,
            }}>
              <div style={{ fontSize: mobile ? 7 : 8, color:mod.color, textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:700, marginBottom:4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: mobile ? '0.9rem' : '1.1rem', fontWeight:300, color:'#fff', lineHeight:1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: mobile ? 7 : 9, color:'rgba(74,222,128,0.85)', fontWeight:700, marginTop:3 }}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{
          borderRadius:'0.6rem', padding: mobile ? '8px' : '1rem',
          background:'rgba(10,20,45,0.4)',
          border:'1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ fontSize:7, fontWeight:700, letterSpacing:'0.1em', color:'#606080', textTransform:'uppercase', marginBottom:8 }}>
            Tendencia — {mod.label}
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:2, height: mobile ? 50 : 70 }}>
            {bars.map((h,i)=>(
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', height:'100%' }}>
                <div style={{
                  borderRadius:'2px 2px 0 0',
                  height: animate?`${h}%`:'0%',
                  background:`linear-gradient(to top, ${mod.color}60, ${mod.color}18)`,
                  transition:`height 0.7s ease ${i*30}ms`,
                }}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard Mockup (desktop wrapper) ──
const DashboardMockup = () => {
  const [activeModule, setActiveModule] = useState(0)
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry])=>{ if(entry.isIntersecting) setAnimate(true) },
      { threshold: 0.2 }
    )
    if(ref.current) observer.observe(ref.current)
    return ()=>observer.disconnect()
  }, [])

  const modules = [
    { label:'Inmuebles', icon:'🏢', color:'#3584E4',
      stats:[{label:'Recaudado',value:'$4.2M',change:'+14.2%'},{label:'Contribuyentes',value:'12,840',change:'+3.1%'},{label:'Tasa Cobro',value:'91.4%',change:'+1.8%'}],
      bars:[58,72,48,85,62,78,55,90,68,74,88,71]},
    { label:'Act. Económica', icon:'🏪', color:'#22c55e',
      stats:[{label:'Recaudado',value:'$2.8M',change:'+9.7%'},{label:'Contribuyentes',value:'5,320',change:'+5.4%'},{label:'Tasa Cobro',value:'88.2%',change:'+2.3%'}],
      bars:[42,65,38,72,55,68,45,80,60,70,75,62]},
    { label:'Vehículos', icon:'🚗', color:'#a855f7',
      stats:[{label:'Recaudado',value:'$1.1M',change:'+6.3%'},{label:'Contribuyentes',value:'8,910',change:'+2.8%'},{label:'Tasa Cobro',value:'94.7%',change:'+0.9%'}],
      bars:[70,55,80,62,75,58,88,65,72,60,85,68]},
    { label:'Aseo Urbano', icon:'♻️', color:'#f97316',
      stats:[{label:'Recaudado',value:'$680K',change:'+11.5%'},{label:'Contribuyentes',value:'18,200',change:'+4.2%'},{label:'Tasa Cobro',value:'78.9%',change:'+3.6%'}],
      bars:[45,60,35,70,50,65,40,78,55,62,72,58]},
  ]

  return (
    <div ref={ref} style={{
      background:'rgba(8,15,35,0.95)',
      border:'1px solid rgba(53,132,228,0.15)',
      borderRadius:'1.5rem', overflow:'hidden',
    }}>
      <DashboardContent
        animate={animate} mod={modules[activeModule]}
        modules={modules} activeModule={activeModule}
        setActiveModule={setActiveModule} mobile={false}
      />
    </div>
  )
}

// ── iPhone Dashboard Mockup (mobile) ──
const MobileDashboard = () => {
  const [activeModule, setActiveModule] = useState(0)
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry])=>{ if(entry.isIntersecting) setAnimate(true) },
      { threshold: 0.2 }
    )
    if(ref.current) observer.observe(ref.current)
    return ()=>observer.disconnect()
  }, [])

  const modules = [
    { label:'Inmuebles', icon:'🏢', color:'#3584E4',
      stats:[{label:'Recaudado',value:'$4.2M',change:'+14.2%'},{label:'Contribuyentes',value:'12,840',change:'+3.1%'},{label:'Tasa Cobro',value:'91.4%',change:'+1.8%'}],
      bars:[58,72,48,85,62,78,55,90,68,74,88,71]},
    { label:'Act. Econ.', icon:'🏪', color:'#22c55e',
      stats:[{label:'Recaudado',value:'$2.8M',change:'+9.7%'},{label:'Contribuyentes',value:'5,320',change:'+5.4%'},{label:'Tasa Cobro',value:'88.2%',change:'+2.3%'}],
      bars:[42,65,38,72,55,68,45,80,60,70,75,62]},
    { label:'Vehículos', icon:'🚗', color:'#a855f7',
      stats:[{label:'Recaudado',value:'$1.1M',change:'+6.3%'},{label:'Contribuyentes',value:'8,910',change:'+2.8%'},{label:'Tasa Cobro',value:'94.7%',change:'+0.9%'}],
      bars:[70,55,80,62,75,58,88,65,72,60,85,68]},
    { label:'Aseo', icon:'♻️', color:'#f97316',
      stats:[{label:'Recaudado',value:'$680K',change:'+11.5%'},{label:'Contribuyentes',value:'18,200',change:'+4.2%'},{label:'Tasa Cobro',value:'78.9%',change:'+3.6%'}],
      bars:[45,60,35,70,50,65,40,78,55,62,72,58]},
  ]

  return (
    <div ref={ref}>
      <IPhoneMockup>
        <DashboardContent
          animate={animate} mod={modules[activeModule]}
          modules={modules} activeModule={activeModule}
          setActiveModule={setActiveModule} mobile={true}
        />
      </IPhoneMockup>
    </div>
  )
}

// ── Main Section ──
const SoftwareSection = () => {
  const isMobile = useIsMobile()
  const banksRef = useRef(null)
  const [banksVisible, setBanksVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry])=>{ if(entry.isIntersecting) setBanksVisible(true) },
      { threshold: 0.2 }
    )
    if(banksRef.current) observer.observe(banksRef.current)
    return ()=>observer.disconnect()
  }, [])

  const banks = [
    { src:'/banks/banco-banesco.png',   name:'Banesco',            borderColor:'#1a3a7a', blendMode:'lighten' },
    { src:'/banks/banco-bdv.png',       name:'Banco de Venezuela', borderColor:'#CC2020', blendMode:'lighten' },
    { src:'/banks/banco-100.png',       name:'100% Banco',         borderColor:'#FF6B00', blendMode:'lighten' },
    { src:'/banks/banco-bancamiga.png', name:'Bancamiga',          borderColor:'#3aaa35', blendMode:'lighten' },
    { src:'/banks/banco-bnc.png',       name:'BNC',                borderColor:'#f97316', blendMode:'lighten' },
  ]

  const advantages = [
    { icon:'⚡', color:'#3584E4', title:'Procesamiento Instantáneo',
      desc:'Confirmación de pago en tiempo real. El sistema actualiza el estado del contribuyente automáticamente.' },
    { icon:'🔐', color:'#22c55e', title:'Seguridad Bancaria',
      desc:'Encriptación de extremo a extremo y cumplimiento de normativas SUDEBAN.' },
    { icon:'🏦', color:'#a855f7', title:'Multi-banco',
      desc:'Convenios activos con los principales bancos venezolanos.' },
  ]

  const pad = isMobile ? '1.25rem' : '3rem'

  return (
    <section id="software" style={{
      position:'relative', paddingTop: isMobile ? '5rem' : '8rem',
      paddingBottom: isMobile ? '3rem' : '6rem',
      overflow:'hidden', backgroundColor:'#020617',
    }}>
      <div style={{
        width:'100%', maxWidth:'1200px',
        marginLeft:'auto', marginRight:'auto',
        paddingLeft: pad, paddingRight: pad,
        boxSizing:'border-box',
      }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom: isMobile ? '2.5rem' : '4rem' }} data-aos="fade-up">
          <p style={{ color:'#3584E4', fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', fontSize:'0.625rem', marginBottom:'1rem' }}>
            Plataforma de Recaudación
          </p>
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.5rem,7vw,2rem)' : 'clamp(1.8rem,3vw,2.8rem)',
            fontWeight:300, color:'#ffffff', textTransform:'uppercase',
            letterSpacing: isMobile ? '0.06em' : '0.12em',
            marginBottom:'1.25rem', lineHeight:1.2,
          }}>
            Software de{' '}
            <span style={{ color:'#3584E4', fontWeight:500 }}>Recaudación Inteligente</span>
          </h2>
          <div style={{ width:'4rem', height:'1px', background:'rgba(53,132,228,0.3)', margin:'0 auto 1.25rem' }}/>
          <p style={{ fontSize:'0.8rem', color:'#64748b', maxWidth:'560px', margin:'0 auto', lineHeight:1.8, fontWeight:300 }}>
            Sistema modular, adaptable y 100% automatizado.
          </p>
        </div>

        {/* Dashboard + Advantages */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr',
          gap: isMobile ? '2rem' : '2.5rem',
          alignItems:'start', marginBottom: isMobile ? '2rem' : '4rem',
        }}>
          <div data-aos="fade-up" data-aos-delay="100">
            {isMobile ? <MobileDashboard /> : <DashboardMockup />}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }} data-aos="fade-up" data-aos-delay="200">
            <div>
              <p style={{ fontSize:'0.6rem', color:'#3584E4', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.5rem' }}>
                Módulos disponibles
              </p>
              <h3 style={{ fontSize: isMobile ? '1rem' : '1.1rem', fontWeight:600, color:'#ffffff', lineHeight:1.3 }}>
                Un sistema para cada tipo de impuesto y gestión
              </h3>
              <p style={{ fontSize:'0.8rem', color:'#64748b', lineHeight:1.7, marginTop:'0.5rem', fontWeight:300 }}>
                Inmuebles Urbanos, Actividad Económica, Vehículos, Aseo Urbano y módulos personalizados.
              </p>
            </div>
            {advantages.map((a,i)=>(
              <div key={i} style={{
                background:'rgba(15,23,42,0.4)',
                border:`1px solid ${a.color}18`,
                borderRadius:'1rem', padding:'1.1rem',
                display:'flex', gap:'0.85rem', alignItems:'flex-start',
                transition:'all 0.3s ease',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${a.color}40`; e.currentTarget.style.transform='translateX(4px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${a.color}18`; e.currentTarget.style.transform='translateX(0)' }}
              >
                <div style={{ width:36,height:36,borderRadius:'0.6rem',background:`${a.color}15`,border:`1px solid ${a.color}25`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0 }}>
                  {a.icon}
                </div>
                <div>
                  <div style={{ fontSize:'0.72rem',fontWeight:700,color:'#ffffff',marginBottom:'0.2rem',textTransform:'uppercase',letterSpacing:'0.05em' }}>{a.title}</div>
                  <div style={{ fontSize:'0.7rem',color:'#64748b',lineHeight:1.6,fontWeight:300 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banks section */}
        <div style={{
          background:'rgba(8,15,35,0.6)',
          border:'1px solid rgba(53,132,228,0.12)',
          borderRadius:'1.5rem', padding: isMobile ? '1.5rem' : '2.5rem',
        }} data-aos="fade-up">
          <div style={{ marginBottom:'1.5rem' }}>
            <p style={{ fontSize:'0.6rem',color:'#3584E4',fontWeight:700,letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:'0.5rem' }}>
              Integración Bancaria
            </p>
            <h3 style={{ fontSize: isMobile ? '1.2rem' : '1.3rem', fontWeight:600,color:'#ffffff',letterSpacing:'0.03em',lineHeight:1.2,marginBottom:'0.5rem' }}>
              Alianzas con la Banca Venezolana
            </h3>
            <p style={{ fontSize:'0.78rem',color:'#64748b',maxWidth:'600px',lineHeight:1.7,fontWeight:300 }}>
              Convenios directos con los principales bancos del país — confirmación automática en segundos.
            </p>
          </div>

          {/* Banks grid — 3 cols mobile, 5 cols desktop */}
          <div ref={banksRef} style={{
            display:'grid',
            gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(5,1fr)',
            gap: isMobile ? '0.75rem' : '1rem',
            marginBottom:'1.5rem',
          }}>
            {banks.map((b,i)=>(
              <BankLogo key={i} {...b}
                visible={banksVisible} delay={i*100}
                mobile={isMobile}
              />
            ))}
          </div>

          {/* Payment methods pills */}
          <div style={{
            paddingTop:'1rem',
            borderTop:'1px solid rgba(255,255,255,0.05)',
            display:'flex', flexWrap:'wrap', alignItems:'center', gap:'0.5rem',
          }}>
            <span style={{ fontSize:'0.55rem',color:'#64748b',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',marginRight:'0.25rem' }}>
              Métodos:
            </span>
            {['Pago Móvil','Botón de Pago','Punto de Venta','Transferencia','Débito Inmediato','Otros'].map((m,i)=>(
              <span key={i} style={{
                fontSize:'0.6rem',color:'#94a3b8',fontWeight:500,
                padding:'0.25rem 0.65rem', borderRadius:'9999px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.08)',
              }}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.3);}}`}</style>
    </section>
  )
}

export default SoftwareSection
