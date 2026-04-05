import { ArrowRight } from 'lucide-react'
import useIsMobile from './useIsMobile'

const EcosystemSection = () => {
  const isMobile = useIsMobile()

  const mainTools = [
    {
      emoji: '💬',
      color: '#22c55e',
      badge: 'Activo',
      badgeColor: '#22c55e',
      title: 'Chatbots IA',
      subtitle: 'WhatsApp & Telegram',
      desc: 'Agentes conversacionales inteligentes que atienden consultas de contribuyentes, ejecutan consultas de deuda y procesan solicitudes — sin intervención humana, disponibles 24/7.',
      features: ['Consulta de deuda en tiempo real','Generación de estado de cuenta','Solicitudes y trámites automáticos','Integración directa con el sistema'],
    },
    {
      emoji: '🔊',
      color: '#a855f7',
      badge: 'En desarrollo',
      badgeColor: '#a855f7',
      title: 'Agentes IA Voz y Texto',
      subtitle: 'Primer contacto inteligente',
      desc: 'Agentes autónomos capaces de mantener conversaciones naturales por voz y texto para el primer contacto con clientes u organizaciones. Resuelven consultas, califican leads y escalan casos complejos al equipo humano.',
      features: ['Conversación natural por voz','Calificación automática de leads','Escalado inteligente a agente humano','Multicanal: web, telefónico, chat'],
    },
    {
      emoji: '⚙️',
      color: '#3584E4',
      badge: 'Activo',
      badgeColor: '#22c55e',
      title: 'Automatización de Procesos',
      subtitle: 'RPA + IA',
      desc: 'Flujos de trabajo automatizados que eliminan tareas repetitivas: notificaciones de vencimiento, generación de reportes, actualización de registros y más.',
      features: ['Notificaciones automáticas','Generación de reportes periódicos','Actualización masiva de registros','Integración con sistemas externos'],
    },
  ]

  const extraTools = [
    { emoji:'📊', color:'#3584E4',  title:'Reportes Power BI',       desc:'Dashboards interactivos y exportables en tiempo real.' },
    { emoji:'🌐', color:'#22c55e',  title:'Portal Contribuyente',    desc:'Acceso online para consultas, pagos y trámites.' },
    { emoji:'🔗', color:'#f97316',  title:'Integraciones API',       desc:'Conexión con sistemas bancarios y gubernamentales.' },
    { emoji:'🔒', color:'#a855f7',  title:'Seguridad & Auditoría',   desc:'Trazabilidad completa y cumplimiento normativo.' },
  ]

  const pad = isMobile ? '1.25rem' : '3rem'

  return (
    <section id="ecosistema" style={{
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
          <p style={{ color:'#a855f7', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', fontSize:'0.625rem', marginBottom:'1rem' }}>
            Ecosistema Tecnológico
          </p>
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.5rem,7vw,2rem)' : 'clamp(1.8rem,3vw,2.8rem)',
            fontWeight:300, color:'#ffffff',
            textTransform:'uppercase', letterSpacing: isMobile ? '0.06em' : '0.12em',
            marginBottom:'1rem', lineHeight:1.2,
          }}>
            Herramientas{' '}
            <span style={{ color:'#a855f7', fontWeight:500 }}>con IA Integrada</span>
          </h2>
          <div style={{ width:'4rem', height:'1px', background:'rgba(168,85,247,0.3)', margin:'0 auto 1rem' }}/>
          <p style={{ fontSize:'0.8rem', color:'#64748b', maxWidth:'560px', margin:'0 auto', lineHeight:1.8, fontWeight:300 }}>
            Más allá del software de recaudación — un ecosistema completo de automatización e inteligencia artificial.
          </p>
        </div>

        {/* Main tools — 1 col mobile, 3 col desktop */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: isMobile ? '1rem' : '1.5rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
        }}>
          {mainTools.map((tool, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i*100} style={{
              background:'rgba(15,23,42,0.5)',
              border:`1px solid ${tool.color}20`,
              borderRadius:'1.5rem',
              padding: isMobile ? '1.5rem' : '2rem',
              display:'flex', flexDirection:'column', gap:'1rem',
              boxSizing:'border-box',
            }}>
              {/* Icon + badge */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{
                  width:48, height:48, borderRadius:'0.75rem',
                  background:`${tool.color}15`,
                  border:`1px solid ${tool.color}25`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.4rem',
                }}>
                  {tool.emoji}
                </div>
                <span style={{
                  fontSize:'0.5rem', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.15em',
                  color: tool.badgeColor,
                  background:`${tool.badgeColor}15`,
                  border:`1px solid ${tool.badgeColor}30`,
                  padding:'0.25rem 0.6rem', borderRadius:'9999px',
                }}>● {tool.badge}</span>
              </div>

              <div>
                <h3 style={{ fontSize: isMobile ? '1rem' : '1.1rem', fontWeight:700, color:'#ffffff', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'0.3rem' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize:'0.6rem', fontWeight:700, color: tool.color, textTransform:'uppercase', letterSpacing:'0.15em' }}>
                  {tool.subtitle}
                </p>
              </div>

              <p style={{ fontSize:'0.78rem', color:'#64748b', lineHeight:1.7, fontWeight:300 }}>
                {tool.desc}
              </p>

              <ul style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                {tool.features.map((f,j) => (
                  <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem', fontSize:'0.72rem', color:'#94a3b8' }}>
                    <span style={{ color: tool.color, marginTop:2, flexShrink:0 }}>•</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop:'auto', paddingTop:'0.5rem' }}>
                <span style={{
                  fontSize:'0.55rem', fontWeight:700, color: tool.color,
                  textTransform:'uppercase', letterSpacing:'0.2em',
                  display:'flex', alignItems:'center', gap:'0.4rem',
                }}>
                  Conocer más →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Extra tools — 2 col mobile, 4 col desktop */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? '0.75rem' : '1rem',
        }}>
          {extraTools.map((tool, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i*80} style={{
              background:'rgba(15,23,42,0.4)',
              border:`1px solid ${tool.color}15`,
              borderRadius:'1rem',
              padding: isMobile ? '1rem' : '1.5rem',
              boxSizing:'border-box',
              transition:'all 0.3s ease',
            }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${tool.color}40`; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${tool.color}15`; e.currentTarget.style.transform='translateY(0)' }}
            >
              <div style={{ fontSize: isMobile ? '1.4rem' : '1.6rem', marginBottom:'0.6rem' }}>{tool.emoji}</div>
              <div style={{ fontSize: isMobile ? '0.65rem' : '0.7rem', fontWeight:700, color:'#ffffff', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'0.4rem' }}>
                {tool.title}
              </div>
              <div style={{ fontSize:'0.65rem', color:'#64748b', lineHeight:1.5, fontWeight:300 }}>
                {tool.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default EcosystemSection
