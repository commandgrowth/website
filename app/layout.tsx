'use client'

import './globals.css'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>CommandGrowth — Real Estate Lead Generation & Automation | Nagpur</title>
        <meta name="description" content="India's specialized real estate lead generation agency. Meta Ads, WhatsApp automation, CRM systems and AI follow-up for developers and plotting companies. Based in Nagpur." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GlobalEffects />
        <div id="grain" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function GlobalEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const mouse     = useRef({ x: -100, y: -100 })
  const pos       = useRef({ x: -100, y: -100 })
  const isDark    = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = ringRef.current
    const loader = loaderRef.current
    if (!cursor || !ring || !loader) return

    // ── Loader ──
    setTimeout(() => loader.classList.add('hidden'), 1900)

    // ── Mouse tracking ──
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'

      // Detect if cursor is over dark section
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const bg = el ? window.getComputedStyle(el).backgroundColor : ''
      const dark = bg.includes('7, 18, 42') || bg.includes('13, 30, 64')
      if (dark !== isDark.current) {
        isDark.current = dark
        cursor.classList.toggle('on-dark', dark)
      }
    }
    document.addEventListener('mousemove', onMove)

    // ── Lagging ring ──
    let raf: number
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1
      ring.style.left = pos.current.x + 'px'
      ring.style.top  = pos.current.y + 'px'
      raf = requestAnimationFrame(tick)
    }
    tick()

    // ── Hover expand ──
    const wire = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
      })
    }
    wire()
    const wt = setInterval(wire, 1200)
    setTimeout(() => clearInterval(wt), 8000)

    // ── Scroll reveal ──
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        const d  = parseFloat(el.dataset.d || '0')
        setTimeout(() => el.classList.add('vis'), d * 1000)
        io.unobserve(el)
      })
    }, { threshold: 0.06, rootMargin: '-16px' })

    const rewire = () => document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el))
    rewire()
    const rt = setInterval(rewire, 1200)
    setTimeout(() => clearInterval(rt), 8000)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  return (
    <>
      {/* Loader */}
      <div id="cg-loader" ref={loaderRef}>
        <img
          src="/Logo.png"
          alt="CommandGrowth"
          style={{
            width: 160, height: 'auto',
            animation: 'lgIn 0.7s ease 0.1s both',
          }}
        />
        <div id="cg-loader-bar" />
        <div id="cg-loader-tagline">Real Estate Growth Systems · Nagpur</div>
        <style>{`
          @keyframes lgIn {
            from { opacity:0; transform: translateY(10px); }
            to   { opacity:1; transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* Cursor */}
      <div id="cg-cursor"      ref={cursorRef} />
      <div id="cg-cursor-ring" ref={ringRef}   />
    </>
  )
}
