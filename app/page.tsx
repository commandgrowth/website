'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, ChevronDown, MessageCircle,
  Target, BarChart3, Zap, Clock, MapPin, Building2,
  TrendingUp, Users, Phone, Star, AlertTriangle
} from 'lucide-react'

/* ── Reveal wrapper ─────────────────────────────────────── */
function R({ children, d = 0, dir = 'up', className = '' }: {
  children: React.ReactNode; d?: number; dir?: 'up'|'left'|'right'; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const init = dir === 'left' ? { opacity: 0, x: -40 } : dir === 'right' ? { opacity: 0, x: 40 } : { opacity: 0, y: 40 }
  return (
    <motion.div ref={ref} initial={init}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

/* ── Image placeholder component ───────────────────────── */
function ImgBox({
  label, aspectRatio = '4/3', dark = false, className = '', rounded = true,
  overlay,
}: {
  label: string; aspectRatio?: string; dark?: boolean
  className?: string; rounded?: boolean; overlay?: React.ReactNode
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded ? 'rounded-2xl' : ''} ${dark ? 'img-placeholder-dark' : 'img-placeholder'} ${className}`}
      style={{ aspectRatio }}
      data-label={label}
    >
      {/* Inner architectural lines to suggest space */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
        <div className="absolute inset-8 border" style={{ borderColor: dark ? 'rgba(212,175,55,0.4)' : 'rgba(7,18,42,0.25)' }} />
        <div className="absolute inset-16 border" style={{ borderColor: dark ? 'rgba(212,175,55,0.25)' : 'rgba(7,18,42,0.15)' }} />
        <Building2 className="w-16 h-16" style={{ color: dark ? 'rgba(212,175,55,0.3)' : 'rgba(7,18,42,0.2)' }} />
      </div>
      {overlay && <div className="absolute inset-0 z-10">{overlay}</div>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   1. HERO — Navy dark, ivory text, gold accents
   Right side: property image placeholder with floating UI cards
═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--navy)' }}>
      <div className="absolute inset-0 dot-grid-dark opacity-60" />
      {/* Subtle top-left ambient */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)' }} />
      {/* Bottom right ambient */}
      <div className="absolute -bottom-20 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — Copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-10"
              style={{ borderBottom: '1px solid rgba(212,175,55,0.25)', paddingBottom: 12 }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
              <span className="font-body text-xs font-medium tracking-[0.28em] uppercase"
                style={{ color: 'rgba(212,175,55,0.8)' }}>
                Real Estate Lead Generation · Nagpur & India
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-bold leading-[1.0] mb-8"
              style={{ fontSize: 'clamp(42px, 5.5vw, 76px)', color: 'var(--ivory)' }}>
              Generate More<br />
              <em className="font-serif not-italic" style={{ color: 'var(--gold)' }}>Qualified Property</em><br />
              Buyer Leads —<br />
              <span className="font-light italic" style={{ color: 'rgba(248,246,242,0.55)', fontSize: '0.72em' }}>
                Automatically.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-body text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: 'rgba(248,246,242,0.55)' }}>
              Meta Ads · WhatsApp Automation · CRM Pipeline · AI Follow-Up.
              A complete lead generation and conversion system built exclusively
              for developers and plotting companies.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-14">
              <Link href="/contact" data-cursor className="btn-gold">
                <span>Book Free Growth Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" data-cursor className="btn-outline-light">
                <span>Get Lead Strategy</span>
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
              className="grid grid-cols-4 gap-6 pt-8"
              style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}>
              {[
                { v: '214+', l: 'Leads/Month' },
                { v: '₹10Cr+', l: 'Ad Spend' },
                { v: '2 min', l: 'Response Time' },
                { v: '47%', l: 'More Site Visits' },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div className="font-serif font-bold text-2xl gold-text leading-none mb-1">{v}</div>
                  <div className="font-body text-xs" style={{ color: 'rgba(248,246,242,0.3)' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Property image + floating UI elements */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative">

            {/* Main property image placeholder */}
            <ImgBox
              label="Luxury residential project / township aerial view"
              aspectRatio="4/5"
              dark
              className="w-full"
              overlay={
                <>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(7,18,42,0.8) 100%)' }} />
                  {/* Bottom project info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-body text-xs tracking-widest uppercase mb-1"
                      style={{ color: 'rgba(212,175,55,0.7)' }}>Featured Project</p>
                    <p className="font-serif text-xl font-semibold" style={{ color: 'var(--ivory)' }}>
                      Premium Township Development
                    </p>
                  </div>
                </>
              }
            />

            {/* Floating: Live leads card */}
            <motion.div
              animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-8 top-16 rounded-xl p-4 w-52"
              style={{ background: '#fff', boxShadow: '0 12px 40px rgba(7,18,42,0.15)', border: '1px solid rgba(7,18,42,0.06)' }}>
              <p className="font-body text-xs text-gray-400 mb-2 uppercase tracking-wider">Live Enquiries Today</p>
              <p className="font-serif text-3xl font-bold" style={{ color: 'var(--navy)' }}>38</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="font-body text-xs text-emerald-600">+24% vs last week</span>
              </div>
            </motion.div>

            {/* Floating: WhatsApp auto-reply */}
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-6 top-1/3 rounded-xl p-4 w-56"
              style={{ background: '#fff', boxShadow: '0 12px 40px rgba(7,18,42,0.15)', border: '1px solid rgba(7,18,42,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(37,211,102,0.1)' }}>
                  <MessageCircle className="w-3.5 h-3.5" style={{ color: '#25D366' }} />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>WhatsApp Reply</p>
                  <p className="font-body text-xs" style={{ color: 'var(--text-soft)' }}>Sent in 28 seconds</p>
                </div>
              </div>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                "Thank you for your interest! Our team will call you shortly..."
              </p>
            </motion.div>

            {/* Floating: Site visits booked */}
            <motion.div
              animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -left-4 bottom-20 rounded-xl p-4 w-48"
              style={{ background: 'var(--gold)', boxShadow: '0 12px 40px rgba(212,175,55,0.3)' }}>
              <p className="font-body text-xs font-medium mb-1" style={{ color: 'rgba(7,18,42,0.6)' }}>Site Visits Booked</p>
              <p className="font-serif text-2xl font-bold" style={{ color: 'var(--navy)' }}>12 Today</p>
              <p className="font-body text-xs mt-1" style={{ color: 'rgba(7,18,42,0.5)' }}>Auto-confirmed via WhatsApp</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full flex items-start justify-center p-1"
          style={{ border: '1px solid rgba(212,175,55,0.25)' }}>
          <div className="w-1 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   2. PAIN POINTS — Ivory background, architectural feel
═══════════════════════════════════════════════════════════ */
const pains = [
  { icon: Clock, title: 'Leads wait hours for a response', desc: 'A buyer enquires at 2pm. Your team responds at 6pm. They\'ve already visited a competitor\'s project and are ready to book.' },
  { icon: AlertTriangle, title: 'Low-quality enquiries drain your team', desc: 'Meta campaigns bring tire-kickers and price-shoppers. Your sales team burns hours chasing leads who can never afford your inventory.' },
  { icon: MessageCircle, title: 'Enquiries lost on WhatsApp', desc: 'Hundreds of leads scattered across personal numbers with no system, no tracking, no follow-up protocol. Pure revenue leakage.' },
  { icon: BarChart3, title: 'High cost-per-lead, low site visits', desc: 'Spending ₹50,000/month and getting 3 site visits. The gap between enquiry and visit is where crores are quietly disappearing.' },
  { icon: Target, title: 'No pipeline visibility', desc: 'You don\'t know which project, ad, or area drives the best buyers. Every campaign decision is gut-feel, not data.' },
  { icon: Users, title: 'Leads go cold without nurture', desc: 'An interested buyer says they\'ll visit next weekend. No follow-up happens. 90 days later they\'ve bought from someone else.' },
]

function PainSection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'var(--ivory)' }}>
      <div className="absolute inset-0 dot-grid-light opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — copy */}
          <div className="lg:sticky lg:top-32">
            <R>
              <div className="eyebrow">The Reality Today</div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ color: 'var(--navy)' }}>
                Why Most Developers<br />
                Are Losing Leads<br />
                <em className="font-serif italic font-light" style={{ color: 'var(--gold-dim)' }}>
                  Every Single Day.
                </em>
              </h2>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
                These aren't edge cases. They're the daily reality for most real estate developers without a proper growth system in place.
              </p>
              <p className="font-body text-base leading-relaxed p-5 rounded-xl"
                style={{ background: 'var(--ivory-warm)', border: '1px solid rgba(7,18,42,0.06)', color: 'var(--text-muted)' }}>
                If even 3 of these feel familiar, you're conservatively losing{' '}
                <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>₹15–₹40 lakhs</strong>{' '}
                in potential inventory bookings every quarter.
              </p>
            </R>

            {/* Image placeholder: overwhelmed sales team */}
            <R d={0.2} className="mt-8">
              <ImgBox label="Sales team managing property enquiries / CRM screen" aspectRatio="16/9" />
            </R>
          </div>

          {/* Right — pain cards */}
          <div className="space-y-4">
            {pains.map((p, i) => {
              const Icon = p.icon
              return (
                <R key={p.title} d={i * 0.07}>
                  <div className="flex gap-5 p-6 rounded-xl group transition-all duration-300 hover:-translate-y-1"
                    style={{ background: '#fff', border: '1px solid rgba(7,18,42,0.05)',
                      boxShadow: '0 2px 16px rgba(7,18,42,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(7,18,42,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 16px rgba(7,18,42,0.05)')}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--ivory-warm)', border: '1px solid rgba(7,18,42,0.06)' }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: 'var(--gold-dim)' }} />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>
                        {p.title}
                      </h3>
                      <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </R>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   3. GROWTH SYSTEM — Navy bg, gold accents, clean flow
═══════════════════════════════════════════════════════════ */
const steps = [
  { n: '01', title: 'Meta & Google Ads',      sub: 'Targeted to active property buyers',    col: '#D4AF37' },
  { n: '02', title: 'Landing Page',           sub: 'Project-specific, conversion-focused',  col: '#E8CB6A' },
  { n: '03', title: 'WhatsApp Automation',    sub: 'Instant reply, AI qualification',        col: '#34D399' },
  { n: '04', title: 'CRM Pipeline',           sub: 'Every lead tracked, scored, assigned',   col: '#60A5FA' },
  { n: '05', title: 'Site Visit Booking',     sub: 'Automated scheduling & reminders',       col: '#D4AF37' },
  { n: '06', title: 'AI Nurture (90 Days)',   sub: 'Automated follow-up sequences',          col: '#A78BFA' },
  { n: '07', title: 'Sales Handoff',          sub: 'Qualified buyer ready to discuss',       col: '#E8CB6A' },
  { n: '08', title: 'Property Booking',       sub: 'Token, agreement, and sale',             col: '#34D399' },
]

function SystemSection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'var(--navy)' }}>
      <div className="absolute inset-0 dot-grid-dark opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
          <R>
            <div className="eyebrow" style={{ color: 'rgba(212,175,55,0.7)' }}>
              <span style={{ background: 'rgba(212,175,55,0.4)', display: 'inline-block', width: 28, height: 1 }} />
              Our System
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: 'var(--ivory)' }}>
              The Real Estate<br />
              <em className="italic font-light" style={{ color: 'var(--gold)' }}>
                Growth Engine
              </em>
            </h2>
          </R>
          <R d={0.15}>
            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(248,246,242,0.5)' }}>
              Not a loose set of disconnected services. A fully integrated, automated system where every step feeds the next — from first ad click to confirmed property booking.
            </p>
          </R>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {steps.map((s, i) => (
            <R key={s.n} d={i * 0.06}>
              <div className="relative p-6 rounded-xl h-full group transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.08)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = s.col + '40'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.08)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}>
                <div className="font-serif text-5xl font-bold leading-none mb-4"
                  style={{ color: s.col, opacity: 0.12 }}>{s.n}</div>
                <div className="w-6 h-px mb-4" style={{ background: s.col, opacity: 0.6 }} />
                <h3 className="font-body font-semibold text-sm mb-2" style={{ color: 'var(--ivory)' }}>{s.title}</h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(248,246,242,0.35)' }}>{s.sub}</p>
                {/* Arrow connector */}
                {i % 4 !== 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5" style={{ color: s.col, opacity: 0.35 }} />
                  </div>
                )}
              </div>
            </R>
          ))}
        </div>

        {/* CRM dashboard image placeholder */}
        <R d={0.3}>
          <ImgBox
            label="CRM pipeline dashboard / lead management system visual"
            aspectRatio="16/6"
            dark
            className="w-full"
            overlay={
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl"
                style={{ background: 'rgba(7,18,42,0.4)' }}>
                <div className="text-center">
                  <p className="font-body text-xs tracking-widest uppercase mb-2"
                    style={{ color: 'rgba(212,175,55,0.6)' }}>Replace with</p>
                  <p className="font-serif text-xl font-semibold" style={{ color: 'rgba(248,246,242,0.6)' }}>
                    CRM Dashboard / Lead Pipeline Visual
                  </p>
                </div>
              </div>
            }
          />
        </R>

        <R d={0.35} className="mt-8">
          <div className="p-7 rounded-xl text-center"
            style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}>
            <p className="font-serif text-xl font-light italic" style={{ color: 'rgba(248,246,242,0.7)' }}>
              "This entire system operates automatically — so your sales team speaks only to{' '}
              <strong className="font-semibold not-italic" style={{ color: 'var(--gold)' }}>
                qualified, interested buyers
              </strong>{' '}
              who are ready to visit your project site."
            </p>
          </div>
        </R>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   4. SERVICES — Ivory bg, image placeholders per service
═══════════════════════════════════════════════════════════ */
const services = [
  {
    n: '01', col: '#D4AF37',
    title: 'Property Lead Generation',
    desc: 'Precision Meta and Google campaigns targeting active property buyers within your project\'s catchment area. Every rupee tracked, every lead qualified.',
    outcomes: ['Lower cost-per-enquiry', 'Higher intent buyers', 'Project-specific creatives'],
    imgLabel: 'Meta Ads dashboard + property ad creative examples',
    imgRatio: '16/9',
  },
  {
    n: '02', col: '#34D399',
    title: 'WhatsApp Automation System',
    desc: 'Respond to every enquiry in under 2 minutes — automatically. AI qualification, instant catalogs, and follow-up sequences that never let a lead go cold.',
    outcomes: ['2-minute response time', '24/7 lead handling', 'Auto follow-up sequences'],
    imgLabel: 'WhatsApp conversation mockup showing AI responses and property catalog',
    imgRatio: '16/9',
  },
  {
    n: '03', col: '#60A5FA',
    title: 'CRM & Sales Pipeline',
    desc: 'Full visibility into every lead — where they came from, what they\'re interested in, and exactly where they are in the buying journey. No lead ever falls through.',
    outcomes: ['Real-time pipeline visibility', 'Sales accountability', 'Revenue forecasting'],
    imgLabel: 'CRM sales pipeline dashboard with lead tracking and metrics',
    imgRatio: '16/9',
  },
  {
    n: '04', col: '#F59E0B',
    title: 'Site Visit Booking Funnel',
    desc: 'A complete automated system that converts interested enquiries into confirmed site visits — with WhatsApp reminders, pre-visit nurturing, and no-show reduction.',
    outcomes: ['More confirmed visits', 'Fewer no-shows', 'Higher close rate'],
    imgLabel: 'Family / buyers visiting a residential project site / showflat',
    imgRatio: '16/9',
  },
  {
    n: '05', col: '#A78BFA',
    title: 'Retargeting & Re-Engagement',
    desc: 'Re-engage warm leads who showed interest but didn\'t convert. Systematic retargeting campaigns that bring buyers back at the right moment.',
    outcomes: ['Re-activate cold leads', 'Better ad ROI', 'Lower blended CPL'],
    imgLabel: 'Buyer journey visualization / retargeting funnel diagram',
    imgRatio: '16/9',
  },
  {
    n: '06', col: '#D4AF37',
    title: 'AI Follow-Up & Lead Nurturing',
    desc: '90-day automated nurturing sequences that keep your brand top-of-mind. Most property decisions take weeks or months — our system stays present throughout.',
    outcomes: ['90-day nurture sequences', 'Reactivate cold leads', 'Long-term conversion'],
    imgLabel: 'AI follow-up automation visual / lead nurture timeline',
    imgRatio: '16/9',
  },
]

function ServicesSection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'var(--ivory)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <R className="mb-16">
          <div className="eyebrow">Our Services</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--navy)' }}>
              Six Systems Built for<br />
              <em className="italic font-light" style={{ color: 'var(--gold-dim)' }}>Real Estate Revenue.</em>
            </h2>
            <p className="font-body text-base max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Every service measured by one outcome: qualified buyers at your project site.
            </p>
          </div>
        </R>

        <div className="space-y-6">
          {services.map((svc, i) => (
            <R key={svc.n} d={i * 0.05}>
              <div className="rounded-2xl overflow-hidden group transition-all duration-400"
                style={{ background: '#fff', border: '1px solid rgba(7,18,42,0.06)',
                  boxShadow: '0 2px 20px rgba(7,18,42,0.05)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(7,18,42,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 20px rgba(7,18,42,0.05)')}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Image placeholder */}
                  <div className="lg:col-span-2">
                    <ImgBox label={svc.imgLabel} aspectRatio={svc.imgRatio}
                      className="h-full rounded-none" rounded={false} />
                  </div>
                  {/* Content */}
                  <div className="lg:col-span-3 p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase"
                        style={{ color: svc.col }}>{svc.n}</span>
                      <div className="h-px flex-1" style={{ background: `${svc.col}30` }} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>
                      {svc.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                      {svc.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {svc.outcomes.map(o => (
                        <div key={o} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-medium"
                          style={{ background: `${svc.col}12`, color: svc.col, border: `1px solid ${svc.col}25` }}>
                          <CheckCircle className="w-3 h-3" />
                          {o}
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" data-cursor className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-colors duration-200"
                      style={{ color: 'var(--navy)' }}
                      onMouseEnter={e => ((e.target as HTMLElement).closest('a')!.style.color = svc.col)}
                      onMouseLeave={e => ((e.target as HTMLElement).closest('a')!.style.color = 'var(--navy)')}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   5. WHY CHOOSE US — Alternating ivory/warm sections
═══════════════════════════════════════════════════════════ */
const differentiators = [
  { icon: Zap,        stat: '2 min',  title: 'Speed-to-Lead Advantage',      desc: 'Our WhatsApp automation replies to every property enquiry in under 2 minutes — before any competitor can react. In real estate, the first responder wins.' },
  { icon: Building2,  stat: '100%',   title: 'Real Estate Specialists Only',  desc: 'We work exclusively with developers, plotting companies, and township projects. We understand RERA, site visit psychology, inventory pricing — not generic marketing.' },
  { icon: BarChart3,  stat: 'Full',   title: 'Complete Funnel Ownership',     desc: 'From the first ad impression to the site visit booking and post-visit follow-up — every step is tracked, measured, and optimized continuously.' },
  { icon: MessageCircle, stat: '90d', title: 'AI-Powered Lead Nurturing',    desc: 'Property buying decisions take weeks or months. Our AI follow-up sequences keep your brand present for 90 days — turning "not ready yet" into a confirmed booking.' },
  { icon: TrendingUp, stat: 'Live',   title: 'Real-Time Revenue Dashboards',  desc: 'Cost per enquiry, site visit conversion rate, ad ROI — all visible in a live dashboard. Every decision is backed by data, not gut-feel.' },
  { icon: Target,     stat: 'ROI',    title: 'Revenue Partner, Not Agency',   desc: 'We measure success by your bookings and site visits — not impressions or engagement rates. Your revenue growth is the only metric that matters.' },
]

function WhySection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'var(--navy)' }}>
      <div className="absolute inset-0 dot-grid-dark opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
          <R>
            <div className="eyebrow" style={{ color: 'rgba(212,175,55,0.7)' }}>Why Us</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--ivory)' }}>
              We're Not a Marketing Agency.<br />
              <em className="italic font-light gold-text">We're Your Revenue Partner.</em>
            </h2>
          </R>
          <R d={0.15} className="flex flex-col justify-end">
            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(248,246,242,0.5)' }}>
              Traditional agencies optimize for impressions. We optimize for property bookings. Every decision we make is evaluated against one question: does this bring more qualified buyers to your site?
            </p>
          </R>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {differentiators.map((d, i) => {
            const Icon = d.icon
            return (
              <R key={d.title} d={i * 0.07}>
                <div className="p-7 rounded-xl h-full group transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.08)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.055)'
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.08)'
                  }}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: 'var(--gold)' }} />
                    </div>
                    <span className="font-serif text-2xl font-bold gold-text">{d.stat}</span>
                  </div>
                  <h3 className="font-body font-semibold mb-3" style={{ color: 'var(--ivory)' }}>{d.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(248,246,242,0.4)' }}>{d.desc}</p>
                </div>
              </R>
            )
          })}
        </div>

        {/* Nagpur local positioning image */}
        <R d={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <ImgBox
              label="Nagpur skyline / MIHAN aerial view / regional township development"
              aspectRatio="4/3"
              dark
            />
            <div className="p-8">
              <div className="eyebrow" style={{ color: 'rgba(212,175,55,0.6)' }}>Local Expertise</div>
              <h3 className="font-serif text-3xl font-bold mb-5" style={{ color: 'var(--ivory)' }}>
                Helping Developers Across<br />
                <em className="italic font-light" style={{ color: 'var(--gold)' }}>Nagpur & India</em><br />
                Generate More Buyer Leads.
              </h3>
              <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(248,246,242,0.5)' }}>
                We started in Nagpur because we saw how much potential the region's real estate market had — and how poorly served most developers were by generic marketing agencies. Today we serve developers across Maharashtra and pan-India.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                <span className="font-body text-sm" style={{ color: 'rgba(212,175,55,0.7)' }}>
                  Based in Nagpur · Operating pan-India
                </span>
              </div>
            </div>
          </div>
        </R>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   6. CASE STUDIES — Ivory bg, editorial/premium style
═══════════════════════════════════════════════════════════ */
const cases = [
  {
    project: 'Residential Township — Nagpur',
    tag: 'Meta Ads + WhatsApp Automation',
    result: '214 qualified property enquiries in 30 days',
    col: '#D4AF37',
    imgLabel: 'Township project aerial view / project site image',
    metrics: [
      { l: 'Qualified Enquiries', v: '214', d: '+180%' },
      { l: 'Site Visits Booked', v: '38', d: '+47%' },
      { l: 'Cost Per Enquiry', v: '₹320', d: '-62%' },
    ],
  },
  {
    project: 'Plotting Scheme — Wardha Road',
    tag: 'WhatsApp AI + CRM Pipeline',
    result: 'Response time reduced from 3 hours to under 2 minutes',
    col: '#34D399',
    imgLabel: 'Plotting layout map / aerial township view',
    metrics: [
      { l: 'Avg Response Time', v: '< 2 min', d: '-95%' },
      { l: 'Leads Nurtured', v: '890', d: '90 days' },
      { l: 'Site Visits', v: '+55%', d: 'vs prior' },
    ],
  },
  {
    project: 'Premium Villa Project — Nagpur',
    tag: 'Full Funnel Growth System',
    result: '8.4x return on ad spend within 60 days',
    col: '#A78BFA',
    imgLabel: 'Premium villa exterior / luxury residential project photography',
    metrics: [
      { l: 'Total Ad Spend', v: '₹1.8L', d: '60 days' },
      { l: 'Bookings Confirmed', v: '12', d: 'Units' },
      { l: 'ROI on Ad Spend', v: '8.4x', d: 'Verified' },
    ],
  },
]

function CaseStudiesSection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'var(--ivory-warm)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <R className="mb-16">
          <div className="eyebrow">Results</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--navy)' }}>
              Real Numbers.<br />
              <em className="italic font-light" style={{ color: 'var(--gold-dim)' }}>Real Developers.</em>
            </h2>
            <p className="font-body text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Representative results. Actual project data shared during your free growth audit.
            </p>
          </div>
        </R>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <R key={c.project} d={i * 0.1}>
              <div className="rounded-2xl overflow-hidden h-full group transition-all duration-400"
                style={{ background: '#fff', border: '1px solid rgba(7,18,42,0.06)',
                  boxShadow: '0 2px 20px rgba(7,18,42,0.06)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 48px rgba(7,18,42,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 20px rgba(7,18,42,0.06)')}>
                {/* Project image */}
                <ImgBox label={c.imgLabel} aspectRatio="16/9" rounded={false}
                  overlay={
                    <div className="absolute top-4 left-4">
                      <span className="font-body text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: '#fff', color: c.col, border: `1px solid ${c.col}30` }}>
                        {c.tag}
                      </span>
                    </div>
                  }
                />
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-soft)' }} />
                    <span className="font-body text-xs" style={{ color: 'var(--text-soft)' }}>{c.project}</span>
                  </div>
                  <p className="font-serif text-lg font-semibold mb-5 leading-snug" style={{ color: 'var(--navy)' }}>
                    "{c.result}"
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-5"
                    style={{ borderTop: '1px solid rgba(7,18,42,0.06)' }}>
                    {c.metrics.map(m => (
                      <div key={m.l} className="text-center">
                        <div className="font-serif text-xl font-bold mb-0.5" style={{ color: c.col }}>{m.v}</div>
                        <div className="font-body text-xs mb-0.5" style={{ color: 'var(--text-soft)' }}>{m.l}</div>
                        <div className="font-body text-xs font-medium" style={{ color: c.col }}>{m.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   7. FAQ
═══════════════════════════════════════════════════════════ */
const faqs = [
  { q: 'Do you work with all types of real estate projects?', a: 'We work exclusively with real estate — residential developments, plotting schemes, villa projects, and townships across India. We understand property funnels, RERA compliance, and buyer psychology deeply.' },
  { q: 'How quickly will we see more qualified enquiries?', a: 'Most developers see a meaningful improvement in enquiry quality and volume within the first 2–3 weeks. Full funnel results — site visit conversion and lead nurturing — show strong improvement by 60 days.' },
  { q: 'What separates you from a regular digital marketing agency?', a: 'We exclusively serve real estate. We understand site visit funnels, property inventory pricing, buyer timelines, and RERA-safe marketing — things a generic agency doesn\'t know. Our entire system is built to get buyers to your site, not just generate clicks.' },
  { q: 'Do we need an existing CRM to work with you?', a: 'No. We set up and manage the entire CRM pipeline for you. If you already use a CRM, we integrate with it seamlessly and train your sales team on the dashboards.' },
  { q: 'What is the recommended monthly ad budget?', a: 'We recommend a minimum ad spend of ₹40,000–₹60,000/month for meaningful results. We optimize every rupee across Meta and Google to minimize cost-per-qualified-enquiry.' },
  { q: 'How does the WhatsApp automation actually work?', a: 'When a lead submits a form or enquires via any channel, our system sends an automatic WhatsApp message within 30–60 seconds. AI then qualifies them (budget, timeline, preferred location) and assigns them to the right salesperson — all before your team needs to make a single call.' },
]

function FAQSection() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section className="relative py-28" style={{ background: 'var(--ivory)' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <R className="text-center mb-16">
          <div className="eyebrow">Frequently Asked</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: 'var(--navy)' }}>
            Questions Developers<br />
            <em className="italic font-light" style={{ color: 'var(--gold-dim)' }}>Always Ask Us</em>
          </h2>
        </R>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <R key={i} d={i * 0.05}>
              <div className="rounded-xl overflow-hidden transition-all duration-300"
                style={{ background: '#fff', border: open === i ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(7,18,42,0.06)',
                  boxShadow: open === i ? '0 4px 24px rgba(212,175,55,0.08)' : '0 2px 12px rgba(7,18,42,0.04)' }}>
                <button className="w-full flex items-center justify-between p-6 text-left" data-cursor
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="font-body font-medium pr-4" style={{ color: 'var(--navy)', fontSize: 15 }}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                    className="flex-shrink-0">
                    <ChevronDown className="w-5 h-5" style={{ color: 'var(--gold-dim)' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="px-6 pb-6 font-body text-sm leading-relaxed"
                        style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(7,18,42,0.05)', paddingTop: 16 }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   8. FINAL CTA — Navy bg, image placeholder, strong copy
═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--navy)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left — image placeholder */}
        <ImgBox
          label="Developer meeting / project walkthrough / architecture consultation scene"
          aspectRatio="auto"
          dark
          className="min-h-[400px] lg:min-h-full rounded-none"
          overlay={
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 60%, rgba(7,18,42,0.5) 100%)' }} />
          }
        />

        {/* Right — CTA copy */}
        <div className="flex flex-col justify-center p-12 lg:p-16">
          <R>
            <div className="eyebrow" style={{ color: 'rgba(212,175,55,0.6)' }}>Get Started</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ color: 'var(--ivory)' }}>
              Ready to Fill Your<br />
              <em className="italic gold-text">Sales Pipeline?</em>
            </h2>
            <p className="font-body text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(248,246,242,0.5)' }}>
              Book a free 30-minute Growth Audit. We'll analyse your current lead generation setup, identify where buyers are dropping off, and show you exactly how many more qualified enquiries you could be getting each month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact" data-cursor className="btn-gold">
                <span>Book Free Growth Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/91XXXXXXXXXX" data-cursor className="btn-outline-light">
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3 pt-8"
              style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}>
              {[
                '✓ No lock-in contracts',
                '✓ Real estate specialists',
                '✓ Results visible in 30 days',
                '✓ Based in Nagpur',
              ].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <span className="font-body text-sm" style={{ color: 'rgba(248,246,242,0.35)' }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-6 mt-8">
              <a href="tel:+91XXXXXXXXXX" data-cursor
                className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
                style={{ color: 'rgba(248,246,242,0.35)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.35)')}>
                <Phone className="w-4 h-4" /> +91 XX XXXX XXXX
              </a>
              <a href="mailto:hello@commandgrowth.org" data-cursor
                className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
                style={{ color: 'rgba(248,246,242,0.35)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.35)')}>
                hello@commandgrowth.org
              </a>
            </div>
          </R>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   PAGE ASSEMBLY
═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainSection />
      <SystemSection />
      <ServicesSection />
      <WhySection />
      <CaseStudiesSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
