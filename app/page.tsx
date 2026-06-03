'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, CheckCircle, ChevronDown, MessageCircle,
  BarChart3, Zap, Clock, MapPin, Building2, TrendingUp,
  Phone, AlertTriangle, Target, Shield
} from 'lucide-react'

const SYSTEM = 'The Real Estate Revenue Engine\u2122'
const MAX = 'max-w-6xl mx-auto'
const PY = { paddingTop: 112, paddingBottom: 112 }
const PY_LG = { paddingTop: 140, paddingBottom: 140 }

function R({ c = '', d = 0, dir = 'up', children }: {
  c?: string; d?: number; dir?: 'up' | 'left' | 'right'; children: React.ReactNode
}) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-32px' })
  const ini =
    dir === 'left'  ? { opacity: 0, x: -24 } :
    dir === 'right' ? { opacity: 0, x:  24 } :
                      { opacity: 0, y:  24 }
  return (
    <motion.div ref={ref} initial={ini}
      animate={v ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] }}
      className={c}>
      {children}
    </motion.div>
  )
}

function Img({ label, ratio = '4/3', dark = false, cls = '', radius = true, children }: {
  label: string; ratio?: string; dark?: boolean
  cls?: string; radius?: boolean; children?: React.ReactNode
}) {
  return (
    <div
      className={`${dark ? 'img-ph-dark' : 'img-ph'} relative overflow-hidden ${radius ? 'rounded-xl' : ''} ${cls}`}
      style={{ aspectRatio: ratio }}
      data-label={label}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.04 }}>
        <div className="absolute" style={{ inset: '18%', border: `1px solid ${dark ? 'rgba(201,168,76,1)' : 'rgba(7,18,42,1)'}` }} />
        <Building2 style={{ width: 36, height: 36, color: dark ? 'rgba(201,168,76,1)' : 'rgba(7,18,42,1)' }} />
      </div>
      {children}
    </div>
  )
}

function Eye({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={light ? 'eyebrow-light' : 'eyebrow'} style={{ marginBottom: 18 }}>
      {children}
    </div>
  )
}

function H2({ children, light = false, center = false, size = 'md' }: {
  children: React.ReactNode; light?: boolean; center?: boolean; size?: 'sm' | 'md' | 'lg'
}) {
  const fs =
    size === 'sm' ? 'clamp(28px, 3vw, 40px)' :
    size === 'lg' ? 'clamp(38px, 4.5vw, 60px)' :
                   'clamp(32px, 3.8vw, 50px)'
  return (
    <h2 className={`font-serif font-bold leading-tight ${center ? 'text-center' : ''}`}
      style={{ fontSize: fs, letterSpacing: '-0.012em', color: light ? 'var(--ivory)' : 'var(--navy)', lineHeight: 1.12, marginBottom: 16 }}>
      {children}
    </h2>
  )
}

function GI({ children, dark = true }: { children: string; dark?: boolean }) {
  return dark
    ? <em className="not-italic gold-text">{children}</em>
    : <em className="not-italic italic font-light" style={{ color: 'var(--gold-dim)' }}>{children}</em>
}

