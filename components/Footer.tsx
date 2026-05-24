'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#040608', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-5 group w-fit" data-cursor>
              <Image src="/Logo.png" alt="CommandGrowth" width={160} height={56}
                className="object-contain h-12 w-auto transition-all duration-400 group-hover:brightness-110" />
            </Link>
            <p className="text-white/35 font-body text-sm leading-relaxed max-w-xs mb-3">
              AI-powered lead generation and automation systems for real estate developers and plotting companies across India.
            </p>
            <p className="text-white/20 font-body text-xs mb-6">
              📍 Based in Nagpur, Maharashtra · Serving developers pan-India
            </p>
            {/* WhatsApp CTA */}
            <a href="https://wa.me/91XXXXXXXXXX" data-cursor
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body font-semibold transition-all duration-200 mb-6"
              style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.18)', color: '#25D366' }}>
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <motion.a key={i} href="#" data-cursor whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-white/30 hover:text-gold-400 hover:border-gold-500/40 transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold-400 font-body font-semibold tracking-widest text-xs uppercase mb-6">Services</h4>
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
                    className="text-white/35 hover:text-gold-400 transition-colors font-body text-sm animated-underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-400 font-body font-semibold tracking-widest text-xs uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/35 text-sm font-body">
                <MapPin className="w-4 h-4 text-gold-500/50 mt-0.5 flex-shrink-0" />
                <span>Nagpur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-white/35 text-sm font-body">
                <Mail className="w-4 h-4 text-gold-500/50 flex-shrink-0" />
                <a href="mailto:hello@commandgrowth.org" data-cursor
                  className="hover:text-gold-400 transition-colors">hello@commandgrowth.org</a>
              </li>
              <li className="flex items-center gap-3 text-white/35 text-sm font-body">
                <Phone className="w-4 h-4 text-gold-500/50 flex-shrink-0" />
                <a href="tel:+91XXXXXXXXXX" data-cursor
                  className="hover:text-gold-400 transition-colors">+91 XX XXXX XXXX</a>
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}>
              <p className="text-white/30 text-xs font-body mb-2">Ready to grow your sales?</p>
              <Link href="/contact" data-cursor
                className="text-gold-400 text-sm font-body font-semibold hover:text-gold-300 transition-colors">
                Book Free Growth Audit →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-xs font-body">
            © {new Date().getFullYear()} CommandGrowth · See Cine. Specialized in Real Estate Lead Generation. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <Link key={item} href="#" data-cursor
                className="text-white/15 hover:text-white/35 text-xs font-body transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
