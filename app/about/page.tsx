'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { BarChart3, Globe, Cpu, ArrowRight, MessageCircle, TrendingUp, Users, Zap, Heart } from 'lucide-react'

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FloatingOrb({ x, y, size, delay, color = 'rgba(212,175,55,0.15)' }: {
  x: string; y: string; size: number; delay: number; color?: string
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={{ y: [0, -25, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 7 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// Animated journey step
function JourneyStep({ step, index }: { step: { icon: any; label: string; sub: string; color: string }; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center relative"
    >
      {/* Connector line (not on last) */}
      {index < 3 && (
        <motion.div
          className="hidden md:block absolute top-10 left-[calc(50%+32px)] h-px"
          style={{ width: 'calc(100% - 64px)', background: `linear-gradient(90deg, ${step.color}60, transparent)` }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        />
      )}
      <motion.div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 relative"
        style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`, border: `1px solid ${step.color}30` }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-8 h-8" style={{ color: step.color }} />
      </motion.div>
      <p className="text-white font-body font-semibold text-sm mb-1">{step.label}</p>
      <p className="text-white/35 font-body text-xs">{step.sub}</p>
    </motion.div>
  )
}

const journeySteps = [
  { icon: TrendingUp, label: 'Sees a Reel', sub: 'Instagram / YouTube', color: '#e879f9' },
  { icon: Globe, label: 'Searches Google', sub: '"near me" query', color: '#38bdf8' },
  { icon: MessageCircle, label: 'WhatsApp Chat', sub: 'Inquiry & catalog', color: '#4ade80' },
  { icon: Heart, label: 'Walks In', sub: 'Your store', color: '#D4AF37' },
]

const whyCards = [
  {
    icon: BarChart3,
    title: 'Data-Driven, Street-Smart',
    desc: 'We combine high-end performance analytics with a deep understanding of local buying behavior. Numbers meet instinct.',
    color: '#D4AF37',
  },
  {
    icon: Globe,
    title: 'Language-First Approach',
    desc: 'We celebrate India\'s diversity by creating content that resonates culturally, not just grammatically. Regional languages = real trust.',
    color: '#38bdf8',
  },
  {
    icon: Cpu,
    title: 'Automation Experts',
    desc: 'We leverage 2026 AI and WhatsApp tools to make your business more efficient. More leads, less manual work.',
    color: '#4ade80',
  },
]

const stats = [
  { value: '200+', label: 'Local Brands Scaled' },
  { value: '₹10Cr+', label: 'Ad Spend Managed' },
  { value: '98%', label: 'Client Retention' },
  { value: '3+', label: 'Years in Market' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <main className="relative overflow-hidden" style={{ background: '#0A192F' }}>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <FloatingOrb x="0%" y="20%" size={500} delay={0} />
        <FloatingOrb x="65%" y="0%" size={300} delay={1.5} />

        {/* Diagonal accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03]"
            style={{ background: 'linear-gradient(225deg, #D4AF37 0%, transparent 60%)' }}
          />
        </div>

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase">Our Story</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-8 max-w-4xl"
          >
            <span className="block text-white">We Don't Just</span>
            <span className="block text-white">Sell Clicks.</span>
            <span className="block gold-text italic mt-2">We Drive Footfall.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/50 font-body text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            Born in Nagpur. Built for India. We're the agency that understands the shop around the corner.
          </motion.p>
        </motion.div>
      </section>

      {/* ── The Local Advantage ────────────────────────────── */}
      <section className="relative py-24" style={{ background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4">The Local Advantage</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  We Focus on the<br />
                  <span className="gold-text italic">Shop Around the Corner.</span>
                </h2>
                <p className="text-white/55 font-body text-lg leading-relaxed mb-6">
                  Most agencies focus on global trends. We focus on the shop around the corner. Based in India, we understand that the Indian consumer journey starts on a Reel, continues through a WhatsApp chat, and ends with a handshake at your store.
                </p>
                <p className="text-white/40 font-body text-base leading-relaxed">
                  We believe local businesses are the backbone of the Indian economy. However, the digital gap is widening. Our mission is to give small-to-mid-sized retailers, cafes, and showrooms the same "big tech" marketing tools used by national brands — at a local scale.
                </p>
              </div>
            </Reveal>

            {/* Stats grid */}
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl text-center card-lift"
                    style={{
                      background: 'rgba(212,175,55,0.04)',
                      border: '1px solid rgba(212,175,55,0.1)',
                    }}
                  >
                    <div className="font-display text-3xl font-bold gold-text mb-2">{value}</div>
                    <div className="text-white/35 text-xs font-body tracking-wide uppercase">{label}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The Indian Consumer Journey ───────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div>
              <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4">Our Understanding</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                The Indian Consumer <span className="gold-text italic">Journey</span>
              </h2>
              <p className="text-white/40 font-body text-base mt-4 max-w-xl mx-auto">
                Every rupee we spend is mapped to a moment in this journey.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {journeySteps.map((step, i) => (
              <JourneyStep key={step.label} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#050d1a' }}>
        <FloatingOrb x="80%" y="20%" size={350} delay={0} color="rgba(212,175,55,0.06)" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div>
              <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4">Why Us</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Three Pillars of <span className="gold-text italic">Our Edge</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {whyCards.map((card, i) => {
              const Icon = card.icon
              return (
                <Reveal key={card.title} delay={i * 0.12}>
                  <motion.div
                    className="relative p-8 rounded-2xl glass-light border border-white/5 overflow-hidden group card-lift"
                    whileHover={{ borderColor: `${card.color}30` }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 30% 0%, ${card.color}10 0%, transparent 60%)` }}
                    />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ background: `linear-gradient(135deg, ${card.color}20, ${card.color}08)`, border: `1px solid ${card.color}25` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-white/50 font-body text-sm leading-relaxed">{card.desc}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>

          {/* Philosophy quote */}
          <Reveal delay={0.3}>
            <div
              className="relative p-10 md:p-14 rounded-3xl text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.12)',
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
              />
              <p className="text-white/25 font-body text-xs tracking-[0.3em] uppercase mb-6">Our Philosophy</p>
              <blockquote className="font-display text-2xl md:text-3xl text-white/80 italic leading-relaxed max-w-3xl mx-auto">
                "Local businesses are the backbone of the Indian economy. We're here to make sure the digital revolution doesn't leave them behind."
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
                <span className="text-gold-400 font-body text-xs tracking-widest uppercase">CommandGrowth</span>
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#0A192F' }}>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
        <Reveal className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Chat on <span className="gold-text italic">WhatsApp</span>
            </h2>
            <p className="text-white/45 font-body text-lg mb-10">
              No lengthy forms. No waiting. Just a direct conversation about how we can grow your local business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold font-body text-navy-900"
                  style={{
                    background: 'linear-gradient(135deg, #e8c84a 0%, #D4AF37 50%, #b8952e 100%)',
                    clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                    boxShadow: '0 0 40px rgba(212,175,55,0.25)',
                  }}
                >
                  Get Free Store Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold font-body text-gold-400 border border-gold-500/40 hover:border-gold-500"
                  style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
                >
                  Chat on WhatsApp
                  <MessageCircle className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
