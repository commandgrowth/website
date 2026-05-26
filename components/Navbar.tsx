'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { href: '/',         label: 'Home'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

/* Matches the page content max-width */
const MAX = 'max-w-6xl mx-auto'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [onDark,      setOnDark]      = useState(true)   // hero is dark
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 48)
      // Switch once past the hero (~90vh)
      setOnDark(y < window.innerHeight * 0.88)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* ─── Visual state ─────────────────────────────────── */
  const navBg =
    scrolled && !onDark  ? 'rgba(248,246,242,0.97)' :
    scrolled &&  onDark  ? 'rgba(7,18,42,0.97)'     :
    'transparent'

  const navBorder =
    scrolled && !onDark ? '1px solid rgba(7,18,42,0.06)' :
    scrolled &&  onDark ? '1px solid rgba(201,168,76,0.1)' :
    '1px solid transparent'

  const navShadow =
    scrolled && !onDark ? '0 1px 20px rgba(7,18,42,0.06)' :
    scrolled &&  onDark ? 'none' :
    'none'

  const linkColor = onDark
    ? 'rgba(248,246,242,0.6)'
    : 'rgba(7,18,42,0.55)'

  const linkHover = onDark ? 'var(--ivory)' : 'var(--navy)'
  const activeColor = '#C9A84C'
  const logoFilter = onDark ? 'brightness(0) invert(1)' : 'none'

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 50,
          background: navBg,
          borderBottom: navBorder,
          boxShadow: navShadow,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}>

        {/* ── Constrained inner container ── */}
        <div className={`${MAX} px-6 lg:px-10`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

            {/* Logo */}
            <Link href="/" data-cursor style={{ display: 'flex', alignItems: 'center' }}
              className="group">
              <Image
                src="/Logo.png"
                alt="CommandGrowth"
                width={148} height={52}
                priority
                style={{
                  objectFit: 'contain',
                  height: 40, width: 'auto',
                  filter: logoFilter,
                  transition: 'filter 0.4s ease, transform 0.3s ease',
                }}
                className="group-hover:scale-[1.03]"
              />
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}
              className="hidden md:flex">
              {links.map(link => (
                <Link key={link.href} href={link.href} data-cursor
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: pathname === link.href ? activeColor : linkColor,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    paddingBottom: 2,
                  }}
                  onMouseEnter={e => {
                    if (pathname !== link.href)
                      (e.currentTarget as HTMLElement).style.color = linkHover
                  }}
                  onMouseLeave={e => {
                    if (pathname !== link.href)
                      (e.currentTarget as HTMLElement).style.color = linkColor
                  }}>
                  {link.label}
                  {/* Active underline */}
                  {pathname === link.href && (
                    <motion.span layoutId="nav-line"
                      style={{
                        position: 'absolute', bottom: -2, left: 0, right: 0,
                        height: 1, background: activeColor,
                      }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* WhatsApp quick pill */}
              <a href="https://wa.me/91XXXXXXXXXX" data-cursor
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
                  color: '#10B981',
                  padding: '7px 14px', borderRadius: 20,
                  background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.18)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.14)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.08)'}>
                <span style={{ display: 'block', width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                WhatsApp Us
              </a>

              <Link href="/contact" data-cursor className="btn-gold"
                style={{ padding: '9px 22px', fontSize: 12 }}>
                <span>Free Growth Audit</span>
                <ArrowRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden" data-cursor
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none', border: 'none', padding: 4,
                color: onDark ? 'rgba(248,246,242,0.7)' : 'rgba(7,18,42,0.65)',
                transition: 'color 0.2s',
              }}>
              {mobileOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'var(--ivory)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 32,
            }}>
            <Image src="/Logo.png" alt="CommandGrowth" width={140} height={50}
              style={{ objectFit: 'contain', height: 44, width: 'auto', marginBottom: 8 }} />
            {links.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}>
                <Link href={link.href} onClick={() => setMobileOpen(false)} data-cursor
                  style={{
                    fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 36,
                    color: pathname === link.href ? 'var(--gold-dim)' : 'var(--navy)',
                    textDecoration: 'none',
                  }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)} data-cursor className="btn-gold">
                <span>Book Free Audit</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
