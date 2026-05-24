'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowRight, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#07122A', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
      {/* Top gold line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand — 5 cols */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex mb-6 group" data-cursor>
              <Image src="/Logo.png" alt="CommandGrowth" width={160} height={56}
                className="object-contain h-12 w-auto transition-all duration-400 group-hover:brightness-110"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="font-body text-sm leading-relaxed mb-4 max-w-xs"
              style={{ color: 'rgba(248,246,242,0.35)' }}>
              AI-powered lead generation and automation systems exclusively for real estate developers and plotting companies across India.
            </p>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.5)' }} />
              <span className="font-body text-xs" style={{ color: 'rgba(248,246,242,0.3)' }}>
                Based in Nagpur, Maharashtra · Serving pan-India developers
              </span>
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/91XXXXXXXXXX" data-cursor
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-body font-semibold mb-6 transition-all duration-200"
              style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.18)', color: '#34D399' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Chat on WhatsApp
            </a>

            {/* Socials */}
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <motion.a key={i} href="#" data-cursor whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(248,246,242,0.08)', color: 'rgba(248,246,242,0.3)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)'
                    ;(e.currentTarget as HTMLElement).style.color = '#D4AF37'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(248,246,242,0.08)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(248,246,242,0.3)'
                  }}>
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services — 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="font-body font-semibold text-xs tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(212,175,55,0.6)' }}>Our Services</h4>
            <ul className="space-y-3">
              {[
                'Property Lead Generation',
                'WhatsApp Automation',
                'CRM & Sales Pipeline',
                'Retargeting Campaigns',
                'Site Visit Booking Funnel',
                'AI Follow-Up System',
              ].map(item => (
                <li key={item}>
                  <Link href="/services" data-cursor
                    className="font-body text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'rgba(248,246,242,0.35)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#D4AF37')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,246,242,0.35)')}>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="lg:col-span-4">
            <h4 className="font-body font-semibold text-xs tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(212,175,55,0.6)' }}>Get In Touch</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.45)' }} />
                <span className="font-body text-sm" style={{ color: 'rgba(248,246,242,0.35)' }}>
                  Nagpur, Maharashtra, India
                </span>
              </li>
              <li>
                <a href="mailto:hello@commandgrowth.org" data-cursor
                  className="flex items-center gap-3 font-body text-sm transition-colors duration-200"
                  style={{ color: 'rgba(248,246,242,0.35)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#D4AF37')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,246,242,0.35)')}>
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.45)' }} />
                  hello@commandgrowth.org
                </a>
              </li>
              <li>
                <a href="tel:+91XXXXXXXXXX" data-cursor
                  className="flex items-center gap-3 font-body text-sm transition-colors duration-200"
                  style={{ color: 'rgba(248,246,242,0.35)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#D4AF37')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,246,242,0.35)')}>
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.45)' }} />
                  +91 XX XXXX XXXX
                </a>
              </li>
            </ul>

            {/* Mini CTA box */}
            <div className="p-5 rounded-xl" style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)' }}>
              <p className="font-body text-xs mb-3" style={{ color: 'rgba(248,246,242,0.35)' }}>
                Ready to generate more qualified buyer leads?
              </p>
              <Link href="/contact" data-cursor
                className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-colors duration-200"
                style={{ color: 'var(--gold)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8CB6A')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}>
                Book Free Growth Audit <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(248,246,242,0.05)' }}>
          <p className="font-body text-xs" style={{ color: 'rgba(248,246,242,0.18)' }}>
            © {new Date().getFullYear()} CommandGrowth · See Cine. Specialized Real Estate Growth Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <Link key={item} href="#" data-cursor
                className="font-body text-xs transition-colors duration-200"
                style={{ color: 'rgba(248,246,242,0.18)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,246,242,0.45)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,246,242,0.18)')}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
