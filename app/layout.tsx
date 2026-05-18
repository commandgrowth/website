'use client'

import './globals.css'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function GlobalEffects() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const loaderRef  = useRef<HTMLDivElement>(null)
  const mouse      = useRef({ x: 0, y: 0 })
  const ring       = useRef({ x: 0, y: 0 })
  const rafIdRef   = useRef<number>(0)

  useEffect(() => {
    // ── Loader ──────────────────────────────────────
    const loader = loaderRef.current
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 1400)
    }

    // ── Custom Cursor ────────────────────────────────
    const cursor = cursorRef.current
    const ringEl = ringRef.current
    if (!cursor || !ringEl) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    const animRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      rafIdRef.current = requestAnimationFrame(animRing)
    }
    animRing()

    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover')
        ringEl.classList.add('hover')
      })
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover')
        ringEl.classList.remove('hover')
      })
    }
    const hoverEls = document.querySelectorAll('a, button, [data-cursor]')
    hoverEls.forEach(addHover)

    // ── Particle Canvas ──────────────────────────────
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = 0, H = 0
    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    interface Particle {
      x: number; y: number; size: number
      speed: number; opacity: number; drift: number
    }

    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.25 + 0.08,
      opacity: Math.random() * 0.35 + 0.05,
      drift: Math.random() * 0.4 - 0.2,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -4 || p.x < -4 || p.x > W + 4) {
          p.x = Math.random() * W
          p.y = H + 4
          p.opacity = Math.random() * 0.35 + 0.05
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${p.opacity})`
        ctx.fill()
      })
      requestAnimationFrame(tick)
    }
    tick()

    // ── Scroll Reveal ────────────────────────────────
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '-40px' })

    document.querySelectorAll('.reveal').forEach(el => io.observe(el))

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafIdRef.current)
      io.disconnect()
    }
  }, [])

  return (
    <>
      {/* Loader */}
      <div id="cg-loader" ref={loaderRef}>
        <div id="cg-loader-logo">
          <span>Command</span><span>Growth</span>
        </div>
        <div id="cg-loader-bar" />
      </div>

      {/* Grain */}
      <div className="grain" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99990 }} />

      {/* Particles */}
      <canvas id="cg-particles" ref={canvasRef} />

      {/* Cursor */}
      <div id="cg-cursor"      ref={cursorRef} />
      <div id="cg-cursor-ring" ref={ringRef}   />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>CommandGrowth — See Cine | Nagpur's Premier Digital Agency</title>
        <meta name="description" content="Ultra-premium digital growth agency. Local SEO, Performance Marketing, WhatsApp Automation and Vernacular Content for ambitious local brands." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy-900 text-white antialiased" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <GlobalEffects />

        {/* Global ambient glow */}
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
