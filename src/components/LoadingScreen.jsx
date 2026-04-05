import { useEffect, useRef, useState } from 'react'

const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null)
  const frameRef  = useRef(null)
  const [sloganVisible, setSloganVisible] = useState(false)
  const [fadeOut, setFadeOut]             = useState(false)
  const [entered, setEntered]             = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setEntered(true),        60)
    const t1 = setTimeout(() => setSloganVisible(true), 1200)
    const t2 = setTimeout(() => setFadeOut(true),       3600)
    const t3 = setTimeout(() => onComplete && onComplete(), 4400)
    return () => [t0,t1,t2,t3].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr  = Math.min(window.devicePixelRatio || 1, 2)
    const SIZE = 420
    canvas.width  = SIZE * dpr
    canvas.height = SIZE * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const W = SIZE, H = SIZE, cx = W/2, cy = H/2, R = 185
    const TILT = 28 * Math.PI / 180

    const toXYZ = (lat, lon) => {
      const φ = lat * Math.PI / 180
      const λ = lon * Math.PI / 180
      return { x: Math.cos(φ)*Math.cos(λ), y: Math.sin(φ), z: Math.cos(φ)*Math.sin(λ) }
    }

    const project = (p, rotY) => {
      const cY = Math.cos(rotY), sY = Math.sin(rotY)
      const x1 =  p.x*cY - p.z*sY
      const z1 =  p.x*sY + p.z*cY
      const y1 =  p.y
      const cX = Math.cos(TILT), sX = Math.sin(TILT)
      const y2 =  y1*cX - z1*sX
      const z2 =  y1*sX + z1*cX
      const fov = 2.5, sc = fov/(fov+z2)
      return { x: cx + x1*R*sc, y: cy - y2*R*sc, z: z2, sc }
    }

    // Grid lines
    const gridLines = []
    for (let lat=-75; lat<=75; lat+=15) {
      const pts=[]
      for (let lon=-180;lon<=180;lon+=4) pts.push(toXYZ(lat,lon))
      gridLines.push(pts)
    }
    for (let lon=-180;lon<180;lon+=15) {
      const pts=[]
      for (let lat=-90;lat<=90;lat+=4) pts.push(toXYZ(lat,lon))
      gridLines.push(pts)
    }

    // Network nodes & connections
    const nodePts = [
      [40.7,-74],[51.5,-0.1],[35.7,139.7],[-23.5,-46.6],
      [28.6,77.2],[1.3,103.8],[10.5,-66.9],[37.8,-122.4],
      [52.5,13.4],[25.2,55.3],
    ].map(([la,lo]) => toXYZ(la,lo))

    const edges = [
      [0,1],[0,7],[0,6],[1,2],[2,5],[3,6],[4,5],
      [7,0],[1,8],[8,9],[9,4],[2,4],[6,3],
    ]
    const pulses = edges.map(() => ({
      t:  Math.random(),
      sp: 0.006 + Math.random()*0.005,
    }))

    const arcBetween = (a, b, steps=24) => {
      const pts=[]
      for(let i=0;i<=steps;i++){
        const t=i/steps
        const d=Math.max(-1,Math.min(1,a.x*b.x+a.y*b.y+a.z*b.z))
        const om=Math.acos(d)
        let x,y,z
        if(om<0.0001){
          x=a.x+t*(b.x-a.x);y=a.y+t*(b.y-a.y);z=a.z+t*(b.z-a.z)
        } else {
          const s=Math.sin(om)
          const wa=Math.sin((1-t)*om)/s, wb=Math.sin(t*om)/s
          x=wa*a.x+wb*b.x;y=wa*a.y+wb*b.y;z=wa*a.z+wb*b.z
        }
        pts.push({x,y,z})
      }
      return pts
    }

    let rot=0, startTime=null
    const getSpeed = (el) => {
      if(el < 0.8) return 0.07
      if(el < 2.5) return 0.07 - (el-0.8)/1.7 * 0.056
      return 0.014
    }

    const draw = (now) => {
      if(!startTime) startTime = now
      const el = (now - startTime) / 1000
      rot += getSpeed(el)

      ctx.clearRect(0, 0, W, H)

      // Sphere base — Asis dark blue
      const og = ctx.createRadialGradient(cx-R*0.28, cy-R*0.28, R*0.04, cx, cy, R)
      og.addColorStop(0,   '#1e3a6e')
      og.addColorStop(0.4, '#0d2050')
      og.addColorStop(1,   '#020a1e')
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2)
      ctx.fillStyle = og; ctx.fill()

      // Grid lines
      gridLines.forEach(pts => {
        ctx.beginPath(); let started = false
        pts.forEach(p => {
          const pr = project(p, rot)
          if(pr.z < -0.05) { started=false; return }
          if(!started) { ctx.moveTo(pr.x, pr.y); started=true }
          else ctx.lineTo(pr.x, pr.y)
        })
        ctx.strokeStyle = 'rgba(53,132,228,0.20)'
        ctx.lineWidth = 0.6; ctx.stroke()
      })

      // Network cables
      edges.forEach(([ai,bi], ci) => {
        const ap   = arcBetween(nodePts[ai], nodePts[bi], 22)
        const mid  = project(ap[11], rot)
        if(mid.z < -0.25) return
        const spts = ap.map(p => project(p, rot))
        const lift = 1.03

        ctx.beginPath()
        spts.forEach((sp, i) => {
          const lx=cx+(sp.x-cx)*lift, ly=cy+(sp.y-cy)*lift
          if(i===0) ctx.moveTo(lx,ly); else ctx.lineTo(lx,ly)
        })
        const a = Math.max(0, mid.z+0.25) * 0.6
        ctx.strokeStyle = `rgba(53,132,228,${a*0.85})`
        ctx.lineWidth = 0.9; ctx.stroke()

        // Pulse dot
        const pulse = pulses[ci]
        pulse.t = (pulse.t + pulse.sp) % 1
        const pi  = Math.floor(pulse.t * (spts.length-1))
        const sp  = spts[pi]
        if(sp && sp.z > -0.1) {
          const lx=cx+(sp.x-cx)*lift, ly=cy+(sp.y-cy)*lift
          const pa = Math.max(0, sp.z+0.1)
          const g  = ctx.createRadialGradient(lx,ly,0,lx,ly,8)
          g.addColorStop(0, `rgba(130,200,255,${pa*0.95})`)
          g.addColorStop(1, 'rgba(130,200,255,0)')
          ctx.beginPath(); ctx.arc(lx,ly,8,0,Math.PI*2)
          ctx.fillStyle=g; ctx.fill()
          ctx.beginPath(); ctx.arc(lx,ly,2.5,0,Math.PI*2)
          ctx.fillStyle=`rgba(200,235,255,${pa})`; ctx.fill()
        }
      })

      // Node dots
      nodePts.forEach(p => {
        const pr = project(p, rot)
        if(pr.z < -0.05) return
        const a  = Math.max(0, pr.z)
        const nr = 3 * pr.sc
        const g  = ctx.createRadialGradient(pr.x,pr.y,0,pr.x,pr.y,nr*4)
        g.addColorStop(0, `rgba(98,160,234,${a*0.7})`)
        g.addColorStop(1, 'rgba(98,160,234,0)')
        ctx.beginPath(); ctx.arc(pr.x,pr.y,nr*4,0,Math.PI*2)
        ctx.fillStyle=g; ctx.fill()
        ctx.beginPath(); ctx.arc(pr.x,pr.y,nr,0,Math.PI*2)
        ctx.fillStyle=`rgba(180,220,255,${a*0.9})`; ctx.fill()
      })

      // Specular highlight
      const spec = ctx.createRadialGradient(cx-R*0.3, cy-R*0.3, 0, cx-R*0.15, cy-R*0.15, R*0.55)
      spec.addColorStop(0, 'rgba(255,255,255,0.16)')
      spec.addColorStop(0.5, 'rgba(255,255,255,0.04)')
      spec.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2)
      ctx.fillStyle=spec; ctx.fill()

      // Edge depth
      const edge = ctx.createRadialGradient(cx,cy,R*0.62,cx,cy,R)
      edge.addColorStop(0, 'rgba(0,0,0,0)')
      edge.addColorStop(1, 'rgba(0,5,20,0.52)')
      ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2)
      ctx.fillStyle=edge; ctx.fill()

      // Globe border
      ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2)
      ctx.strokeStyle='rgba(53,132,228,0.38)'; ctx.lineWidth=1; ctx.stroke()

      // Outer arc
      const arcG = ctx.createLinearGradient(cx-R, cy-R, cx+R, cy+R)
      arcG.addColorStop(0, '#7ec8ff')
      arcG.addColorStop(1, '#1a4d9a')
      ctx.beginPath()
      ctx.arc(cx, cy, R+5, -42*Math.PI/180, 138*Math.PI/180, false)
      ctx.strokeStyle=arcG; ctx.lineWidth=6; ctx.lineCap='round'; ctx.stroke()

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => { if(frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#020617',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '2.5rem',
      opacity:    fadeOut ? 0 : 1,
      transition: fadeOut ? 'opacity 0.8s ease-out' : 'none',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>

      <div style={{
        position: 'absolute', width: 560, height: 560,
        background: 'radial-gradient(circle, rgba(53,132,228,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'relative', zIndex: 2,
        opacity:   entered ? 1 : 0,
        transform: entered ? 'scale(1)' : 'scale(2.2)',
        transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{
          position: 'absolute', width: 520, height: 520,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%) rotateX(74deg)',
          border: '1px solid rgba(53,132,228,0.22)',
          borderRadius: '50%', pointerEvents: 'none',
        }}/>
        <canvas
          ref={canvasRef}
          style={{ width: 420, height: 420, borderRadius: '50%', display: 'block' }}
        />
      </div>

      <div style={{
        textAlign: 'center', zIndex: 2,
        opacity:   sloganVisible ? 1 : 0,
        transform: sloganVisible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
      }}>
        <div style={{
          fontSize: '0.5rem', color: '#3584E4', fontWeight: 700,
          letterSpacing: '0.5em', textTransform: 'uppercase',
          fontFamily: "'Outfit',sans-serif", marginBottom: '0.5rem',
        }}>
          Asis Consultores
        </div>
        <div style={{
          fontSize: 'clamp(0.95rem,2.5vw,1.2rem)',
          fontWeight: 300, color: '#ffffff',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          fontFamily: "'Outfit',sans-serif", lineHeight: 1.5,
        }}>
          Transformamos 
        </div>
        <div style={{
          fontSize: 'clamp(0.95rem,2.5vw,1.2rem)',
          fontWeight: 600, color: '#3584E4',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          fontFamily: "'Outfit',sans-serif",
        }}>
          Instituciones
        </div>
        <div style={{
          width: 140, height: 1,
          background: 'rgba(53,132,228,0.15)',
          margin: '1.25rem auto 0',
          borderRadius: 9999, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg,#3584E4,#62a0ea)',
            borderRadius: 9999,
            width: sloganVisible ? '100%' : '0%',
            transition: 'width 2.2s ease-out',
          }}/>
        </div>
      </div>

    </div>
  )
}

export default LoadingScreen