function Metric({ v, l, light = false }: { v: string; l: string; light?: boolean }) {
  return (
    <div>
      <div className="font-serif font-bold leading-none mb-1"
        style={{ fontSize: 22, color: light ? 'var(--gold-light)' : 'var(--gold-dim)' }}>{v}</div>
      <div className="font-body"
        style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: light ? 'rgba(248,246,242,0.32)' : 'var(--soft)' }}>{l}</div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden flex items-center"
      style={{ background: 'var(--navy)', minHeight: '100vh' }}>

      <div className="absolute inset-0 texture-lines-dark" />
      <div className="absolute inset-0 grid-dots-dark" style={{ opacity: 0.28 }} />
      <div className="absolute left-0 top-16 bottom-16 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.25), transparent)' }} />

      <div className={`relative z-10 w-full ${MAX} px-6 lg:px-10 py-28`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          <div className="lg:col-span-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-8"
              style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)', borderRadius: 2 }}>
              <span style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
              <span className="font-body font-medium"
                style={{ fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.75)' }}>
                Real Estate Lead Generation · Nagpur & India
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-bold mb-6"
              style={{ fontSize: 'clamp(38px, 4.8vw, 64px)', lineHeight: 1.06, letterSpacing: '-0.015em', color: 'var(--ivory)' }}>
              Turn Property<br />
              Enquiries Into<br />
              <GI dark>Site Visits & Sales.</GI>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="font-body mb-9"
              style={{ fontSize: 15, lineHeight: 1.75, maxWidth: 420, color: 'rgba(248,246,242,0.5)' }}>
              Meta Ads · WhatsApp Automation · CRM Pipeline · AI Follow-Up.{' '}
              <span style={{ color: 'rgba(248,246,242,0.72)' }}>{SYSTEM}</span>{' '}
              — built exclusively for developers and plotting companies.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="flex flex-wrap gap-3 mb-12">
              <Link href="/contact" data-cursor className="btn-gold">
                <span>Book Free Growth Audit</span>
                <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
              <Link href="/services" data-cursor className="btn-outline-ivory">
                <span>View Lead Strategy</span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}
              className="flex gap-8 pt-6"
              style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              {[
                { v: '214+',   l: 'Leads / Month'    },
                { v: '2 min',  l: 'Response Time'    },
                { v: '47%',    l: 'More Site Visits' },
                { v: '10Cr+',  l: 'Ad Spend Managed' },
              ].map(({ v, l }) => (
                <Metric key={l} v={v} l={l} light />
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 hidden lg:block">

            <div className="relative">
              <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '5/6' }}>
                <Image
                  src="/hero-project.jpg"
                  alt="Premium residential township development project"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="536px"
                />
                <div className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(7,18,42,0.82) 100%)' }} />
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', marginBottom: 5 }}>
                    Featured Project
                  </p>
                  <p className="font-serif font-semibold" style={{ fontSize: 18, color: 'var(--ivory)' }}>
                    Township Development · Nagpur
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-10 top-10 w-44"
                style={{ background: 'var(--white)', borderRadius: 10, padding: '14px 16px', boxShadow: '0 4px 24px rgba(7,18,42,0.14)', border: '1px solid rgba(7,18,42,0.05)' }}>
                <p className="font-body mb-1.5"
                  style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--soft)' }}>
                  Live Enquiries Today
                </p>
                <p className="font-serif font-bold" style={{ fontSize: 28, lineHeight: 1, color: 'var(--navy)', marginBottom: 6 }}>38</p>
                <div className="flex items-center gap-1.5">
                  <TrendingUp style={{ width: 11, height: 11, color: '#10B981' }} />
                  <span className="font-body" style={{ fontSize: 11, color: '#10B981' }}>+24% this week</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                className="absolute -right-9 w-52"
                style={{ top: '38%', background: 'var(--white)', borderRadius: 10, padding: '14px 16px', boxShadow: '0 4px 24px rgba(7,18,42,0.14)', border: '1px solid rgba(7,18,42,0.05)' }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle style={{ width: 13, height: 13, color: '#10B981' }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold" style={{ fontSize: 12, color: 'var(--navy)', lineHeight: 1.3 }}>Auto WhatsApp Sent</p>
                    <p className="font-body" style={{ fontSize: 11, color: 'var(--soft)' }}>28 sec after enquiry</p>
                  </div>
                </div>
                <p className="font-body" style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
                  "Our team will contact you shortly about available plots..."
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 2.0 }}
                className="absolute -left-6 bottom-20"
                style={{ background: 'var(--gold)', borderRadius: 10, padding: '12px 16px', boxShadow: '0 4px 20px rgba(201,168,76,0.22)', minWidth: 168 }}>
                <p className="font-body font-medium" style={{ fontSize: 10, color: 'rgba(7,18,42,0.58)', marginBottom: 4 }}>Site Visits Booked</p>
                <p className="font-serif font-bold" style={{ fontSize: 22, lineHeight: 1, color: 'var(--navy)' }}>12 Today</p>
                <p className="font-body" style={{ fontSize: 10, color: 'rgba(7,18,42,0.48)', marginTop: 3 }}>Auto-confirmed via WhatsApp</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 18, height: 30, borderRadius: 10, border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 4 }}>
          <div style={{ width: 2, height: 7, borderRadius: 1, background: 'var(--gold)', opacity: 0.6 }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

const pains = [
  { icon: Clock,         t: 'Leads wait hours for a response',       d: 'A buyer enquires at 2pm. Your team calls at 6pm. They\'ve already visited a competitor\'s project and are ready to book.' },
  { icon: AlertTriangle, t: 'Low-quality enquiries waste your team', d: 'Meta campaigns attract price-shoppers. Your sales team burns hours on leads who can never afford your inventory.' },
  { icon: MessageCircle, t: 'Enquiries lost across WhatsApp numbers', d: 'Leads scattered across personal numbers with no tracking, no system, no follow-up protocol. Silent revenue leakage.' },
  { icon: BarChart3,     t: 'High ad spend, very few site visits',   d: 'Spending Rs.50,000/month and getting 3 site visits. The gap between enquiry and visit is where crores disappear.' },
  { icon: Target,        t: 'No clarity on which campaigns work',    d: 'You don\'t know which project, ad, or area drives the best buyers. Every decision is gut-feel, not live data.' },
  { icon: Zap,           t: 'Warm leads go cold without nurturing',  d: 'An interested buyer says they\'ll visit next weekend. No follow-up happens. 90 days later they\'ve bought elsewhere.' },
]

function Pains() {
  return (
    <section style={{ background: 'var(--ivory)', ...PY_LG }}>
      <div className={`${MAX} px-6 lg:px-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <R>
              <Eye>The Reality</Eye>
              <H2 size="md">
                Why Most Developers<br />
                Lose Leads<br />
                <GI dark={false}>Every Single Day.</GI>
              </H2>
            </R>
            <R d={0.1}>
              <p className="font-body mb-6" style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--muted)', marginTop: 12 }}>
                These are not edge cases. They are the daily reality for most developers without a complete growth system.
              </p>
              <div className="p-5 rounded-xl" style={{ background: 'var(--ivory-warm)', border: '1px solid var(--border-light)' }}>
                <p className="font-body" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--muted)' }}>
                  If 3 of these feel familiar, you are losing{' '}
                  <strong style={{ color: 'var(--navy)' }}>Rs.15-40 lakhs</strong>{' '}
                  in potential bookings every quarter.
                </p>
              </div>
            </R>
            <R d={0.15} c="mt-6">
              <Img label="Sales team managing property enquiries" ratio="4/3" />
            </R>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {pains.map((p, i) => {
              const Icon = p.icon
              return (
                <R key={p.t} d={i * 0.05}>
                  <div className="flex gap-4 p-6 rounded-xl card-white">
                    <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--ivory-warm)', border: '1px solid var(--border-light)' }}>
                      <Icon style={{ width: 16, height: 16, color: 'var(--gold-dim)' }} />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold mb-1.5" style={{ color: 'var(--navy)', fontSize: 14 }}>{p.t}</h3>
                      <p className="font-body" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--muted)' }}>{p.d}</p>
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

const steps = [
  { n: '01', t: 'Meta & Google Ads',       s: 'Targeted to active property buyers',  c: '#C9A84C' },
  { n: '02', t: 'Conversion Landing Page', s: 'Project-specific, mobile-first',       c: '#DFC06E' },
  { n: '03', t: 'WhatsApp Automation',     s: 'Instant AI reply under 2 minutes',     c: '#34D399' },
  { n: '04', t: 'Lead Qualification',      s: 'Budget · Timeline · Location',         c: '#60A5FA' },
  { n: '05', t: 'CRM Pipeline',            s: 'Every lead tracked and assigned',      c: '#C9A84C' },
  { n: '06', t: 'Site Visit Booking',      s: 'Automated scheduling & reminders',     c: '#DFC06E' },
  { n: '07', t: 'AI Nurture (90 Days)',    s: 'Follow-up for long-cycle buyers',      c: '#A78BFA' },
  { n: '08', t: 'Property Booking',        s: 'Token, agreement, confirmed sale',     c: '#34D399' },
]

function System() {
  return (
    <section style={{ background: 'var(--navy)', ...PY_LG, position: 'relative' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
      <div className={`${MAX} px-6 lg:px-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <R>
            <Eye light>Our System</Eye>
            <H2 light size="lg">{SYSTEM}</H2>
          </R>
          <R d={0.1} c="lg:flex items-end">
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(248,246,242,0.44)' }}>
              One integrated system where every step feeds the next — from the first ad impression to a confirmed property booking.
            </p>
          </R>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((s, i) => (
            <R key={s.n} d={i * 0.05}>
              <div className="card-navy-hover p-5 h-full relative group">
                <div className="font-serif font-bold leading-none mb-3"
                  style={{ fontSize: 38, color: s.c, opacity: 0.09 }}>{s.n}</div>
                <div className="mb-3" style={{ width: 16, height: 1, background: s.c, opacity: 0.5 }} />
                <h3 className="font-body font-semibold mb-1.5"
                  style={{ fontSize: 13, color: 'var(--ivory)', lineHeight: 1.3 }}>{s.t}</h3>
                <p className="font-body" style={{ fontSize: 11, color: 'rgba(248,246,242,0.35)', lineHeight: 1.6 }}>{s.s}</p>
                {i % 4 !== 3 && i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight style={{ width: 12, height: 12, color: s.c, opacity: 0.28 }} />
                  </div>
                )}
              </div>
            </R>
          ))}
        </div>
        <R d={0.25}>
          <Img label="CRM pipeline dashboard — replace with actual screenshot" ratio="21/7" dark radius cls="w-full">
            <div className="absolute inset-0 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(7,18,42,0.4)' }}>
              <p className="font-serif italic" style={{ fontSize: 16, color: 'rgba(248,246,242,0.35)' }}>
                CRM Dashboard — Replace with Screenshot
              </p>
            </div>
          </Img>
        </R>
        <R d={0.3}>
          <div className="mt-7 p-7 rounded-xl text-center"
            style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.14)' }}>
            <p className="font-serif font-light italic"
              style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(248,246,242,0.65)', lineHeight: 1.65, maxWidth: 680, margin: '0 auto' }}>
              "This engine operates automatically — so your sales team speaks only to{' '}
              <strong className="font-semibold not-italic" style={{ color: 'var(--gold)' }}>
                qualified, interested buyers
              </strong>{' '}
              ready to visit your project site."
            </p>
          </div>
        </R>
      </div>
    </section>
  )
}

