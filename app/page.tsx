'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, CheckCircle, AlertCircle, ChevronDown,
  MessageCircle, Target, BarChart3, Zap, Users,
  TrendingUp, Clock, Phone, MapPin, Star
} from 'lucide-react'

/* ─── Reveal helper ─────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', direction = 'up' }: {
  children: React.ReactNode; delay?: number; className?: string
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const initial =
    direction === 'left' ? { opacity: 0, x: -48 } :
    direction === 'right' ? { opacity: 0, x: 48 } :
    { opacity: 0, y: 48 }
  return (
    <motion.div ref={ref} initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

/* ─── Section eyebrow label ─────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
      <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.32em] uppercase">{children}</span>
      <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   1. HERO SECTION
═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#060810' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Ambient glows */}
      <motion.div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

      {/* Animated scan lines */}
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="absolute h-px w-full pointer-events-none"
          style={{ top: `${25 + i * 22}%`, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.06) 50%, transparent)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: 'linear', delay: i * 2 }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-gold-500/20"
              style={{ background: 'rgba(212,175,55,0.06)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.2em] uppercase">
                Real Estate Lead Generation · Nagpur & India
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}>
              <span className="block text-white">We Help Real Estate</span>
              <span className="block text-white">Developers Generate</span>
              <span className="block gold-text italic">Qualified Buyer Leads</span>
              <span className="block text-white/60 font-normal text-[0.7em] mt-2">Using AI-Powered Funnels & Automation</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-white/50 font-body text-lg leading-relaxed mb-10 max-w-lg">
              Meta Ads → WhatsApp Automation → AI Follow-Up → CRM Pipeline → Site Visit Booking.
              A complete growth system built exclusively for developers and plotting companies.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12">
              <Link href="/contact" data-cursor
                className="inline-flex items-center gap-3 px-8 py-4 font-bold font-body text-sm text-navy-900 group shimmer"
                style={{
                  background: 'linear-gradient(135deg, #e8c84a 0%, #D4AF37 50%, #b8952e 100%)',
                  clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                  boxShadow: '0 0 40px rgba(212,175,55,0.3)',
                }}>
                Book Free Growth Audit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/services" data-cursor
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold font-body text-sm text-gold-400 border border-gold-500/30 hover:border-gold-500/60 transition-colors"
                style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
                Get Lead Strategy
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-6 pt-6 border-t border-white/5">
              {[
                { val: '200+', label: 'Leads/Month' },
                { val: '₹10Cr+', label: 'Ad Spend Managed' },
                { val: '2 min', label: 'Avg. Response Time' },
                { val: '47%', label: 'More Site Visits' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold gold-text leading-none">{val}</div>
                  <div className="text-white/30 text-xs font-body tracking-wide mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Property CRM mockup visual */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block">
            <PropertyDashboardMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-gold-500/25 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-gold-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* Property dashboard mockup */
function PropertyDashboardMockup() {
  const leads = [
    { name: 'Vikas Sharma', type: '3BHK · Plots', status: 'Hot', time: '2m ago' },
    { name: 'Priya Rathod', type: '2BHK · Residential', status: 'Warm', time: '8m ago' },
    { name: 'Amit Deshmukh', type: 'Plot · 1500sqft', status: 'Hot', time: '15m ago' },
    { name: 'Sunita Patil', type: 'Villa · Township', status: 'New', time: '22m ago' },
  ]
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/8"
      style={{ background: 'linear-gradient(145deg, rgba(10,20,40,0.95), rgba(5,10,25,0.98))',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.06)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="text-white/20 text-xs font-body">CommandGrowth CRM · Live</div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs">Live</span>
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-white/5 mx-5 mt-4 rounded-xl overflow-hidden">
        {[
          { val: '214', label: 'Leads This Month', color: '#D4AF37' },
          { val: '38', label: 'Site Visits Booked', color: '#4ade80' },
          { val: '₹2.1L', label: 'Ad Spend', color: '#38bdf8' },
        ].map(({ val, label, color }) => (
          <div key={label} className="px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="font-display text-xl font-bold" style={{ color }}>{val}</div>
            <div className="text-white/30 text-xs font-body mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      {/* Lead feed */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/40 text-xs font-body tracking-widest uppercase">Live Enquiries</span>
          <span className="text-gold-400 text-xs font-body">WhatsApp Auto-Reply ✓</span>
        </div>
        <div className="space-y-2">
          {leads.map((lead, i) => (
            <motion.div key={lead.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-body font-bold text-xs"
                  style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37' }}>
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-body font-semibold">{lead.name}</div>
                  <div className="text-white/30 text-xs font-body">{lead.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/20 text-xs">{lead.time}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: lead.status === 'Hot' ? 'rgba(239,68,68,0.15)' :
                                lead.status === 'Warm' ? 'rgba(251,146,60,0.15)' : 'rgba(74,222,128,0.12)',
                    color: lead.status === 'Hot' ? '#f87171' :
                           lead.status === 'Warm' ? '#fb923c' : '#4ade80',
                  }}>
                  {lead.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* WhatsApp auto-reply strip */}
      <div className="mx-5 mb-5 mt-3 p-3 rounded-xl flex items-center gap-3"
        style={{ background: 'rgba(37,211,102,0.07)', border: '1px solid rgba(37,211,102,0.15)' }}>
        <MessageCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#25D366' }} />
        <div>
          <div className="text-white/70 text-xs font-body">
            <span style={{ color: '#25D366' }}>Auto-replied</span> to Vikas Sharma in <strong className="text-white">28 seconds</strong>
          </div>
          <div className="text-white/25 text-xs font-body">"Thank you! Our team will call you shortly to discuss available plots..."</div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   2. PAIN POINTS
═══════════════════════════════════════════════════════════ */
const pains = [
  { icon: AlertCircle, title: 'Low-quality property enquiries', desc: 'Meta campaigns bring tire-kickers. Your sales team wastes hours chasing leads who can\'t afford your inventory.' },
  { icon: Clock, title: 'Sales team responds hours late', desc: 'A buyer enquires at 2pm. Your team calls back at 6pm. They\'ve already visited a competitor\'s site.' },
  { icon: MessageCircle, title: 'Leads getting lost on WhatsApp', desc: 'Hundreds of enquiries scattered across personal numbers. No system, no tracking, no follow-up. Pure chaos.' },
  { icon: TrendingUp, title: 'High cost-per-lead from Meta Ads', desc: 'Spending ₹50,000/month and getting 200 enquiries — but only 3 site visits. Your CPL is bleeding you dry.' },
  { icon: BarChart3, title: 'No visibility into your pipeline', desc: 'You don\'t know which ad, which project, which area is bringing the best buyers. Decisions made on gut, not data.' },
  { icon: Users, title: 'Poor site visit conversion', desc: 'People show interest, say they\'ll visit, then ghost. No nurture system to bring them back and convert them.' },
]

function PainSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#080c18' }}>
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <Eyebrow>Sound Familiar?</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            The Problems Every<br />
            <span className="gold-text italic">Developer Faces</span>
          </h2>
          <p className="text-white/40 font-body text-lg mt-4 max-w-xl mx-auto">
            If any of these feel like your current reality, you're leaving crores on the table every month.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map((pain, i) => {
            const Icon = pain.icon
            return (
              <Reveal key={pain.title} delay={i * 0.08}>
                <div className="group relative p-7 rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-red-500/20"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(239,68,68,0.06) 0%, transparent 60%)' }} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-3">{pain.title}</h3>
                    <p className="text-white/40 font-body text-sm leading-relaxed">{pain.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.4} className="mt-12 text-center">
          <p className="text-white/30 font-body text-base">
            We've built a system that solves every single one of these. ↓
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   3. REAL ESTATE GROWTH SYSTEM
═══════════════════════════════════════════════════════════ */
const funnelSteps = [
  { step: '01', label: 'Meta & Google Ads', sub: 'Hyper-targeted to active buyers', color: '#D4AF37' },
  { step: '02', label: 'Landing Page', sub: 'Conversion-optimized project pages', color: '#f0a500' },
  { step: '03', label: 'WhatsApp Automation', sub: 'Instant reply in under 2 minutes', color: '#25D366' },
  { step: '04', label: 'AI Qualification', sub: 'Budget · Timeline · Location filters', color: '#38bdf8' },
  { step: '05', label: 'CRM Pipeline', sub: 'Every lead tracked, scored, assigned', color: '#a78bfa' },
  { step: '06', label: 'Site Visit Booking', sub: 'Automated scheduling & reminders', color: '#fb923c' },
  { step: '07', label: 'Follow-Up System', sub: 'AI nurtures leads for 90 days', color: '#4ade80' },
  { step: '08', label: 'Property Sale', sub: 'Qualified buyer converts', color: '#D4AF37' },
]

function SystemSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#060810' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <Eyebrow>Our System</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            The Real Estate<br />
            <span className="gold-text italic">Growth Engine</span>
          </h2>
          <p className="text-white/40 font-body text-lg mt-4 max-w-xl mx-auto">
            Not a loose set of services. A fully integrated system where every step feeds the next.
          </p>
        </Reveal>

        {/* Funnel steps — zig-zag desktop, vertical mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {funnelSteps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.07}>
              <div className="relative group">
                {/* Connector arrow right (not on last in row) */}
                {i % 4 !== 3 && i !== funnelSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 items-center">
                    <div className="w-4 h-px" style={{ background: s.color, opacity: 0.4 }} />
                    <div className="w-0 h-0"
                      style={{ borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${s.color}`, opacity: 0.4 }} />
                  </div>
                )}
                <div className="p-6 rounded-2xl border transition-all duration-400 group-hover:border-opacity-50 h-full"
                  style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${s.color}18` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = s.color + '45')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = s.color + '18')}>
                  <div className="font-display text-4xl font-black opacity-[0.07] leading-none mb-3" style={{ color: s.color }}>
                    {s.step}
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  </div>
                  <h3 className="font-body font-semibold text-white text-sm mb-2">{s.label}</h3>
                  <p className="text-white/35 font-body text-xs leading-relaxed">{s.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom callout */}
        <Reveal delay={0.5} className="mt-12">
          <div className="p-8 rounded-2xl text-center"
            style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.12)' }}>
            <p className="text-white/60 font-body text-lg">
              This entire system runs <span className="text-gold-400 font-semibold">automatically</span> — so your sales team only talks to{' '}
              <span className="text-white font-semibold">qualified, interested buyers</span> who are ready to visit.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   4. SERVICES
═══════════════════════════════════════════════════════════ */
const services = [
  {
    number: '01',
    title: 'Property Lead Generation',
    outcomes: ['Qualified buyer enquiries', 'Lower cost-per-lead', 'Higher intent traffic'],
    items: ['Meta Ads (Facebook & Instagram)', 'Google Search & Display', 'Conversion-Optimised Landing Pages', 'Project-specific ad creatives'],
    color: '#D4AF37',
    hoverBg: '#1a1400',
  },
  {
    number: '02',
    title: 'WhatsApp Automation System',
    outcomes: ['2-min response time', 'No lead left unattended', '24/7 sales coverage'],
    items: ['Instant auto-reply on enquiry', 'AI-powered lead qualification', 'Automated follow-up sequences', 'WhatsApp catalog integration'],
    color: '#25D366',
    hoverBg: '#041a0c',
  },
  {
    number: '03',
    title: 'CRM & Sales Pipeline',
    outcomes: ['Full pipeline visibility', 'Sales team accountability', 'Data-driven decisions'],
    items: ['Custom CRM setup & integration', 'Lead scoring & assignment', 'Real-time dashboards & reports', 'Sales performance tracking'],
    color: '#38bdf8',
    hoverBg: '#041020',
  },
  {
    number: '04',
    title: 'Retargeting Campaigns',
    outcomes: ['Re-engage warm leads', 'Higher site visit conversion', 'Better ad ROI'],
    items: ['Website visitor retargeting', 'Video view retargeting', 'Lookalike audience campaigns', 'Seasonal re-engagement'],
    color: '#fb923c',
    hoverBg: '#1a0800',
  },
  {
    number: '05',
    title: 'Site Visit Booking Funnel',
    outcomes: ['More confirmed visits', 'Fewer no-shows', 'Higher close rate'],
    items: ['Automated scheduling system', 'WhatsApp confirmation & reminders', 'Pre-visit buyer nurturing', 'Post-visit follow-up sequences'],
    color: '#a78bfa',
    hoverBg: '#0e0520',
  },
  {
    number: '06',
    title: 'AI Follow-Up & Nurturing',
    outcomes: ['90-day lead nurturing', 'Reactivate cold leads', 'More conversions over time'],
    items: ['AI-powered message sequences', 'Behavioural trigger automation', 'Long-term lead nurturing', 'Re-engagement campaigns'],
    color: '#4ade80',
    hoverBg: '#041510',
  },
]

function ServicesSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#080c18' }}>
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="mb-16">
          <Eyebrow>What We Do</Eyebrow>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Six Systems Built for<br />
              <span className="gold-text italic">Real Estate Growth</span>
            </h2>
            <p className="text-white/40 font-body text-base max-w-xs">
              Everything focused on one outcome: more qualified buyers walking into your site.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {services.map((svc, i) => (
            <Reveal key={svc.number} delay={i * 0.06}>
              <div className="relative group overflow-hidden rounded-2xl border border-white/5 cursor-default"
                onMouseEnter={e => (e.currentTarget.style.borderColor = svc.color + '35')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                {/* BG wipe on hover */}
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none"
                  style={{ background: svc.hoverBg, transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.018)' }} />

                <div className="relative z-10 p-7 md:p-9 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  {/* Number + title */}
                  <div>
                    <div className="font-display text-6xl font-black opacity-[0.07] leading-none mb-3" style={{ color: svc.color }}>
                      {svc.number}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-4">{svc.title}</h3>
                    <Link href="/contact" data-cursor
                      className="inline-flex items-center gap-2 text-xs font-body font-semibold"
                      style={{ color: svc.color }}>
                      Learn More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {/* Outcomes */}
                  <div>
                    <p className="text-white/25 text-xs font-body tracking-widest uppercase mb-3">Outcomes</p>
                    <div className="space-y-2">
                      {svc.outcomes.map(o => (
                        <div key={o} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: svc.color }} />
                          <span className="text-white/65 font-body text-sm">{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* What's included */}
                  <div>
                    <p className="text-white/25 text-xs font-body tracking-widest uppercase mb-3">Includes</p>
                    <div className="space-y-2">
                      {svc.items.map(item => (
                        <div key={item} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: svc.color }} />
                          <span className="text-white/45 font-body text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   5. WHY CHOOSE US
═══════════════════════════════════════════════════════════ */
const differentiators = [
  { icon: Zap, title: '2-Minute Lead Response', desc: 'Our WhatsApp automation responds to every enquiry in under 2 minutes — before any competitor can.', stat: '2 min' },
  { icon: Target, title: 'Real Estate Specialists', desc: 'We work exclusively with developers and plotting companies. We understand property funnels, not generic marketing.', stat: '100%' },
  { icon: BarChart3, title: 'Full-Funnel Approach', desc: 'From the first ad click to the site visit booking — every step is tracked, optimized, and reported.', stat: 'Full' },
  { icon: MessageCircle, title: 'AI-Powered Follow-Up', desc: 'Leads who don\'t convert immediately are nurtured for 90 days with intelligent, personalized messages.', stat: '90d' },
  { icon: TrendingUp, title: 'Data-Driven Decisions', desc: 'Every campaign decision backed by real data. Cost per lead, site visit rate, conversion — all visible in real time.', stat: 'Live' },
  { icon: CheckCircle, title: 'Revenue Partner, Not Agency', desc: 'We measure our success by your site visits and sales — not by impressions or likes.', stat: 'ROI' },
]

function WhyUsSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#060810' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal direction="left">
            <div className="sticky top-32">
              <Eyebrow>Why Us</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                We're Not an Agency.<br />
                <span className="gold-text italic">We're Your Revenue Partner.</span>
              </h2>
              <p className="text-white/45 font-body text-lg leading-relaxed mb-8">
                Traditional agencies optimize for impressions and followers. We optimize for one thing: qualified buyers walking into your project site.
              </p>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)' }}>
                <p className="text-white/50 font-body text-sm leading-relaxed italic">
                  "Helping Developers & Plotting Companies Across Nagpur and India Generate More Qualified Buyer Leads."
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="h-px w-8 bg-gold-400/40" />
                  <span className="text-gold-400 text-xs font-body tracking-widest uppercase">CommandGrowth · Based in Nagpur</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4">
            {differentiators.map((d, i) => {
              const Icon = d.icon
              return (
                <Reveal key={d.title} delay={i * 0.08} direction="right">
                  <div className="flex gap-5 p-6 rounded-2xl border border-white/5 group hover:border-gold-500/20 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-body font-semibold text-white mb-1">{d.title}</h3>
                      <p className="text-white/40 font-body text-sm leading-relaxed">{d.desc}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="font-display text-lg font-bold gold-text">{d.stat}</div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   6. CASE STUDIES
═══════════════════════════════════════════════════════════ */
const caseStudies = [
  {
    project: 'Residential Township Project',
    location: 'Nagpur, Maharashtra',
    result: '214 qualified property enquiries in 30 days',
    metrics: [
      { label: 'Enquiries', val: '214', delta: '+180%' },
      { label: 'Site Visits', val: '38', delta: '+47%' },
      { label: 'Cost/Lead', val: '₹320', delta: '-62%' },
    ],
    tag: 'Meta Ads + WhatsApp Automation',
    color: '#D4AF37',
  },
  {
    project: 'Plotting Scheme Launch',
    location: 'Nagpur Outskirts',
    result: 'Response time reduced from 3 hours to 2 minutes',
    metrics: [
      { label: 'Response Time', val: '2 min', delta: '-95%' },
      { label: 'Leads Nurtured', val: '890', delta: '90 days' },
      { label: 'Site Visits', val: '+55%', delta: 'vs prior' },
    ],
    tag: 'WhatsApp AI + CRM',
    color: '#4ade80',
  },
  {
    project: 'Premium Villa Project',
    location: 'Wardha Road, Nagpur',
    result: 'ROI of 8.4x on ad spend within 60 days',
    metrics: [
      { label: 'Ad Spend', val: '₹1.8L', delta: 'Total' },
      { label: 'Bookings', val: '12', delta: 'Confirmed' },
      { label: 'ROI', val: '8.4x', delta: '60 days' },
    ],
    tag: 'Full Funnel System',
    color: '#a78bfa',
  },
]

function CaseStudiesSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#080c18' }}>
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <Eyebrow>Results</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Real Numbers.<br />
            <span className="gold-text italic">Real Developers.</span>
          </h2>
          <p className="text-white/40 font-body text-base mt-4 max-w-lg mx-auto">
            Placeholder results based on our system benchmarks. Your actual results shared in the growth audit call.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.project} delay={i * 0.1}>
              <div className="relative overflow-hidden rounded-2xl h-full group"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${cs.color}18` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = cs.color + '40')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = cs.color + '18')}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${cs.color}60, transparent)` }} />
                <div className="p-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-body font-semibold"
                    style={{ background: `${cs.color}12`, color: cs.color, border: `1px solid ${cs.color}25` }}>
                    {cs.tag}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">{cs.project}</h3>
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin className="w-3 h-3 text-white/25" />
                    <span className="text-white/30 text-xs font-body">{cs.location}</span>
                  </div>
                  <p className="text-white/70 font-body text-base font-semibold mb-6 leading-snug italic">
                    "{cs.result}"
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/5">
                    {cs.metrics.map(m => (
                      <div key={m.label} className="text-center">
                        <div className="font-display text-xl font-bold mb-0.5" style={{ color: cs.color }}>{m.val}</div>
                        <div className="text-white/25 text-xs font-body">{m.label}</div>
                        <div className="text-xs font-body mt-0.5" style={{ color: cs.color }}>{m.delta}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
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
  { q: 'Do you work with all types of real estate projects?', a: 'We work with residential developers, plotting companies, villa projects, and township developers. Our system is built specifically for Indian real estate, not generic businesses.' },
  { q: 'How quickly will we see results?', a: 'Most clients see a significant increase in qualified enquiries within the first 2–3 weeks of running campaigns. Full funnel results — including site visit conversion — typically improve by 30–60 days.' },
  { q: 'What makes you different from a normal digital marketing agency?', a: 'We exclusively serve real estate. We understand RERA, buyer psychology, site visit funnels, and property pricing — things a generic agency doesn\'t. Our entire system is built around getting buyers to your site, not just generating clicks.' },
  { q: 'Do we need an existing CRM?', a: 'No. We set up and manage the entire CRM pipeline for you. If you already have one, we integrate with it seamlessly.' },
  { q: 'What is the minimum budget required for Meta Ads?', a: 'We recommend a minimum ad spend of ₹30,000–₹50,000/month to see meaningful results. We optimize every rupee for maximum qualified leads.' },
  { q: 'How does the WhatsApp automation work?', a: 'When a lead submits a form or enquires, our system sends an instant WhatsApp message within 30–60 seconds, qualifies them with AI-powered questions, and assigns them to the right salesperson — all automatically.' },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#060810' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Questions Developers<br />
            <span className="gold-text italic">Always Ask Us</span>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{ border: open === i ? '1px solid rgba(212,175,55,0.25)' : '1px solid rgba(255,255,255,0.05)',
                  background: open === i ? 'rgba(212,175,55,0.04)' : 'rgba(255,255,255,0.02)' }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  data-cursor>
                  <span className="font-body font-semibold text-white pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                    className="flex-shrink-0">
                    <ChevronDown className="w-5 h-5 text-gold-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="px-6 pb-6 text-white/50 font-body text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   8. FINAL CTA
═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#080c18' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 65%)' }} />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-gold-500/20 mb-8"
            style={{ background: 'rgba(212,175,55,0.06)' }}>
            <MapPin className="w-3 h-3 text-gold-400" />
            <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.2em] uppercase">
              Serving Developers Across Nagpur & India
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Fill Your<br />
            <span className="gold-text italic">Sales Pipeline?</span>
          </h2>
          <p className="text-white/45 font-body text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Book a free 30-minute Growth Audit. We'll analyse your current lead generation, identify the gaps, and show you exactly how many more qualified buyers you could be getting.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" data-cursor
                className="inline-flex items-center gap-3 px-10 py-5 font-bold font-body text-navy-900 text-lg shimmer"
                style={{
                  background: 'linear-gradient(135deg, #e8c84a 0%, #D4AF37 50%, #b8952e 100%)',
                  clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
                  boxShadow: '0 0 60px rgba(212,175,55,0.35)',
                }}>
                Book Free Growth Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a href="https://wa.me/91XXXXXXXXXX" data-cursor
                className="inline-flex items-center gap-3 px-10 py-5 font-semibold font-body text-gold-400 border border-gold-500/30 hover:border-gold-500/60 transition-colors"
                style={{ clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}>
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/5">
            {[
              '✓ No lock-in contracts',
              '✓ Real estate specialists',
              '✓ Results in 30 days',
              '✓ Based in Nagpur',
            ].map(t => (
              <span key={t} className="text-white/30 font-body text-sm">{t}</span>
            ))}
          </div>
        </Reveal>
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
      <WhyUsSection />
      <CaseStudiesSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
