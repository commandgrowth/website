'use client'

import './globals.css'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function GlobalEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const ring      = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // ── Loader ──
    const loader = loaderRef.current
    if (loader) setTimeout(() => loader.classList.add('hidden'), 1800)

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
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
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
    const rewire = setInterval(addHover, 1000); setTimeout(() => clearInterval(rewire), 6000)

    // ── Scroll reveal ──
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const delay = parseFloat(el.dataset.delay || '0')
          setTimeout(() => el.classList.add('visible'), delay * 1000)
          io.unobserve(el)
        }
      })
    }, { threshold: 0.07, rootMargin: '-20px' })

    const wire = () => document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el))
    wire()
    const t = setInterval(wire, 1000); setTimeout(() => clearInterval(t), 6000)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      io.disconnect()
    }
  }, [])

  return (
    <>
      <div id="cg-loader" ref={loaderRef}>
        <img src="/Logo.png" alt="CommandGrowth"
          style={{ width: 160, height: 'auto', opacity: 0,
            animation: 'logoFadeIn 0.7s ease 0.2s forwards' }} />
        <div id="cg-loader-bar" />
        <div id="cg-loader-sub">Based in Nagpur · Real Estate Growth Systems</div>
        <style>{`@keyframes logoFadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>

      <div id="grain" />
      <div id="cg-cursor"      ref={cursorRef} />
      <div id="cg-cursor-ring" ref={ringRef}   />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>CommandGrowth — Real Estate Lead Generation & Growth Systems | Nagpur</title>
        <meta name="description" content="AI-powered lead generation, WhatsApp automation, and CRM systems exclusively for real estate developers and plotting companies across India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GlobalEffects />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
