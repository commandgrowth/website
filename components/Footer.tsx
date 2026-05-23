'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-gold-500/10 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950/80" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* ── Brand with real logo ── */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group w-fit" data-cursor>
              <Image
                src="/Logo.png"
                alt="CommandGrowth"
                width={180}
                height={68}
                className="object-contain h-14 w-auto transition-all duration-400 group-hover:scale-105 group-hover:brightness-110"
              />
            </Link>
            <p className="text-white/45 font-body text-sm leading-relaxed max-w-xs mb-6">
              Transforming ambitious brands through precision digital strategy.
              Based in Nagpur, scaling across India and beyond.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg border border-gold-500/20 flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/50 transition-colors duration-200"
                  data-cursor
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Navigation links ── */}
          <div>
            <h4 className="text-gold-400 font-body font-semibold tracking-widest text-xs uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white/50 hover:text-gold-400 transition-colors font-body text-sm animated-underline"
                    data-cursor
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-gold-400 font-body font-semibold tracking-widest text-xs uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/50 text-sm font-body">
                <MapPin className="w-4 h-4 text-gold-500/60 mt-0.5 flex-shrink-0" />
                <span>Nagpur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm font-body">
                <Mail className="w-4 h-4 text-gold-500/60 flex-shrink-0" />
                <a
                  href="mailto:hello@commandgrowth.com"
                  className="hover:text-gold-400 transition-colors"
                  data-cursor
                >
                  hello@commandgrowth.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm font-body">
                <Phone className="w-4 h-4 text-gold-500/60 flex-shrink-0" />
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="hover:text-gold-400 transition-colors"
                  data-cursor
                >
                  +91 XX XXXX XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-gold-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-body">
            © {new Date().getFullYear()} CommandGrowth · See Cine. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <Link
                key={item}
                href="#"
                className="text-white/25 hover:text-white/50 text-xs font-body transition-colors"
                data-cursor
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
