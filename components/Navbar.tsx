'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark]             = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40)
      // Switch to dark nav when over hero (first 90vh)
      setDark(window.scrollY < window.innerHeight * 0.85)
    }
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navTextColor = dark && !scrolled ? 'rgba(248,246,242,0.75)' : '#07122A'
  const navHoverColor = dark && !scrolled ? '#F8F6F2' : '#07122A'
  const logoFilter = dark && !scrolled ? 'brightness(0) invert(1)' : 'none'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? dark ? 'nav-dark-scrolled' : 'nav-scrolled'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center group" data-cursor>
              <Image
                src="/Logo.png"
                alt="CommandGrowth"
                width={160} height={56}
                className="object-contain h-11 w-auto transition-all duration-400 group-hover:scale-105"
                style={{ filter: logoFilter }}
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} data-cursor
                  className="relative text-sm font-body font-medium tracking-wide transition-colors duration-200 underline-gold"
                  style={{
                    color: pathname === link.href
                      ? '#D4AF37'
                      : navTextColor
                  }}>
                  {link.label}
                  {pathname === link.href && (
                    <motion.span layoutId="indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: '#D4AF37' }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/contact" data-cursor className="btn-gold text-xs">
                <span>Book Free Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden transition-colors" data-cursor
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: navTextColor }}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — ivory bg */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8"
            style={{ background: '#F8F6F2' }}
          >
            <Image src="/Logo.png" alt="CommandGrowth" width={140} height={52}
              className="object-contain h-12 w-auto mb-4" />
            {navLinks.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}>
                <Link href={link.href} onClick={() => setMobileOpen(false)} data-cursor
                  className="text-4xl font-serif font-bold"
                  style={{ color: pathname === link.href ? '#D4AF37' : '#07122A' }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)} data-cursor className="btn-gold">
                <span>Book Free Growth Audit</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