const svcs = [
  { n: '01', col: '#C9A84C', t: 'Property Lead Generation',
    d: 'Precision Meta and Google campaigns targeting active property buyers in your project catchment area. Every rupee tracked. CPL benchmarked against your target buyer profile.',
    out: ['Lower cost per qualified enquiry', 'Higher buyer intent traffic', 'Project-specific ad creatives'],
    img: 'Meta Ads dashboard + property creative — replace with screenshot', metric: 'Rs.280-450 avg. CPL' },
  { n: '02', col: '#34D399', t: 'WhatsApp Automation & AI Response',
    d: 'Every enquiry receives an automatic WhatsApp reply in under 2 minutes — 24/7. AI qualification captures budget, timeline, and location before your team makes a single call.',
    out: ['2-minute speed-to-lead', '24/7 lead coverage', 'AI-powered qualification'],
    img: 'WhatsApp AI conversation flow — replace with screenshot', metric: '< 2 min response' },
  { n: '03', col: '#60A5FA', t: 'CRM & Sales Pipeline',
    d: 'Complete pipeline visibility from first enquiry to booking. Every lead tracked, scored, and assigned. Your sales team sees exactly which leads are hot, warm, or cold.',
    out: ['Real-time pipeline visibility', 'Lead scoring & assignment', 'Zero leads falling through'],
    img: 'CRM pipeline dashboard with lead stages — replace with screenshot', metric: '100% visibility' },
  { n: '04', col: '#F59E0B', t: 'Site Visit Booking Funnel',
    d: 'A complete automated system converting warm enquiries into confirmed site visits. WhatsApp confirmations, pre-visit project briefs, reminders, and post-visit follow-ups.',
    out: ['More confirmed visits', 'Fewer no-shows', 'Post-visit nurture'],
    img: 'Buyers visiting a residential project showflat — replace with actual photo', metric: '+47% site visits' },
  { n: '05', col: '#A78BFA', t: 'Retargeting & Re-Engagement',
    d: 'Systematically re-engage warm leads who showed interest but did not convert. Layered retargeting across Meta and Google brings buyers back at the right moment.',
    out: ['Re-activate cold leads', 'Lower blended CPL', 'Better overall ad ROI'],
    img: 'Retargeting funnel visualization — replace with actual graphic', metric: '3.2x retargeting ROAS' },
  { n: '06', col: '#C9A84C', t: 'AI Follow-Up & Lead Nurturing',
    d: '90-day AI nurturing sequences that keep your project top-of-mind throughout a buyer decision journey — converting hesitation into confirmed bookings over time.',
    out: ['90-day nurture window', 'Long-cycle buyer conversion', 'Reactivate old leads'],
    img: 'AI automation nurture timeline — replace with actual graphic', metric: '90-day nurture' },
]

