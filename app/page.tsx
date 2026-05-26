'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, ChevronDown, MessageCircle,
  BarChart3, Zap, Clock, MapPin, Building2, TrendingUp,
  Users, Phone, AlertTriangle, Target, Shield, Award
} from 'lucide-react'

/* ─── Motion reveal ─────────────────────────────────────── */
function R({ c = '', d = 0, dir = 'up', children }: {
  c?: string; d?: number; dir?: 'up'|'left'|'right'; children: React.ReactNode
}) {
  const ref = useRef(null)
  const v   = useInView(ref, { once: true, margin: '-40px' })
  const ini = dir === 'left' ? { opacity:0, x:-28 } : dir === 'right' ? { opacity:0, x:28 } : { opacity:0, y:28 }
  return (
    <motion.div ref={ref} initial={ini}
      animate={v ? { opacity:1, x:0, y:0 } : {}}
      transition={{ duration:0.85, delay:d, ease:[0.22,1,0.36,1] }}
      className={c}>
      {children}
    </motion.div>
  )
}

/* ─── Image placeholder ─────────────────────────────────── */
function Img({
  label, ratio = '4/3', dark = false, cls = '', radius = true, children
}: {
  label: string; ratio?: string; dark?: boolean
  cls?: string; radius?: boolean; children?: React.ReactNode
}) {
  return (
    <div
      className={`${dark ? 'img-ph-dark' : 'img-ph'} relative overflow-hidden ${radius ? 'rounded-xl' : ''} ${cls}`}
      style={{ aspectRatio: ratio }}
      data-label={label}
    >
      {/* Architectural placeholder graphic */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: dark ? 0.06 : 0.05 }}>
        <div className="absolute" style={{
          inset: '12%',
          border: `1px solid ${dark ? 'rgba(201,168,76,1)' : 'rgba(7,18,42,1)'}`,
        }} />
        <Building2 style={{
          width: 48, height: 48,
          color: dark ? 'rgba(201,168,76,1)' : 'rgba(7,18,42,1)',
        }} />
      </div>
      {children}
    </div>
  )
}

/* ─── Section header ────────────────────────────────────── */
function SectionHead({ eye, h, sub, light = false, center = false }: {
  eye: string; h: React.ReactNode; sub?: string; light?: boolean; center?: boolean
}) {
  return (
    <R c={center ? 'text-center' : ''}>
      <div className={light ? 'eyebrow-light' : 'eyebrow'}>{eye}</div>
      <h2 className="font-serif font-bold leading-tight mb-5"
        style={{
          fontSize: 'clamp(36px, 4.5vw, 60px)',
          color: light ? 'var(--ivory)' : 'var(--navy)',
          letterSpacing: '-0.01em',
        }}>
        {h}
      </h2>
      {sub && (
        <p className="font-body text-lg leading-relaxed max-w-xl"
          style={{ color: light ? 'rgba(248,246,242,0.5)' : 'var(--muted)', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: sub }} />
      )}
    </R>
  )
}

/* ═══════════════════════════════════════════════════════
   FLAGSHIP SYSTEM NAME
   "The Command Growth Real Estate Engine™"
═══════════════════════════════════════════════════════ */
const SYSTEM = 'The Real Estate Revenue Engine™'

