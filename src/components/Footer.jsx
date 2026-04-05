import { useState } from 'react'
import AsisLogo from './AsisLogo'
import useIsMobile from './useIsMobile'

const Footer = () => {
  const [formData, setFormData] = useState({ name:'', email:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const isMobile = useIsMobile()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name:'', email:'', message:'' })
  }

  const inputStyle = (field) => ({
    width:'100%', padding:'0.75rem 0',
    background:'transparent', border:'none',
    borderBottom:`1px solid ${focused===field?'#3584E4':'rgba(255,255,255,0.10)'}`,
    color:'#ffffff', fontWeight:300, fontSize:'0.95rem',
    outline:'none', transition:'border-color 0.3s ease',
    fontFamily:"'Outfit',sans-serif", boxSizing:'border-box',
  })

  const labelStyle = {
    fontSize:'0.55rem', fontWeight:700, color:'#64748b',
    textTransform:'uppercase', letterSpacing:'0.18em',
    display:'block', marginBottom:'0.4rem',
  }

  const contactActions = [
    {
      label:'WhatsApp', display:'+58 414 247 ••••',
      href:'https://wa.me/584142471674', color:'#22c55e',
      icon:(
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:16,height:16 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      label:'Teléfono', display:'+58 414 247 ••••',
      href:'tel:+584142471674', color:'#3584E4',
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width:16,height:16 }}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.67 19.79 19.79 0 01.01 2.05 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
        </svg>
      ),
    },
    {
      label:'Email', display:'contacto@asisconsultores.com',
      href:'mailto:contacto@asisconsultores.com', color:'#a855f7',
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width:16,height:16 }}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ]

  const pad = isMobile ? '1.25rem' : '3rem'

  return (
    <footer id="contacto" style={{
      position:'relative', paddingTop: isMobile?'4rem':'6rem',
      paddingBottom:'2.5rem', overflow:'hidden',
      backgroundColor:'#020617',
    }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'rgba(255,255,255,0.05)' }}/>
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:700, height:700,
        background:'radial-gradient(circle, rgba(53,132,228,0.04) 0%, transparent 70%)',
        borderRadius:'50%', pointerEvents:'none',
      }}/>

      <div style={{
        width:'100%', maxWidth:'1200px',
        marginLeft:'auto', marginRight:'auto',
        paddingLeft: pad, paddingRight: pad,
        boxSizing:'border-box', position:'relative', zIndex:10,
      }}>

        {/* Main grid — 1 col mobile, 2 col desktop */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile?'1fr':'1fr 1fr',
          gap: isMobile?'2.5rem':'5rem',
          alignItems:'start', marginBottom:'3rem',
        }}>

          {/* LEFT */}
          <div data-aos="fade-up">
            <div style={{ marginBottom:'1.5rem', paddingTop:'0.5rem', overflow:'visible' }}>
              <AsisLogo size={isMobile?'default':'large'} />
            </div>

            <p style={{ color:'#94a3b8', fontSize:'0.9rem', lineHeight:1.8, fontWeight:300, maxWidth:'400px', marginBottom:'2rem' }}>
              Software de recaudación inteligente, automatización de procesos e inteligencia de negocios para instituciones que buscan eficiencia real.
            </p>

            {/* Sede */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', marginBottom:'2rem' }}>
              <div style={{ width:32,height:32,borderRadius:'0.5rem',background:'rgba(53,132,228,0.08)',border:'1px solid rgba(53,132,228,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'1rem' }}>
                📍
              </div>
              <div>
                <span style={{ fontSize:'0.55rem',fontWeight:700,color:'#3584E4',textTransform:'uppercase',letterSpacing:'0.2em',display:'block',marginBottom:'0.2rem' }}>Sede</span>
                <span style={{ color:'#e2e8f0',fontWeight:300,fontSize:'0.9rem' }}>Caracas, Venezuela</span>
              </div>
            </div>

            {/* Contact actions */}
            <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
              {contactActions.map((action,i)=>(
                <a key={i} href={action.href}
                  target={action.label==='WhatsApp'?'_blank':undefined}
                  rel="noreferrer"
                  style={{
                    display:'flex', alignItems:'center', gap:'0.75rem',
                    padding:'0.7rem 0.9rem',
                    borderRadius:'0.75rem',
                    background:`${action.color}10`,
                    border:`1px solid ${action.color}25`,
                    textDecoration:'none', transition:'all 0.3s ease',
                    color: action.color,
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=`${action.color}20`; e.currentTarget.style.borderColor=`${action.color}50`; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=`${action.color}10`; e.currentTarget.style.borderColor=`${action.color}25`; e.currentTarget.style.transform='translateX(0)' }}
                >
                  <div style={{ width:34,height:34,borderRadius:'0.5rem',background:`${action.color}15`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:action.color }}>
                    {action.icon}
                  </div>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:'0.55rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.15em',color:action.color,marginBottom:'0.1rem' }}>
                      {action.label}
                    </div>
                    <div style={{ fontSize:'0.78rem',color:'#e2e8f0',fontWeight:300,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                      {action.display}
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke={action.color} strokeWidth={2} style={{ width:14,height:14,marginLeft:'auto',opacity:0.6,flexShrink:0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Contact form */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div style={{
              background:'rgba(15,23,42,0.5)',
              border:'1px solid rgba(53,132,228,0.12)',
              backdropFilter:'blur(20px)',
              borderRadius:'1.5rem',
              padding: isMobile?'1.5rem':'2.5rem',
            }}>
              <div style={{ marginBottom:'1.5rem' }}>
                <p style={{ color:'#3584E4',fontSize:'0.6rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.25em',marginBottom:'0.5rem' }}>
                  Contacto
                </p>
                <h3 style={{ fontSize: isMobile?'1.1rem':'1.4rem',fontWeight:700,color:'#ffffff',textTransform:'uppercase',letterSpacing:'0.06em',lineHeight:1.2,margin:0 }}>
                  Comencemos un Proyecto
                </h3>
              </div>

              <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'1.25rem' }}>
                <div>
                  <label style={labelStyle}>Nombre Completo</label>
                  <input type="text" required value={formData.name}
                    onChange={e=>setFormData({...formData,name:e.target.value})}
                    onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)}
                    style={inputStyle('name')} placeholder="Escribe tu nombre"/>
                </div>
                <div>
                  <label style={labelStyle}>Correo Electrónico</label>
                  <input type="email" required value={formData.email}
                    onChange={e=>setFormData({...formData,email:e.target.value})}
                    onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)}
                    style={inputStyle('email')} placeholder="tu@organizacion.com"/>
                </div>
                <div>
                  <label style={labelStyle}>Mensaje</label>
                  <textarea required rows={3} value={formData.message}
                    onChange={e=>setFormData({...formData,message:e.target.value})}
                    onFocus={()=>setFocused('message')} onBlur={()=>setFocused(null)}
                    style={{ ...inputStyle('message'),resize:'none' }}
                    placeholder="¿En qué podemos ayudarte?"/>
                </div>
                <button type="submit" style={{
                  width:'100%', padding:'1rem',
                  background: submitted?'rgba(34,197,94,0.12)':'#3584E4',
                  border:`1px solid ${submitted?'rgba(34,197,94,0.4)':'#3584E4'}`,
                  borderRadius:'9999px',
                  color: submitted?'#22c55e':'#020617',
                  fontWeight:700, fontSize:'0.7rem',
                  textTransform:'uppercase', letterSpacing:'0.2em',
                  cursor:'pointer', transition:'all 0.3s ease',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                  fontFamily:"'Outfit',sans-serif", marginTop:'0.25rem',
                }}
                  onMouseEnter={e=>{ if(!submitted) e.currentTarget.style.background='#62a0ea' }}
                  onMouseLeave={e=>{ if(!submitted) e.currentTarget.style.background='#3584E4' }}
                >
                  {submitted?(
                    <>
                      <svg style={{ width:16,height:16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      Mensaje Recibido
                    </>
                  ):'Enviar Solicitud'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop:'1.5rem',
          borderTop:'1px solid rgba(255,255,255,0.05)',
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
          flexWrap:'wrap', gap:'1rem',
        }}>
          <span style={{ fontSize:'0.6rem',color:'#475569',textTransform:'uppercase',letterSpacing:'0.15em',fontWeight:600 }}>
            © 2026 Asis Consultores. Todos los derechos reservados.
          </span>
          <div style={{ display:'flex', gap:'1.5rem' }}>
            {['Privacidad','Términos'].map((link,i)=>(
              <a key={i} href="#" style={{ fontSize:'0.6rem',color:'#475569',textTransform:'uppercase',letterSpacing:'0.15em',fontWeight:600,textDecoration:'none',transition:'color 0.3s ease' }}
                onMouseEnter={e=>e.currentTarget.style.color='#ffffff'}
                onMouseLeave={e=>e.currentTarget.style.color='#475569'}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
