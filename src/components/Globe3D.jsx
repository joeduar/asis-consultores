import { useEffect, useRef } from 'react'

const Globe3D = ({ size = 420 }) => {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const rotationRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = size
    const H = size
    canvas.width = W
    canvas.height = H
    const cx = W / 2
    const cy = H / 2
    const R = W * 0.42

    // ── City nodes (lat/lon in degrees) ──
    const cities = [
      { lat: 40.7,  lon: -74.0  }, // New York
      { lat: 51.5,  lon: -0.1   }, // London
      { lat: 48.9,  lon:  2.3   }, // Paris
      { lat: 55.8,  lon: 37.6   }, // Moscow
      { lat: 35.7,  lon: 139.7  }, // Tokyo
      { lat: 31.2,  lon: 121.5  }, // Shanghai
      { lat: 19.4,  lon: -99.1  }, // Mexico City
      { lat: -23.5, lon: -46.6  }, // São Paulo
      { lat: 28.6,  lon:  77.2  }, // Delhi
      { lat: -33.9, lon:  18.4  }, // Cape Town
      { lat:  1.3,  lon: 103.8  }, // Singapore
      { lat: 25.2,  lon:  55.3  }, // Dubai
      { lat: 37.8,  lon: -122.4 }, // San Francisco
      { lat: 10.5,  lon: -66.9  }, // Caracas
      { lat: -34.6, lon: -58.4  }, // Buenos Aires
      { lat: 52.5,  lon:  13.4  }, // Berlin
      { lat: 39.9,  lon: 116.4  }, // Beijing
      { lat: 34.0,  lon: -118.2 }, // Los Angeles
    ]

    // Connections between city indices
    const connections = [
      [0,1],[0,12],[0,6],[1,2],[1,3],[1,11],[2,15],
      [3,16],[4,5],[4,10],[5,16],[6,13],[7,13],[7,14],
      [8,11],[8,10],[9,11],[10,5],[11,4],[12,6],[13,14],
      [15,3],[16,4],[17,12],[17,6],[0,13],[1,8],[3,8],
    ]

    // Convert lat/lon to 3D unit sphere coords
    const toXYZ = (lat, lon) => {
      const φ = (lat * Math.PI) / 180
      const λ = (lon * Math.PI) / 180
      return {
        x: Math.cos(φ) * Math.cos(λ),
        y: Math.sin(φ),
        z: Math.cos(φ) * Math.sin(λ),
      }
    }

    // Project 3D point (rotated) to 2D canvas
    const project = (p, rot) => {
      const cosR = Math.cos(rot)
      const sinR = Math.sin(rot)
      const x3 = p.x * cosR - p.z * sinR
      const z3 = p.x * sinR + p.z * cosR
      const y3 = p.y
      // perspective
      const fov = 2.2
      const scale = fov / (fov + z3)
      return {
        x: cx + x3 * R * scale,
        y: cy - y3 * R * scale,
        z: z3,
        scale,
      }
    }

    // Great circle arc between two 3D points (subdivided)
    const arcPoints = (a, b, steps = 24) => {
      const pts = []
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        // Slerp
        const dot = a.x*b.x + a.y*b.y + a.z*b.z
        const clamped = Math.max(-1, Math.min(1, dot))
        const omega = Math.acos(clamped)
        let px, py, pz
        if (omega < 0.0001) {
          px = a.x + t*(b.x-a.x)
          py = a.y + t*(b.y-a.y)
          pz = a.z + t*(b.z-a.z)
        } else {
          const sinO = Math.sin(omega)
          const wa = Math.sin((1-t)*omega) / sinO
          const wb = Math.sin(t*omega) / sinO
          px = wa*a.x + wb*b.x
          py = wa*a.y + wb*b.y
          pz = wa*a.z + wb*b.z
        }
        pts.push({ x: px, y: py, z: pz })
      }
      return pts
    }

    // Lat/lon grid lines
    const gridLines = []
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts = []
      for (let lon = -180; lon <= 180; lon += 4) {
        const φ = (lat * Math.PI) / 180
        const λ = (lon * Math.PI) / 180
        pts.push({
          x: Math.cos(φ) * Math.cos(λ),
          y: Math.sin(φ),
          z: Math.cos(φ) * Math.sin(λ),
        })
      }
      gridLines.push(pts)
    }
    for (let lon = -180; lon < 180; lon += 20) {
      const pts = []
      for (let lat = -90; lat <= 90; lat += 4) {
        const φ = (lat * Math.PI) / 180
        const λ = (lon * Math.PI) / 180
        pts.push({
          x: Math.cos(φ) * Math.cos(λ),
          y: Math.sin(φ),
          z: Math.cos(φ) * Math.sin(λ),
        })
      }
      gridLines.push(pts)
    }

    // Precompute city 3D positions
    const cityXYZ = cities.map(c => toXYZ(c.lat, c.lon))

    // Pulse animation state per connection
    const pulses = connections.map(() => ({
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const rot = rotationRef.current

      // ── Globe shadow ──
      const shadowGrad = ctx.createRadialGradient(cx+R*0.15, cy+R*0.12, 0, cx, cy, R*1.1)
      shadowGrad.addColorStop(0, 'rgba(53,132,228,0.06)')
      shadowGrad.addColorStop(1, 'rgba(2,6,23,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, R*1.15, 0, Math.PI*2)
      ctx.fillStyle = shadowGrad
      ctx.fill()

      // ── Sphere gradient (3D look) ──
      const sphereGrad = ctx.createRadialGradient(
        cx - R*0.28, cy - R*0.28, R*0.05,
        cx, cy, R
      )
      sphereGrad.addColorStop(0,   'rgba(40,80,160,0.55)')
      sphereGrad.addColorStop(0.4, 'rgba(15,35,90,0.70)')
      sphereGrad.addColorStop(1,   'rgba(2,8,30,0.90)')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI*2)
      ctx.fillStyle = sphereGrad
      ctx.fill()

      // ── Grid lines ──
      gridLines.forEach(pts => {
        let started = false
        ctx.beginPath()
        pts.forEach(p => {
          const proj = project(p, rot)
          if (proj.z < -0.15) { started = false; return }
          const alpha = Math.max(0, (proj.z + 0.15) / 0.4) * 0.18
          if (!started) {
            ctx.moveTo(proj.x, proj.y)
            started = true
          } else {
            ctx.lineTo(proj.x, proj.y)
          }
        })
        ctx.strokeStyle = `rgba(53,132,228,0.18)`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      // ── Connection arcs ──
      connections.forEach(([ai, bi], ci) => {
        const a3 = cityXYZ[ai]
        const b3 = cityXYZ[bi]
        const arcPts = arcPoints(a3, b3, 32)

        // Check visibility: use midpoint z
        const midProj = project(arcPts[16], rot)
        const visible = midProj.z > -0.3

        if (!visible) return

        // Compute arc screen points
        const screenPts = arcPts.map(p => project(p, rot))

        // Slightly lift arc above surface
        const lift = 1.04

        // Draw arc line
        ctx.beginPath()
        screenPts.forEach((sp, i) => {
          const liftedX = cx + (sp.x - cx) * lift
          const liftedY = cy + (sp.y - cy) * lift
          if (i === 0) ctx.moveTo(liftedX, liftedY)
          else ctx.lineTo(liftedX, liftedY)
        })
        const arcAlpha = Math.max(0, midProj.z + 0.3) * 0.7
        ctx.strokeStyle = `rgba(53,132,228,${arcAlpha * 0.5})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // ── Pulse dot traveling along arc ──
        const pulse = pulses[ci]
        pulse.t += pulse.speed
        if (pulse.t > 1) pulse.t -= 1
        const pIdx = Math.floor(pulse.t * (screenPts.length - 1))
        const sp = screenPts[pIdx]
        if (sp && sp.z > -0.2) {
          const liftedX = cx + (sp.x - cx) * lift
          const liftedY = cy + (sp.y - cy) * lift
          const pAlpha = Math.max(0, sp.z + 0.2)
          // Glow
          const glow = ctx.createRadialGradient(liftedX, liftedY, 0, liftedX, liftedY, 6)
          glow.addColorStop(0, `rgba(100,180,255,${pAlpha * 0.9})`)
          glow.addColorStop(1, 'rgba(100,180,255,0)')
          ctx.beginPath()
          ctx.arc(liftedX, liftedY, 6, 0, Math.PI*2)
          ctx.fillStyle = glow
          ctx.fill()
          // Core dot
          ctx.beginPath()
          ctx.arc(liftedX, liftedY, 2, 0, Math.PI*2)
          ctx.fillStyle = `rgba(150,210,255,${pAlpha})`
          ctx.fill()
        }
      })

      // ── City nodes ──
      cityXYZ.forEach((p, i) => {
        const proj = project(p, rot)
        if (proj.z < -0.1) return
        const alpha = Math.max(0, proj.z + 0.1)
        const nodeSize = 2.5 * proj.scale

        // Outer glow
        const glow = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, nodeSize * 4)
        glow.addColorStop(0, `rgba(98,160,234,${alpha * 0.6})`)
        glow.addColorStop(1, 'rgba(98,160,234,0)')
        ctx.beginPath()
        ctx.arc(proj.x, proj.y, nodeSize * 4, 0, Math.PI*2)
        ctx.fillStyle = glow
        ctx.fill()

        // Node dot
        ctx.beginPath()
        ctx.arc(proj.x, proj.y, nodeSize, 0, Math.PI*2)
        ctx.fillStyle = `rgba(180,220,255,${alpha})`
        ctx.fill()
      })

      // ── Specular highlight (3D glass effect) ──
      const specGrad = ctx.createRadialGradient(
        cx - R*0.3, cy - R*0.3, 0,
        cx - R*0.15, cy - R*0.15, R*0.6
      )
      specGrad.addColorStop(0, 'rgba(255,255,255,0.12)')
      specGrad.addColorStop(0.5, 'rgba(255,255,255,0.03)')
      specGrad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI*2)
      ctx.fillStyle = specGrad
      ctx.fill()

      // ── Globe border ──
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI*2)
      ctx.strokeStyle = 'rgba(53,132,228,0.35)'
      ctx.lineWidth = 1
      ctx.stroke()

      // ── Outer glow ring ──
      ctx.beginPath()
      ctx.arc(cx, cy, R + 2, 0, Math.PI*2)
      ctx.strokeStyle = 'rgba(53,132,228,0.10)'
      ctx.lineWidth = 4
      ctx.stroke()

      rotationRef.current += 0.003
      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'block',
      }}
    />
  )
}

export default Globe3D
