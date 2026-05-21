'use client'

import './globals.css'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'

/* ─────────────────────────────────────────────────
   GlobalEffects
   • Three.js WebGL floating gold particle cloud
   • Custom dual-layer cursor with lag ring
   • GSAP ScrollTrigger reveal wiring
   • Loader fade-out
───────────────────────────────────────────────── */
function GlobalEffects() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const trailRef   = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const loaderRef  = useRef<HTMLDivElement>(null)
  const mouse      = useRef({ x: 0, y: 0 })
  const trail      = useRef({ x: 0, y: 0 })

  // ── Three.js init (runs after GSAP scripts load) ──
  const initThree = () => {
    const THREE = (window as any).THREE
    if (!THREE || !canvasRef.current) return

    const W = window.innerWidth
    const H = window.innerHeight

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    // ── Gold particle cloud ──
    const COUNT    = 2200
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14

      // Gold spectrum: warm yellow to amber
      const t = Math.random()
      colors[i * 3]     = 0.75 + t * 0.25   // R
      colors[i * 3 + 1] = 0.60 + t * 0.18   // G
      colors[i * 3 + 2] = 0.10 + t * 0.15   // B

      sizes[i] = Math.random() * 0.018 + 0.006
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes,     1))

    const mat = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // ── Mouse tracking for subtle parallax ──
    const targetCam = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => {
      targetCam.x = (e.clientX / window.innerWidth  - 0.5) * 0.6
      targetCam.y = (e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener('mousemove', onMouse)

    // ── Resize ──
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── RAF loop ──
    let t = 0, frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      t += 0.0004

      points.rotation.y += 0.00025
      points.rotation.x += 0.00010

      // Breathe scale
      const breathe = 1 + Math.sin(t * 2.5) * 0.012
      points.scale.setScalar(breathe)

      // Smooth camera to mouse
      camera.position.x += (targetCam.x - camera.position.x) * 0.04
      camera.position.y += (-targetCam.y - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }

  useEffect(() => {
    // ── Loader ──
    const loader = loaderRef.current
    if (loader) setTimeout(() => loader.classList.add('out'), 1500)

    // ── Cursor ──
    const cursor = cursorRef.current
    const trailEl = trailRef.current
    if (!cursor || !trailEl) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let rafId: number
    const animTrail = () => {
      trail.current.x += (mouse.current.x - trail.current.x) * 0.1
      trail.current.y += (mouse.current.y - trail.current.y) * 0.1
      trailEl.style.left = trail.current.x + 'px'
      trailEl.style.top  = trail.current.y + 'px'
      rafId = requestAnimationFrame(animTrail)
    }
    animTrail()

    // Expand on hover
    const hoverEls = () => document.querySelectorAll('a,button,[data-cursor]')
    const addHover = () => hoverEls().forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('expanded'))
      el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'))
    })
    addHover()

    // ── Scroll Reveal via IntersectionObserver ──
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0
          setTimeout(() => el.classList.add('visible'), delay * 1000)
          io.unobserve(el)
        }
      })
    }, { threshold: 0.08, rootMargin: '-30px' })

    const wire = () => {
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el))
    }
    wire()
    // Re-wire on soft nav
    const rewireTimer = setInterval(wire, 800)
    setTimeout(() => clearInterval(rewireTimer), 5000)

    // ── Three.js (wait for script to load) ──
    let threeCleanup: (() => void) | undefined
    const tryThree = () => {
      if ((window as any).THREE) {
        const cleanup = initThree()
        if (cleanup) threeCleanup = cleanup
      } else {
        setTimeout(tryThree, 200)
      }
    }
    setTimeout(tryThree, 400)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      io.disconnect()
      threeCleanup?.()
    }
  }, [])

  return (
    <>
      {/* Loader */}
      <div id="cg-loader" ref={loaderRef}>
        <div id="loader-logo">
          <span className="g">Command</span><span className="w">Growth</span>
        </div>
        <div id="loader-bar-wrap"><div id="loader-bar-fill" /></div>
        <div id="loader-sub">See Cine · Nagpur</div>
      </div>

      {/* Fixed BG layers */}
      <div id="mesh-bg" />
      <div id="grain"   />

      {/* Three.js canvas */}
      <canvas id="webgl-canvas" ref={canvasRef} />

      {/* Cursor */}
      <div id="cg-cursor"       ref={cursorRef}  />
      <div id="cg-cursor-trail" ref={trailRef}   />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>CommandGrowth — Nagpur's Premier Digital Growth Agency</title>
        <meta name="description" content="We engineer digital dominance for local Indian brands. Local SEO, WhatsApp Automation, Reels Marketing & Influencer Tie-ups — built for Nagpur, scaled across India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Three.js r128 */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />

        <GlobalEffects />
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