function Services() {
  return (
    <section style={{ background: 'var(--ivory)', ...PY_LG }}>
      <div className={`${MAX} px-6 lg:px-10`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <R>
            <Eye>Our Services</Eye>
            <H2 size="lg">
              Six Components of<br />
              <GI dark={false}>{SYSTEM}</GI>
            </H2>
          </R>
          <R d={0.08} c="max-w-xs md:text-right pb-1">
            <p className="font-body" style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--soft)' }}>
              Every service is a component of one integrated system.
            </p>
          </R>
        </div>
        <div className="space-y-4">
          {svcs.map((s, i) => (
            <R key={s.n} d={i * 0.04}>
              <div className="rounded-xl overflow-hidden card-white">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-2 order-last lg:order-first">
                    <Img label={s.img} ratio="16/11" radius={false} cls="h-full" />
                  </div>
                  <div className="lg:col-span-3 order-first lg:order-last p-7 lg:p-9 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-body font-semibold"
                          style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: s.col }}>
                          {s.n}
                        </span>
                        <div className="h-px flex-1" style={{ background: `${s.col}22` }} />
                        <span className="font-body font-semibold"
                          style={{ fontSize: 11, color: s.col, background: `${s.col}10`, border: `1px solid ${s.col}20`, borderRadius: 20, padding: '3px 10px' }}>
                          {s.metric}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold mb-3"
                        style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'var(--navy)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                        {s.t}
                      </h3>
                      <p className="font-body mb-5" style={{ fontSize: 13, lineHeight: 1.78, color: 'var(--muted)' }}>{s.d}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {s.out.map(o => (
                          <div key={o} className="flex items-center gap-1.5 font-body font-medium"
                            style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: `${s.col}0e`, color: s.col, border: `1px solid ${s.col}1e` }}>
                            <CheckCircle style={{ width: 10, height: 10 }} />
                            {o}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href="/contact" data-cursor
                      className="inline-flex items-center gap-2 font-body font-semibold ul-gold w-fit"
                      style={{ fontSize: 13, color: 'var(--navy)' }}>
                      Learn More <ArrowRight style={{ width: 13, height: 13 }} />
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

const diffs = [
  { icon: Zap,           stat: '2 min', t: 'Speed-to-Lead Advantage',       d: 'Our system replies to every property enquiry in under 2 minutes before any competitor reacts. First response wins the buyer.' },
  { icon: Building2,     stat: '100%',  t: 'Real Estate Specialists Only',   d: 'We work exclusively with developers and plotting companies. We understand site visit funnels, RERA, and buyer psychology.' },
  { icon: BarChart3,     stat: 'Live',  t: 'Full-Funnel Revenue Visibility', d: 'Cost per enquiry, site visit rate, nurture conversion — all in a live dashboard. Every decision backed by real data.' },
  { icon: MessageCircle, stat: '90d',   t: 'AI-Powered Lead Nurturing',      d: 'Property decisions take weeks or months. Our 90-day AI sequences keep your project present throughout the buyer journey.' },
  { icon: Shield,        stat: 'Zero',  t: 'No Lock-In Contracts',           d: 'We earn your business every month by delivering measurable results. No 12-month lock-ins. Pure performance partnership.' },
  { icon: Target,        stat: 'ROI',   t: 'Revenue Partner, Not Agency',    d: 'We measure our success by your property bookings and site visits — not impressions or follower counts.' },
]

function WhyUs() {
  return (
    <section style={{ background: 'var(--navy)', ...PY_LG, position: 'relative' }}>
      <div className={`${MAX} px-6 lg:px-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <R>
            <Eye light>Why Us</Eye>
            <H2 light size="lg">
              We are Not an Agency.<br />
              <GI dark>We are Your Revenue Partner.</GI>
            </H2>
          </R>
          <R d={0.08} c="lg:flex items-end">
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(248,246,242,0.44)' }}>
              Traditional agencies optimize for impressions. We optimize for one thing: qualified property buyers walking into your project site and signing tokens.
            </p>
          </R>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {diffs.map((d, i) => {
            const Icon = d.icon
            return (
              <R key={d.t} d={i * 0.06}>
                <div className="card-navy-hover p-6 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.13)' }}>
                      <Icon style={{ width: 16, height: 16, color: 'var(--gold)' }} />
                    </div>
                    <span className="font-serif font-bold gold-text" style={{ fontSize: 20 }}>{d.stat}</span>
                  </div>
                  <h3 className="font-body font-semibold mb-2" style={{ color: 'var(--ivory)', fontSize: 13 }}>{d.t}</h3>
                  <p className="font-body" style={{ fontSize: 13, color: 'rgba(248,246,242,0.37)', lineHeight: 1.72 }}>{d.d}</p>
                </div>
              </R>
            )
          })}
        </div>
        <R d={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-7 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)' }}>
            <Img label="Nagpur skyline / MIHAN zone — replace with actual photo" ratio="16/9" dark />
            <div className="flex flex-col justify-center py-4 lg:pl-3">
              <Eye light>Local Expertise</Eye>
              <H2 light size="sm">
                Built for Nagpur's<br />
                <GI dark>Growing Real Estate Market.</GI>
              </H2>
              <p className="font-body mt-3" style={{ fontSize: 13, lineHeight: 1.78, color: 'rgba(248,246,242,0.44)' }}>
                We started in Nagpur because the region — Wardha Road, MIHAN, Hingna, Butibori — has enormous potential that generic agencies consistently underserved. Today we support developers across Maharashtra and pan-India.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <MapPin style={{ width: 12, height: 12, color: 'var(--gold)', flexShrink: 0 }} />
                <span className="font-body" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(201,168,76,0.6)' }}>
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

function Trust() {
  return (
    <section style={{ background: 'var(--ivory-warm)', ...PY_LG }}>
      <div className={`${MAX} px-6 lg:px-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <R>
              <Img label="Founder / team photo — replace with actual professional photo" ratio="4/5" />
            </R>
          </div>
          <div className="lg:col-span-7">
            <R>
              <Eye>Why Developers Work With Us</Eye>
              <H2 size="lg">
                A Specialized Partner<br />Who Understands<br />
                <GI dark={false}>How Real Estate Sales Work.</GI>
              </H2>
            </R>
            <R d={0.1}>
              <p className="font-body mb-7 mt-2" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)' }}>
                Real estate in India is relationship-driven. Buyers need trust. Developers need reliable partners. We built CommandGrowth because developers were losing crores to slow response times, poor lead quality, and zero follow-up systems.
              </p>
            </R>
            <div className="space-y-3 mb-9">
              {[
                { icon: Target,    t: 'Systems-First Philosophy',   d: 'We build complete lead acquisition and conversion systems — not isolated ad campaigns. Every component works together as one engine.' },
                { icon: BarChart3, t: 'Data-Driven at Every Step',  d: 'Every campaign decision is backed by live data — cost per enquiry, site visit rate, lead quality. No guesswork.' },
                { icon: Building2, t: 'Real Estate Specialization', d: 'We exclusively serve developers and plotting companies. This focus means deeper expertise and faster, more predictable results.' },
              ].map((p, i) => {
                const Icon = p.icon
                return (
                  <R key={p.t} d={0.1 + i * 0.07}>
                    <div className="flex gap-4 p-5 rounded-xl card-white">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: 'var(--ivory-warm)', border: '1px solid var(--border-light)' }}>
                        <Icon style={{ width: 15, height: 15, color: 'var(--gold-dim)' }} />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold mb-1" style={{ color: 'var(--navy)', fontSize: 13 }}>{p.t}</h4>
                        <p className="font-body" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--muted)' }}>{p.d}</p>
                      </div>
                    </div>
                  </R>
                )
              })}
            </div>
            <R d={0.35}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" data-cursor className="btn-gold">
                  <span>Book a Free Consultation</span>
                  <ArrowRight style={{ width: 15, height: 15 }} />
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

const cases = [
  {
    project: 'Residential Township Project', location: 'Nagpur, Maharashtra',
    tag: 'Meta Ads + WhatsApp Automation',
    result: '214 qualified property enquiries in 30 days',
    col: '#C9A84C',
    img: 'Township project aerial view — replace with actual project render',
    metrics: [
      { l: 'Qualified Enquiries', v: '214',  d: '+180%' },
      { l: 'Site Visits Booked',  v: '38',   d: '+47%'  },
      { l: 'Cost Per Enquiry',    v: 'Rs.320', d: '-62%' },
    ],
  },
  {
    project: 'Plotting Scheme Launch', location: 'Wardha Road, Nagpur',
    tag: 'WhatsApp AI + CRM Pipeline',
    result: 'Response time cut from 3 hours to under 2 minutes',
    col: '#34D399',
    img: 'Plotting layout map / scheme aerial view — replace with actual image',
    metrics: [
      { l: 'Response Time',  v: '< 2 min', d: '-95%'    },
      { l: 'Leads Nurtured', v: '890',     d: '90 days' },
      { l: 'Site Visits',    v: '+55%',    d: 'vs prior' },
    ],
  },
  {
    project: 'Premium Villa Project', location: 'Nagpur Outskirts',
    tag: 'Full Revenue Engine',
    result: '8.4x return on ad spend within 60 days',
    col: '#A78BFA',
    img: 'Premium villa exterior / luxury residential project — replace with actual photo',
    metrics: [
      { l: 'Total Ad Spend',     v: 'Rs.1.8L', d: '60 days' },
      { l: 'Bookings Confirmed', v: '12',    d: 'Units'   },
      { l: 'ROI on Ad Spend',    v: '8.4x',  d: 'Verified'},
    ],
  },
]

function CaseStudies() {
  return (
    <section style={{ background: 'var(--ivory)', ...PY_LG }}>
      <div className={`${MAX} px-6 lg:px-10`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <R>
            <Eye>Results</Eye>
            <H2 size="md">
              Real Numbers.<br />
              <GI dark={false}>Real Developers.</GI>
            </H2>
          </R>
          <R d={0.08} c="max-w-xs md:text-right pb-1">
            <p className="font-body" style={{ fontSize: 12, color: 'var(--soft)', lineHeight: 1.7 }}>
              Representative results. Actual data shared during your free growth audit.
            </p>
          </R>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <R key={c.project} d={i * 0.08}>
              <div className="rounded-xl overflow-hidden h-full card-white group">
                <Img label={c.img} ratio="16/9" radius={false}>
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="font-body font-semibold"
                      style={{ fontSize: 10, padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.92)', color: c.col }}>
                      {c.tag}
                    </span>
                  </div>
                </Img>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin style={{ width: 11, height: 11, color: 'var(--soft)' }} />
                    <span className="font-body" style={{ fontSize: 11, color: 'var(--soft)' }}>
                      {c.project} · {c.location}
                    </span>
                  </div>
                  <p className="font-serif font-semibold mb-5" style={{ fontSize: 17, color: 'var(--navy)', lineHeight: 1.35 }}>
                    "{c.result}"
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 pt-5" style={{ borderTop: '1px solid var(--border-light)' }}>
                    {c.metrics.map(m => (
                      <div key={m.l} className="text-center">
                        <div className="font-serif font-bold mb-0.5" style={{ fontSize: 19, color: c.col }}>{m.v}</div>
                        <div className="font-body" style={{ fontSize: 10, color: 'var(--soft)' }}>{m.l}</div>
                        <div className="font-body font-medium" style={{ fontSize: 11, color: c.col }}>{m.d}</div>
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

const faqs = [
  { q: 'Do you work with all types of real estate projects?', a: 'We work exclusively with real estate — residential developments, plotting schemes, villa projects, and townships. Our entire system is built around property sales funnels, RERA-compliant marketing, and Indian buyer psychology.' },
  { q: 'How quickly will we see more qualified enquiries?', a: 'Most developers see meaningful improvement within 2-3 weeks. Full system results — site visit conversion and nurture performance — show strong improvement by 45-60 days.' },
  { q: 'What makes you different from a regular digital marketing agency?', a: 'We exclusively serve real estate. We understand site visit funnels, project inventory positioning, buyer decision timelines, and how to create WhatsApp automation that converts — not just generates leads.' },
  { q: 'Do we need an existing CRM?', a: 'No. We set up and manage the entire CRM pipeline for your team. If you already use a CRM, we integrate with it seamlessly and train your sales team on the dashboards.' },
  { q: 'What is the recommended monthly ad budget?', a: 'We recommend a minimum of Rs.40,000-60,000 per month in ad spend to generate meaningful qualified volume. We optimize every rupee across Meta and Google to minimize cost-per-qualified-enquiry.' },
  { q: 'How does the WhatsApp automation work?', a: 'The moment a lead submits a form, our system sends an automatic WhatsApp message in 30-60 seconds. AI then qualifies them — capturing budget, timeline, preferred location — and assigns them to the right salesperson before your team makes a single call.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ background: 'var(--ivory-warm)', ...PY }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }} className="px-6 lg:px-10">
        <R c="text-center mb-12">
          <Eye>FAQ</Eye>
          <H2 center size="md">
            Questions Developers<br />
            <GI dark={false}>Always Ask Us</GI>
          </H2>
        </R>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <R key={i} d={i * 0.04}>
              <div className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'var(--white)',
                  border: open === i ? '1px solid rgba(201,168,76,0.26)' : '1px solid var(--border-light)',
                  boxShadow: open === i ? '0 4px 18px rgba(201,168,76,0.07)' : '0 1px 4px rgba(7,18,42,0.06)',
                }}>
                <button className="w-full flex items-center justify-between p-5 text-left" data-cursor
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="font-body font-medium pr-4" style={{ color: 'var(--navy)', fontSize: 14, lineHeight: 1.45 }}>{f.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                    <ChevronDown style={{ width: 16, height: 16, color: 'var(--gold-dim)' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="px-5 pb-5 font-body"
                        style={{ fontSize: 13, lineHeight: 1.78, color: 'var(--muted)', borderTop: '1px solid var(--border-light)', paddingTop: 14 }}>
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

function CTA() {
  return (
    <section style={{ background: 'var(--navy)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 580 }}>
        <div className="relative min-h-64 lg:min-h-full">
          <Img label="Developer consultation / architectural walkthrough — replace with actual photo"
            ratio="auto" dark radius={false} cls="absolute inset-0 w-full h-full">
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 55%, rgba(7,18,42,0.55) 100%)' }} />
          </Img>
        </div>
        <div className="flex flex-col justify-center px-10 lg:px-14 py-14">
          <R>
            <Eye light>Book Your Audit</Eye>
            <H2 light size="lg">
              Ready to Fill Your<br />
              <GI dark>Sales Pipeline?</GI>
            </H2>
            <p className="font-body mt-4 mb-9"
              style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(248,246,242,0.46)', maxWidth: 420 }}>
              Book a free 30-minute Growth Audit. We will analyse your current lead generation, identify where buyers are dropping off, and show you exactly how many more qualified enquiries you could be generating monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link href="/contact" data-cursor className="btn-gold">
                <span>Book Free Growth Audit</span>
                <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
              <a href="https://wa.me/91XXXXXXXXXX" data-cursor className="btn-outline-ivory">
                <MessageCircle style={{ width: 15, height: 15 }} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-7 mb-6"
              style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              {['No lock-in contracts', 'Real estate specialists', 'Results in 30 days', 'Based in Nagpur'].map(t => (
                <span key={t} className="font-body" style={{ fontSize: 12, color: 'rgba(248,246,242,0.3)' }}>
                  {'\u2713'}  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-5">
              <a href="tel:+91XXXXXXXXXX" data-cursor className="flex items-center gap-1.5 font-body ul-gold"
                style={{ fontSize: 12, color: 'rgba(248,246,242,0.3)' }}>
                <Phone style={{ width: 12, height: 12 }} /> +91 XX XXXX XXXX
              </a>
              <a href="mailto:hello@commandgrowth.org" data-cursor className="font-body ul-gold"
                style={{ fontSize: 12, color: 'rgba(248,246,242,0.3)' }}>
                hello@commandgrowth.org
              </a>
            </div>
          </R>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pains />
      <System />
      <Services />
      <WhyUs />
      <Trust />
      <CaseStudies />
      <FAQ />
      <CTA />
    </>
  )
}