/* ═══════════════════════════════════════════════════════
   1. HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--navy)' }}>

      {/* Texture — architectural diagonal lines only, no glow blobs */}
      <div className="absolute inset-0 texture-lines-dark" />
      <div className="absolute inset-0 grid-dots-dark" style={{ opacity: 0.35 }} />

      {/* Single subtle left gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px line-gold-v opacity-20" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT — copy (7 cols) */}
          <div className="lg:col-span-7">
            {/* Pill badge */}
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6 }}
              className="inline-flex items-center gap-3 mb-10 px-4 py-2"
              style={{
                border: '1px solid rgba(201,168,76,0.2)',
                background: 'rgba(201,168,76,0.06)',
                borderRadius: 3,
              }}>
              <div style={{
                width:6, height:6, borderRadius:'50%',
                background:'var(--gold)', flexShrink:0,
              }} />
              <span className="font-body text-xs font-medium tracking-[0.24em] uppercase"
                style={{ color:'rgba(201,168,76,0.8)' }}>
                Real Estate Lead Generation · Nagpur & India
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity:0, y:44 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:1, delay:0.12, ease:[0.22,1,0.36,1] }}
              className="font-serif font-bold mb-7"
              style={{
                fontSize: 'clamp(44px, 5.8vw, 80px)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                color: 'var(--ivory)',
              }}>
              Turn Property<br />
              Enquiries Into<br />
              <em className="not-italic" style={{ color:'var(--gold)' }}>
                Site Visits & Sales.
              </em>
            </motion.h1>

            {/* Sub */}
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.38 }}
              className="font-body text-lg leading-relaxed mb-10 max-w-md"
              style={{ color:'rgba(248,246,242,0.52)', lineHeight:1.75 }}>
              Meta Ads · WhatsApp Automation · CRM Pipeline · AI Follow-Up System.{' '}
              <strong style={{ color:'rgba(248,246,242,0.75)', fontWeight:500 }}>
                {SYSTEM}
              </strong>{' '}
              — built exclusively for developers and plotting companies.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.52 }}
              className="flex flex-wrap gap-4 mb-14">
              <Link href="/contact" data-cursor className="btn-gold">
                <span>Book Free Growth Audit</span>
                <ArrowRight style={{ width:16, height:16 }} />
              </Link>
              <Link href="/services" data-cursor className="btn-outline-ivory">
                <span>View Lead Strategy</span>
              </Link>
            </motion.div>

            {/* Trust metrics bar */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-7"
              style={{ borderTop:'1px solid rgba(201,168,76,0.12)' }}>
              {[
                { v:'214+',   l:'Leads / Month'       },
                { v:'2 min',  l:'Avg. Response Time'  },
                { v:'47%',    l:'More Site Visits'    },
                { v:'₹10Cr+', l:'Ad Spend Managed'    },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div className="font-serif font-bold text-2xl gold-text leading-none mb-1">{v}</div>
                  <div className="font-body text-xs" style={{ color:'rgba(248,246,242,0.32)', letterSpacing:'0.05em' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — property image + floating metrics (5 cols) */}
          <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:1, delay:0.3, ease:[0.22,1,0.36,1] }}
            className="lg:col-span-5 hidden lg:block relative">

            {/* Main property image */}
            <Img
              label="Luxury residential project / township aerial photography"
              ratio="4/5" dark cls="w-full"
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 rounded-xl"
                style={{ background:'linear-gradient(180deg, transparent 45%, rgba(7,18,42,0.85) 100%)' }} />
              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-body text-xs tracking-[0.2em] uppercase mb-1.5"
                  style={{ color:'rgba(201,168,76,0.65)' }}>Featured Project</p>
                <p className="font-serif text-xl font-semibold" style={{ color:'var(--ivory)' }}>
                  Township Development · Nagpur
                </p>
              </div>
            </Img>

            {/* Floating card 1 — live enquiries */}
            <motion.div
              animate={{ y:[0,-6,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              className="absolute -left-10 top-14 w-48 p-4 rounded-xl"
              style={{ background:'var(--white)', boxShadow:'var(--shadow-md)' }}>
              <p className="font-body text-xs mb-2" style={{ color:'var(--soft)', letterSpacing:'0.05em' }}>
                Live Enquiries Today
              </p>
              <p className="font-serif text-3xl font-bold" style={{ color:'var(--navy)', lineHeight:1 }}>38</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <TrendingUp style={{ width:12, height:12, color:'#10B981' }} />
                <span className="font-body text-xs" style={{ color:'#10B981' }}>+24% this week</span>
              </div>
            </motion.div>

            {/* Floating card 2 — whatsapp response */}
            <motion.div
              animate={{ y:[0,7,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut', delay:1.2 }}
              className="absolute -right-8 top-1/3 w-52 p-4 rounded-xl"
              style={{ background:'var(--white)', boxShadow:'var(--shadow-md)' }}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(16,185,129,0.1)' }}>
                  <MessageCircle style={{ width:14, height:14, color:'#10B981' }} />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold" style={{ color:'var(--navy)' }}>Auto WhatsApp Sent</p>
                  <p className="font-body text-xs" style={{ color:'var(--soft)' }}>28 seconds after enquiry</p>
                </div>
              </div>
              <p className="font-body text-xs leading-relaxed" style={{ color:'var(--muted)' }}>
                "Thank you for your interest in our project. Our team will call you shortly..."
              </p>
            </motion.div>

            {/* Floating card 3 — site visits gold */}
            <motion.div
              animate={{ y:[0,-5,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut', delay:2.2 }}
              className="absolute -left-6 bottom-24 w-46 p-4 rounded-xl"
              style={{ background:'var(--gold)', boxShadow:'0 8px 32px rgba(201,168,76,0.25)' }}>
              <p className="font-body text-xs font-medium mb-1" style={{ color:'rgba(7,18,42,0.6)' }}>
                Site Visits Booked
              </p>
              <p className="font-serif text-2xl font-bold" style={{ color:'var(--navy)', lineHeight:1 }}>
                12 Today
              </p>
              <p className="font-body text-xs mt-1" style={{ color:'rgba(7,18,42,0.5)' }}>
                Auto-confirmed via WhatsApp
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll nudge */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div animate={{ y:[0,5,0] }} transition={{ duration:1.6, repeat:Infinity }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border:'1px solid rgba(201,168,76,0.25)' }}>
          <div className="w-1 h-2 rounded-full" style={{ background:'var(--gold)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   2. PAIN POINTS — Ivory bg, no glow
═══════════════════════════════════════════════════════ */
const pains = [
  { icon: Clock,        t: 'Leads wait hours for a response',    d: 'A buyer enquires at 2pm. Your team calls at 6pm. They\'ve already visited a competitor\'s site and are ready to book.' },
  { icon: AlertTriangle,t: 'Low-quality enquiries waste your team', d: 'Meta campaigns attract price-shoppers. Your sales team burns hours on leads who can never afford your inventory.' },
  { icon: MessageCircle,t: 'Enquiries lost across WhatsApp numbers', d: 'Leads scattered across personal numbers with no tracking, no system, no follow-up protocol. Pure revenue leakage.' },
  { icon: BarChart3,    t: 'High ad spend, very few site visits',  d: 'Spending ₹50,000/month and getting 3 site visits. The gap between enquiry and visit is where crores disappear silently.' },
  { icon: Target,       t: 'No clarity on which campaigns work',   d: 'You don\'t know which project, ad, or area drives the best buyers. Every decision is gut-feel, not live data.' },
  { icon: Users,        t: 'Warm leads go cold without nurturing', d: 'An interested buyer says they\'ll visit next weekend. No follow-up happens. 90 days later they\'ve bought elsewhere.' },
]

function Pains() {
  return (
    <section style={{ background:'var(--ivory)', paddingTop:120, paddingBottom:120 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left — sticky copy */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionHead
              eye="The Reality Today"
              h={<>Why Most Developers<br />Lose Leads<br /><em className="font-serif italic font-light" style={{ color:'var(--gold-dim)' }}>Every Single Day.</em></>}
              sub="These aren't edge cases. They're the daily reality for most developers without a proper growth system."
            />
            <R d={0.15} c="mt-8">
              <div className="p-6 rounded-xl" style={{ background:'var(--ivory-warm)', border:'1px solid var(--border-light)' }}>
                <p className="font-body text-sm leading-relaxed" style={{ color:'var(--muted)' }}>
                  If even 3 of these feel familiar, you're conservatively losing{' '}
                  <strong style={{ color:'var(--navy)' }}>₹15–₹40 lakhs</strong>{' '}
                  in potential bookings every quarter — silently, invisibly.
                </p>
              </div>
            </R>
            {/* Image: sales team */}
            <R d={0.25} c="mt-6">
              <Img label="Sales team managing property enquiries — replace with actual photo" ratio="16/10" />
            </R>
          </div>

          {/* Right — pain cards */}
          <div className="lg:col-span-7 space-y-3">
            {pains.map((p, i) => {
              const Icon = p.icon
              return (
                <R key={p.t} d={i * 0.06}>
                  <div className="flex gap-5 p-6 rounded-xl group card-white">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background:'var(--ivory-warm)', border:'1px solid var(--border-light)' }}>
                      <Icon style={{ width:18, height:18, color:'var(--gold-dim)' }} />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold mb-1.5"
                        style={{ color:'var(--navy)', fontSize:15 }}>{p.t}</h3>
                      <p className="font-body text-sm leading-relaxed" style={{ color:'var(--muted)' }}>{p.d}</p>
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

/* ═══════════════════════════════════════════════════════
   3. FLAGSHIP SYSTEM — Navy bg, clean funnel steps
═══════════════════════════════════════════════════════ */
const steps = [
  { n:'01', t:'Meta & Google Ads',     s:'Targeted to active property buyers',    c:'#C9A84C' },
  { n:'02', t:'Conversion Landing Page',s:'Project-specific, mobile-first',       c:'#DFC06E' },
  { n:'03', t:'WhatsApp Automation',   s:'Instant AI reply in under 2 minutes',   c:'#34D399' },
  { n:'04', t:'Lead Qualification',    s:'Budget · Timeline · Location filters',  c:'#60A5FA' },
  { n:'05', t:'CRM Pipeline',          s:'Every lead tracked, scored, assigned',  c:'#C9A84C' },
  { n:'06', t:'Site Visit Booking',    s:'Automated scheduling & reminders',      c:'#DFC06E' },
  { n:'07', t:'AI Nurture (90 Days)',  s:'Sequences for long-cycle buyers',       c:'#A78BFA' },
  { n:'08', t:'Property Booking',      s:'Token, agreement, confirmed sale',      c:'#34D399' },
]

function System() {
  return (
    <section style={{ background:'var(--navy)', paddingTop:120, paddingBottom:120 }}>
      <div className="absolute left-0 right-0 h-px line-gold-h opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <SectionHead light eye="Our System"
            h={<>{SYSTEM}</>}
          />
          <R d={0.1} c="flex items-end">
            <p className="font-body text-lg leading-relaxed"
              style={{ color:'rgba(248,246,242,0.48)', lineHeight:1.75 }}>
              Not a collection of disconnected services. One integrated system where every step feeds the next — from the first ad impression to a confirmed property booking.
            </p>
          </R>
        </div>

        {/* System steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {steps.map((s, i) => (
            <R key={s.n} d={i * 0.055}>
              <div className="card-navy-hover p-6 h-full relative group">
                <div className="font-serif text-5xl font-bold leading-none mb-4"
                  style={{ color:s.c, opacity:0.1 }}>{s.n}</div>
                <div className="w-5 h-px mb-4" style={{ background:s.c, opacity:0.6 }} />
                <h3 className="font-body font-semibold text-sm mb-2" style={{ color:'var(--ivory)', fontSize:13 }}>{s.t}</h3>
                <p className="font-body text-xs leading-relaxed" style={{ color:'rgba(248,246,242,0.35)' }}>{s.s}</p>
                {/* Arrow between steps in a row */}
                {i % 4 !== 3 && i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight style={{ width:14, height:14, color:s.c, opacity:0.3 }} />
                  </div>
                )}
              </div>
            </R>
          ))}
        </div>

        {/* System image placeholder */}
        <R d={0.3}>
          <Img
            label="CRM pipeline / lead management dashboard — replace with actual screenshot"
            ratio="21/6" dark radius cls="w-full"
          >
            <div className="absolute inset-0 rounded-xl flex items-center justify-center"
              style={{ background:'rgba(7,18,42,0.45)' }}>
              <p className="font-serif text-lg italic" style={{ color:'rgba(248,246,242,0.4)' }}>
                CRM Dashboard Placeholder
              </p>
            </div>
          </Img>
        </R>

        {/* System summary callout */}
        <R d={0.35}>
          <div className="mt-8 p-8 rounded-xl"
            style={{ background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.16)' }}>
            <p className="font-serif text-xl font-light italic text-center"
              style={{ color:'rgba(248,246,242,0.68)', lineHeight:1.6, maxWidth:720, margin:'0 auto' }}>
              "This entire engine operates automatically — so your sales team speaks only to{' '}
              <strong className="font-semibold not-italic" style={{ color:'var(--gold)' }}>
                qualified, interested buyers
              </strong>{' '}
              who are already ready to visit your project site."
            </p>
          </div>
        </R>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   4. SERVICES — Ivory bg, image per service, clean
═══════════════════════════════════════════════════════ */
const svcs = [
  {
    n:'01', col:'#C9A84C',
    t: 'Property Lead Generation',
    d: 'Precision Meta and Google campaigns targeting active property buyers in your project\'s catchment area. Every rupee tracked. Every lead qualified. CPL benchmarked against your target buyer profile.',
    out: ['Lower cost per qualified enquiry', 'Higher buyer intent', 'Project-specific ad creatives'],
    img: 'Meta Ads dashboard + property creative examples — replace with actual screenshot',
    metric: '₹280–₹450 avg. CPL',
  },
  {
    n:'02', col:'#34D399',
    t: 'WhatsApp Automation & AI Response',
    d: 'Every enquiry receives an automatic WhatsApp reply in under 2 minutes — 24/7. AI qualification identifies budget, timeline, and preferred location before your team makes a single call.',
    out: ['2-minute speed-to-lead', '24/7 lead coverage', 'Instant AI qualification'],
    img: 'WhatsApp conversation with AI auto-responses — replace with actual screenshot',
    metric: '< 2 min response time',
  },
  {
    n:'03', col:'#60A5FA',
    t: 'CRM & Sales Pipeline',
    d: 'Full pipeline visibility from first enquiry to booking. Every lead tracked, scored, and assigned. Your sales team sees exactly which leads are hot, warm, or cold — with no manual data entry.',
    out: ['Real-time pipeline visibility', 'Lead scoring & assignment', 'Sales team accountability'],
    img: 'CRM pipeline dashboard with lead stages and metrics — replace with actual screenshot',
    metric: '100% pipeline visibility',
  },
  {
    n:'04', col:'#F59E0B',
    t: 'Site Visit Booking Funnel',
    d: 'A complete automated system that converts warm enquiries into confirmed site visits. WhatsApp confirmations, pre-visit project briefs, reminders, and post-visit follow-ups — all automated.',
    out: ['More confirmed visits', 'Fewer no-shows', 'Post-visit nurture sequences'],
    img: 'Buyers visiting a residential project showflat — replace with actual photo',
    metric: '+47% site visit rate',
  },
  {
    n:'05', col:'#A78BFA',
    t: 'Retargeting & Re-Engagement',
    d: 'Systematically re-engage warm leads who showed interest but didn\'t convert. Layered retargeting across Meta and Google brings buyers back at the right moment in their decision journey.',
    out: ['Re-activate cold leads', 'Lower blended CPL', 'Better overall ad ROI'],
    img: 'Buyer journey / retargeting funnel visualization — replace with actual graphic',
    metric: '3.2x retargeting ROAS',
  },
  {
    n:'06', col:'#C9A84C',
    t: 'AI Follow-Up & Lead Nurturing',
    d: 'Property buying decisions take weeks or months. Our 90-day AI nurturing sequences keep your project top-of-mind — turning "not ready yet" into a confirmed booking when the timing is right.',
    out: ['90-day nurture sequences', 'Long-cycle buyer conversion', 'Reactivate 6-month-old leads'],
    img: 'AI automation flow / lead nurture timeline visualization — replace with actual graphic',
    metric: '90-day nurture window',
  },
]

function Services() {
  return (
    <section style={{ background:'var(--ivory)', paddingTop:120, paddingBottom:120 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHead eye="Our Services"
            h={<>Six Components of<br /><em className="font-serif italic font-light" style={{ color:'var(--gold-dim)' }}>{SYSTEM}</em></>}
          />
          <R d={0.1} c="max-w-xs md:text-right pb-6">
            <p className="font-body text-sm leading-relaxed" style={{ color:'var(--muted)' }}>
              Every service is a component of one integrated system — not a standalone offering.
            </p>
          </R>
        </div>

        <div className="space-y-5">
          {svcs.map((s, i) => (
            <R key={s.n} d={i * 0.05}>
              <div className="rounded-xl overflow-hidden card-white group"
                style={{ transition:'box-shadow 0.35s ease' }}>
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Image — 2 cols */}
                  <div className="lg:col-span-2">
                    <Img label={s.img} ratio="16/10" radius={false} cls="h-full" />
                  </div>
                  {/* Content — 3 cols */}
                  <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <span className="font-body text-xs font-semibold tracking-[0.22em] uppercase"
                          style={{ color:s.col }}>{s.n}</span>
                        <div className="h-px flex-1" style={{ background:`${s.col}25` }} />
                        <span className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ background:`${s.col}12`, color:s.col, border:`1px solid ${s.col}20` }}>
                          {s.metric}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold mb-4" style={{ color:'var(--navy)', lineHeight:1.2 }}>
                        {s.t}
                      </h3>
                      <p className="font-body text-sm leading-relaxed mb-6" style={{ color:'var(--muted)', lineHeight:1.75 }}>
                        {s.d}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {s.out.map(o => (
                          <div key={o} className="flex items-center gap-2 text-xs font-body font-medium px-3 py-1.5 rounded-full"
                            style={{ background:`${s.col}10`, color:s.col, border:`1px solid ${s.col}20` }}>
                            <CheckCircle style={{ width:11, height:11 }} />
                            {o}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href="/contact" data-cursor
                      className="inline-flex items-center gap-2 font-body text-sm font-semibold ul-gold w-fit"
                      style={{ color:'var(--navy)' }}>
                      Learn More <ArrowRight style={{ width:14, height:14 }} />
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

/* ═══════════════════════════════════════════════════════
   5. WHY US — Navy bg, clean differentiators
═══════════════════════════════════════════════════════ */
const diffs = [
  { icon:Zap,       stat:'2 min',  t:'Speed-to-Lead Advantage',      d:'Our system replies to every property enquiry in under 2 minutes — before any competitor reacts. In real estate, first response wins the buyer.' },
  { icon:Building2, stat:'100%',   t:'Real Estate Specialists Only',  d:'We work exclusively with developers, plotting companies, and township projects. We understand site visit funnels, RERA, and buyer psychology — not generic marketing.' },
  { icon:BarChart3, stat:'Live',   t:'Full-Funnel Revenue Visibility', d:'Cost per enquiry, site visit rate, nurture conversion — all in a live dashboard. Every campaign decision is backed by real data, never gut-feel.' },
  { icon:MessageCircle, stat:'90d', t:'AI-Powered Lead Nurturing',   d:'Property decisions take weeks or months. Our 90-day AI sequences keep your brand present throughout the buyer\'s journey — converting hesitation into bookings.' },
  { icon:Shield,    stat:'Zero',   t:'No Lock-In Contracts',          d:'We earn your business every month by delivering measurable results. No 12-month lock-ins, no exit penalties. Pure performance-based partnership.' },
  { icon:Target,    stat:'ROI',    t:'Revenue Partner, Not Agency',   d:'We measure our success by your property bookings and site visits — not impressions, reach, or follower counts. Your revenue is our only KPI.' },
]

function WhyUs() {
  return (
    <section style={{ background:'var(--navy)', paddingTop:120, paddingBottom:120 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
          <SectionHead light eye="Why Us"
            h={<>We're Not an Agency.<br /><em className="italic font-light gold-text">We're Your Revenue Partner.</em></>}
          />
          <R d={0.1} c="lg:flex items-end">
            <p className="font-body text-lg leading-relaxed" style={{ color:'rgba(248,246,242,0.45)', lineHeight:1.75 }}>
              Traditional agencies optimize for impressions and brand awareness. We optimize for one thing: qualified property buyers walking into your project site and signing tokens.
            </p>
          </R>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {diffs.map((d, i) => {
            const Icon = d.icon
            return (
              <R key={d.t} d={i * 0.07}>
                <div className="card-navy-hover p-7 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background:'rgba(201,168,76,0.09)', border:'1px solid rgba(201,168,76,0.15)' }}>
                      <Icon style={{ width:18, height:18, color:'var(--gold)' }} />
                    </div>
                    <span className="font-serif text-2xl font-bold gold-text">{d.stat}</span>
                  </div>
                  <h3 className="font-body font-semibold mb-3" style={{ color:'var(--ivory)', fontSize:14 }}>{d.t}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color:'rgba(248,246,242,0.38)', lineHeight:1.75 }}>{d.d}</p>
                </div>
              </R>
            )
          })}
        </div>

        {/* Nagpur local section with image */}
        <R d={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8 rounded-xl"
            style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,168,76,0.12)' }}>
            <Img
              label="Nagpur skyline / MIHAN zone / regional township development — replace with actual photo"
              ratio="16/10" dark
            />
            <div className="flex flex-col justify-center py-4 lg:py-0 lg:pl-4">
              <div className="eyebrow-light">Local Expertise</div>
              <h3 className="font-serif text-3xl font-bold mb-5 leading-tight" style={{ color:'var(--ivory)' }}>
                Built for Nagpur's<br />
                <em className="italic font-light" style={{ color:'var(--gold)' }}>Growing Real Estate Market.</em>
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color:'rgba(248,246,242,0.45)', lineHeight:1.75 }}>
                We started in Nagpur because the region's real estate market — Wardha Road, MIHAN, Hingna, Butibori — has extraordinary potential, but developers were severely underserved by generic agencies. Today we serve developers across Maharashtra and pan-India.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <MapPin style={{ width:14, height:14, color:'var(--gold)', flexShrink:0 }} />
                <span className="font-body text-xs tracking-[0.1em]" style={{ color:'rgba(201,168,76,0.65)' }}>
                  Based in Nagpur · Operating across India
                </span>
              </div>
            </div>
          </div>
        </R>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   6. FOUNDER / TRUST SECTION — Ivory bg
═══════════════════════════════════════════════════════ */
function TrustSection() {
  return (
    <section style={{ background:'var(--ivory-warm)', paddingTop:120, paddingBottom:120 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left — founder image + philosophy */}
          <div className="lg:col-span-5">
            <R>
              <Img
                label="Founder / team photo — replace with actual professional photo"
                ratio="4/5"
              />
            </R>
          </div>

          {/* Right — trust copy */}
          <div className="lg:col-span-7">
            <R>
              <div className="eyebrow">Why Developers Work With Us</div>
              <h2 className="font-serif font-bold mb-6 leading-tight"
                style={{ fontSize:'clamp(34px,4vw,54px)', color:'var(--navy)', letterSpacing:'-0.01em' }}>
                A Specialized Partner<br />
                Who Understands<br />
                <em className="italic font-light" style={{ color:'var(--gold-dim)' }}>
                  How Real Estate Sales Work.
                </em>
              </h2>
            </R>
            <R d={0.1}>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color:'var(--muted)', lineHeight:1.75 }}>
                Real estate in India is relationship-driven. Buyers need trust. Developers need reliable partners. We built CommandGrowth specifically because we saw how much revenue developers were losing to slow response times, poor lead quality, and no follow-up systems.
              </p>
            </R>

            {/* Philosophy pillars */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Target,   t:'Systems-First Philosophy',    d:'We don\'t run ad campaigns in isolation. We build complete lead acquisition and conversion systems that work together as one engine.' },
                { icon: BarChart3,t:'Data-Driven at Every Step',   d:'Every campaign decision is backed by live data — cost per enquiry, site visit rate, lead quality scores. No guesswork.' },
                { icon: Building2,t:'Real Estate Specialization',  d:'We exclusively serve developers and plotting companies. This focus means deeper expertise, better systems, and faster results.' },
              ].map((p, i) => {
                const Icon = p.icon
                return (
                  <R key={p.t} d={0.1 + i * 0.08}>
                    <div className="flex gap-4 p-5 rounded-xl"
                      style={{ background:'var(--white)', border:'1px solid var(--border-light)' }}>
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background:'var(--ivory-warm)', border:'1px solid var(--border-light)' }}>
                        <Icon style={{ width:16, height:16, color:'var(--gold-dim)' }} />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold mb-1" style={{ color:'var(--navy)', fontSize:14 }}>{p.t}</h4>
                        <p className="font-body text-sm leading-relaxed" style={{ color:'var(--muted)' }}>{p.d}</p>
                      </div>
                    </div>
                  </R>
                )
              })}
            </div>

            <R d={0.4}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" data-cursor className="btn-gold">
                  <span>Book a Free Consultation</span>
                  <ArrowRight style={{ width:16, height:16 }} />
                </Link>
                <Link href="/about" data-cursor className="btn-outline-navy">
                  <span>About Us</span>
                </Link>
              </div>
            </R>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   7. CASE STUDIES — Ivory bg
═══════════════════════════════════════════════════════ */
const cases = [
  {
    project: 'Residential Township Project',
    location: 'Nagpur, Maharashtra',
    tag: 'Meta Ads + WhatsApp Automation',
    result: '214 qualified property enquiries generated in 30 days',
    col: '#C9A84C',
    img: 'Township project aerial view / project render — replace with actual project image',
    metrics: [
      { l:'Qualified Enquiries', v:'214', d:'+180%' },
      { l:'Site Visits Booked',  v:'38',  d:'+47%'  },
      { l:'Cost Per Enquiry',    v:'₹320',d:'-62%'  },
    ],
  },
  {
    project: 'Plotting Scheme Launch',
    location: 'Wardha Road, Nagpur',
    tag: 'WhatsApp AI + CRM Pipeline',
    result: 'Response time reduced from 3 hours to under 2 minutes',
    col: '#34D399',
    img: 'Plotting layout map / scheme aerial view — replace with actual project image',
    metrics: [
      { l:'Response Time', v:'< 2 min', d:'-95%'   },
      { l:'Leads Nurtured', v:'890',    d:'90 days' },
      { l:'Site Visits',    v:'+55%',   d:'vs prior'},
    ],
  },
  {
    project: 'Premium Villa Project',
    location: 'Nagpur Outskirts',
    tag: 'Full Revenue Engine',
    result: '8.4x return on ad spend achieved within 60 days',
    col: '#A78BFA',
    img: 'Premium villa exterior / luxury residential project — replace with actual project photo',
    metrics: [
      { l:'Total Ad Spend',     v:'₹1.8L', d:'60 days' },
      { l:'Bookings Confirmed', v:'12',    d:'Units'   },
      { l:'ROI on Ad Spend',    v:'8.4x',  d:'Verified'},
    ],
  },
]

function CaseStudies() {
  return (
    <section style={{ background:'var(--ivory)', paddingTop:120, paddingBottom:120 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHead eye="Results"
            h={<>Real Numbers.<br /><em className="italic font-light" style={{ color:'var(--gold-dim)' }}>Real Developers.</em></>}
          />
          <R d={0.1} c="max-w-xs md:text-right pb-6">
            <p className="font-body text-xs leading-relaxed" style={{ color:'var(--soft)' }}>
              Representative results. Actual project data shared during your free growth audit call.
            </p>
          </R>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <R key={c.project} d={i * 0.09}>
              <div className="rounded-xl overflow-hidden h-full card-white group">
                {/* Project image */}
                <Img label={c.img} ratio="16/9" radius={false}>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="font-body text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background:'rgba(255,255,255,0.92)', color:c.col }}>
                      {c.tag}
                    </span>
                  </div>
                </Img>

                <div className="p-7">
                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin style={{ width:12, height:12, color:'var(--soft)' }} />
                    <span className="font-body text-xs" style={{ color:'var(--soft)' }}>{c.project} · {c.location}</span>
                  </div>

                  {/* Key result */}
                  <p className="font-serif text-lg font-semibold mb-6 leading-snug" style={{ color:'var(--navy)' }}>
                    "{c.result}"
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 pt-5"
                    style={{ borderTop:'1px solid var(--border-light)' }}>
                    {c.metrics.map(m => (
                      <div key={m.l} className="text-center">
                        <div className="font-serif text-xl font-bold mb-0.5" style={{ color:c.col }}>{m.v}</div>
                        <div className="font-body text-xs mb-0.5" style={{ color:'var(--soft)' }}>{m.l}</div>
                        <div className="font-body text-xs font-medium" style={{ color:c.col }}>{m.d}</div>
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

/* ═══════════════════════════════════════════════════════
   8. FAQ
═══════════════════════════════════════════════════════ */
const faqs = [
  { q:'Do you work with all types of real estate projects?', a:'We work exclusively with real estate — residential developments, plotting schemes, villa projects, and townships across India. Our entire system is built around property sales funnels, RERA-compliant marketing, and Indian buyer psychology.' },
  { q:'How quickly will we see more qualified enquiries?', a:'Most developers see meaningful improvement in enquiry quality and volume within 2–3 weeks of campaigns going live. Full system results — including site visit conversion and nurture performance — show strong improvement by 45–60 days.' },
  { q:'What makes you different from a regular digital marketing agency?', a:'We exclusively serve real estate. We understand site visit funnels, project inventory positioning, buyer decision timelines, and how to create WhatsApp automation that converts — not just generates leads. A generic agency simply doesn\'t have this depth.' },
  { q:'Do we need an existing CRM?', a:'No. We set up and manage the entire CRM pipeline for your team. If you already use a CRM, we integrate with it and train your sales team on the dashboards and workflows.' },
  { q:'What is the recommended monthly ad budget?', a:'We recommend a minimum ad spend of ₹40,000–₹60,000/month to generate meaningful, qualified volume. We optimize every rupee across Meta and Google to keep cost-per-qualified-enquiry as low as possible.' },
  { q:'How does the WhatsApp automation work?', a:'The moment a lead submits a form or enquires through any channel, our system sends an automatic WhatsApp message within 30–60 seconds. AI then qualifies them — capturing budget range, timeline, preferred location — and assigns them to the right salesperson, all before your team makes a single call.' },
]

function FAQ() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section style={{ background:'var(--ivory-warm)', paddingTop:120, paddingBottom:120 }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <R c="text-center mb-14">
          <div className="eyebrow" style={{ justifyContent:'center' }}>FAQ</div>
          <h2 className="font-serif font-bold" style={{ fontSize:'clamp(36px,4vw,56px)', color:'var(--navy)', letterSpacing:'-0.01em' }}>
            Questions Developers<br />
            <em className="italic font-light" style={{ color:'var(--gold-dim)' }}>Always Ask Us</em>
          </h2>
        </R>
        <div className="space-y-2.5">
          {faqs.map((f, i) => (
            <R key={i} d={i * 0.05}>
              <div className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: open === i ? 'var(--white)' : 'var(--white)',
                  border: open === i ? '1px solid rgba(201,168,76,0.28)' : '1px solid var(--border-light)',
                  boxShadow: open === i ? '0 4px 20px rgba(201,168,76,0.08)' : 'var(--shadow-xs)',
                }}>
                <button className="w-full flex items-center justify-between p-6 text-left" data-cursor
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="font-body font-medium pr-4" style={{ color:'var(--navy)', fontSize:15, lineHeight:1.4 }}>
                    {f.q}
                  </span>
                  <motion.div animate={{ rotate: open===i ? 180 : 0 }} transition={{ duration:0.3 }} className="flex-shrink-0">
                    <ChevronDown style={{ width:18, height:18, color:'var(--gold-dim)' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }} transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}>
                      <div className="px-6 pb-6 font-body text-sm leading-relaxed"
                        style={{ color:'var(--muted)', borderTop:'1px solid var(--border-light)', paddingTop:16, lineHeight:1.75 }}>
                        {f.a}
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

/* ═══════════════════════════════════════════════════════
   9. FINAL CTA — Navy bg, image, high-ticket feel
═══════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section style={{ background:'var(--navy)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        {/* Image — consultation / meeting */}
        <div className="relative min-h-64">
          <Img
            label="Developer meeting / architectural walkthrough / project consultation — replace with actual photo"
            ratio="auto" dark radius={false} cls="h-full absolute inset-0 w-full"
          >
            <div className="absolute inset-0"
              style={{ background:'linear-gradient(90deg, transparent 55%, rgba(7,18,42,0.6) 100%)' }} />
          </Img>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center p-10 lg:p-16">
          <R>
            <div className="eyebrow-light">Book Your Audit</div>
            <h2 className="font-serif font-bold mb-6 leading-tight"
              style={{ fontSize:'clamp(36px,4vw,58px)', color:'var(--ivory)', letterSpacing:'-0.01em' }}>
              Ready to Fill Your<br />
              <em className="italic gold-text">Sales Pipeline?</em>
            </h2>
            <p className="font-body text-lg leading-relaxed mb-10"
              style={{ color:'rgba(248,246,242,0.48)', lineHeight:1.75 }}>
              Book a free 30-minute Growth Audit. We'll analyse your current lead generation, identify where buyers are dropping off, and show you exactly how many more qualified enquiries you could be generating every month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact" data-cursor className="btn-gold">
                <span>Book Free Growth Audit</span>
                <ArrowRight style={{ width:16, height:16 }} />
              </Link>
              <a href="https://wa.me/91XXXXXXXXXX" data-cursor className="btn-outline-ivory">
                <MessageCircle style={{ width:16, height:16 }} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-2 pt-8"
              style={{ borderTop:'1px solid rgba(201,168,76,0.12)' }}>
              {[
                '✓  No lock-in contracts',
                '✓  Real estate specialists',
                '✓  Results visible in 30 days',
                '✓  Based in Nagpur',
              ].map(t => (
                <span key={t} className="font-body text-sm" style={{ color:'rgba(248,246,242,0.3)' }}>{t}</span>
              ))}
            </div>

            {/* Contact */}
            <div className="flex gap-6 mt-6">
              <a href="tel:+91XXXXXXXXXX" data-cursor
                className="flex items-center gap-2 font-body text-xs ul-gold"
                style={{ color:'rgba(248,246,242,0.3)' }}>
                <Phone style={{ width:13, height:13 }} /> +91 XX XXXX XXXX
              </a>
              <a href="mailto:hello@commandgrowth.org" data-cursor
                className="font-body text-xs ul-gold"
                style={{ color:'rgba(248,246,242,0.3)' }}>
                hello@commandgrowth.org
              </a>
            </div>
          </R>
        </div>
      </div>
    </section>
  )
}

/* ─── Page Assembly ─────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Pains />
      <System />
      <Services />
      <WhyUs />
      <TrustSection />
      <CaseStudies />
      <FAQ />
      <CTA />
    </>
  )
}
