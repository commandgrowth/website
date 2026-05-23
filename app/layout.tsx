'use client'

import './globals.css'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function GlobalEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const ring      = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // ── Loader ──
    const loader = loaderRef.current
    if (loader) setTimeout(() => loader.classList.add('hidden'), 1600)

    // ── Cursor ──
    const cursor = cursorRef.current
    const ringEl = ringRef.current
    if (!cursor || !ringEl) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let rafId: number
    const animRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      rafId = requestAnimationFrame(animRing)
    }
    animRing()

    const addHover = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ringEl.classList.add('hover') })
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ringEl.classList.remove('hover') })
      })
    }
    addHover()

    // ── Particle canvas ──
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    interface P { x: number; y: number; size: number; speed: number; opacity: number; drift: number }
    const particles: P[] = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size:    Math.random() * 2.2 + 0.5,
      speed:   Math.random() * 0.5 + 0.15,
      opacity: Math.random() * 0.55 + 0.2,
      drift:   Math.random() * 0.6 - 0.3,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.y -= p.speed; p.x += p.drift
        if (p.y < -4 || p.x < -4 || p.x > W + 4) { p.x = Math.random() * W; p.y = H + 4 }
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
        grd.addColorStop(0, `rgba(212,175,55,${p.opacity})`)
        grd.addColorStop(1, `rgba(212,175,55,0)`)
        ctx.beginPath()
        ctx.fillStyle = grd
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        ctx.fill()
      })
      requestAnimationFrame(tick)
    }
    tick()

    // ── Scroll reveal ──
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '-40px' })
    const wire = () => document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el))
    wire()
    const t = setInterval(wire, 800); setTimeout(() => clearInterval(t), 5000)

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
      io.disconnect()
    }
  }, [])

  return (
    <>
      {/* IMPL 4: Logo loader
          ─ Replace the text logo below with an <img> tag pointing to your logo once you upload it.
          ─ Example: <img src="/logo.png" alt="CommandGrowth" className="w-32" />
          ─ Place your logo file in the /public folder of your project.
      */}
      <div id="cg-loader" ref={loaderRef}>
        {/* ── Swap this block with your logo image ── */}
        <div id="cg-loader-logo">
          <span>Command</span><span>Growth</span>
        </div>
        {/* ─────────────────────────────────────────── */}
        <div id="cg-loader-bar" />
        <p style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(212,175,55,0.4)',
          marginTop: '4px',
        }}>Based in Nagpur · Built for India</p>
      </div>

      <div className="grain" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99990 }} />
      <canvas id="cg-particles" ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
      <div id="cg-cursor"      ref={cursorRef} />
      <div id="cg-cursor-ring" ref={ringRef}   />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>CommandGrowth — Premier Digital Growth Agency</title>
        <meta name="description" content="We engineer digital dominance for local Indian brands. Local SEO, WhatsApp Automation, Reels Marketing and Influencer Tie-ups — built in Nagpur, scaled across India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-navy-900 text-white antialiased" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <GlobalEffects />

        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-[0.055]"
            style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[300px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }} />
        </div>

        <Navbar />
        <main className="relative z-10 page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
