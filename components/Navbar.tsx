'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Menu, X, TrendingUp } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

function MagneticBtn({ children, className, onClick }: {
  children: React.ReactNode; className?: string; onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18 })
  const sy = useSpring(y, { stiffness: 260, damping: 18 })

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={className} onClick={onClick}
      onMouseMove={e => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width  / 2)) * 0.28)
        y.set((e.clientY - (r.top  + r.height / 2)) * 0.28)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >{children}</motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-gold-500/10 shadow-glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" data-cursor>
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #b8952e)' }}>
                  <TrendingUp className="w-5 h-5 text-navy-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 22px rgba(212,175,55,0.7)' }}
                />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight">
                  <span className="text-gold-500">Command</span>
                  <span className="text-white">Growth</span>
                </span>
                <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase -mt-0.5 font-body">See Cine</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} data-cursor
                  className={`relative text-sm tracking-wide font-body font-medium transition-colors duration-200 animated-underline ${
                    pathname === link.href ? 'text-gold-400' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, #D4AF37, #f0d060)' }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <MagneticBtn>
                <Link href="/contact" data-cursor
                  className="relative btn-shimmer px-6 py-2.5 text-sm font-bold font-body tracking-wide overflow-hidden group block"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #b8952e)',
                    clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                  }}
                >
                  <span className="relative z-10 text-navy-900">Get Started</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #f0d060, #D4AF37)' }} />
                </Link>
              </MagneticBtn>
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden text-white/70 hover:text-gold-400 transition-colors" data-cursor
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 glass flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={link.href} onClick={() => setMobileOpen(false)} data-cursor
                  className={`text-4xl font-display font-bold ${
                    pathname === link.href ? 'gold-text' : 'text-white/80'
                  }`}>{link.label}</Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)} data-cursor
                className="btn-shimmer px-10 py-3 font-bold font-body text-navy-900 text-lg inline-block"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #b8952e)' }}>
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
