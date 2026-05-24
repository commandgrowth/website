'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-gold-500\/10 shadow-glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center group" data-cursor>
              <Image
                src="/Logo.png"
                alt="CommandGrowth — Real Estate Lead Generation"
                width={160}
                height={56}
                className="object-contain h-11 w-auto transition-all duration-400 group-hover:scale-105 group-hover:brightness-110"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} data-cursor
                  className={`relative text-sm tracking-wide font-body font-medium transition-colors duration-200 animated-underline ${
                    pathname === link.href ? 'text-gold-400' : 'text-white/60 hover:text-white'
                  }`}>
                  {link.label}
                  {pathname === link.href && (
                    <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, #D4AF37, #f0d060)' }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {/* WhatsApp quick contact */}
              <a href="https://wa.me/91XXXXXXXXXX" data-cursor
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold transition-all duration-200"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', color: '#25D366' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                WhatsApp Us
              </a>
              <Link href="/contact" data-cursor
                className="shimmer px-5 py-2.5 text-sm font-bold font-body tracking-wide text-navy-900 block"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #b8952e)',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}>
                Free Growth Audit
              </Link>
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
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 glass flex flex-col justify-center items-center gap-8"
          >
            <Image src="/Logo.png" alt="CommandGrowth" width={140} height={52}
              className="object-contain h-12 w-auto mb-4" />
            {navLinks.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}>
                <Link href={link.href} onClick={() => setMobileOpen(false)} data-cursor
                  className={`text-4xl font-display font-bold ${
                    pathname === link.href ? 'gold-text' : 'text-white/80'
                  }`}>{link.label}</Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)} data-cursor
                className="shimmer px-10 py-3 font-bold font-body text-navy-900 text-lg inline-block"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #b8952e)' }}>
                Book Free Audit
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
