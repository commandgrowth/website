'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin, Play, Target, MessageCircle, Globe, Users, ArrowRight, Zap, TrendingUp
} from 'lucide-react'

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

const services = [
  {
    number: '01',
    icon: MapPin,
    title: 'Hyper-Local SEO & Google Maps',
    tagline: 'Be the destination, not just a pin.',
    desc: 'We make sure your business is the first thing neighbors see when they search "near me." We optimize your Google Business Profile to dominate local map packs, ensuring you aren\'t just on the map — you\'re the destination.',
    metric: '3x',
    metricLabel: 'More Visibility',
    color: '#D4AF37',
    accent: 'rgba(212,175,55,0.12)',
  },
  {
    number: '02',
    icon: Play,
    title: 'Social Media Management',
    tagline: 'Instagram Reels that stop the scroll.',
    desc: 'In 2026, if you aren\'t on the "Explore" page, you don\'t exist. We specialize in high-retention Instagram Reels that showcase your products, your vibe, and your story — turning scrollers into walk-in customers.',
    metric: '10x',
    metricLabel: 'Engagement',
    color: '#e879f9',
    accent: 'rgba(232,121,249,0.08)',
  },
  {
    number: '03',
    icon: Target,
    title: 'Radius-Targeted Performance Marketing',
    tagline: 'Every rupee, within 10km of your door.',
    desc: 'Stop wasting budget on people 50km away. We run precision Meta and Google Ads within a 5–10km radius of your storefront. Our goal is simple: drive immediate footfall and high-intent inquiries.',
    metric: '5x',
    metricLabel: 'Avg. ROAS',
    color: '#38bdf8',
    accent: 'rgba(56,189,248,0.08)',
  },
  {
    number: '04',
    icon: MessageCircle,
    title: 'Next-Gen WhatsApp Marketing',
    tagline: 'India\'s marketplace, automated.',
    desc: 'WhatsApp is India\'s favorite marketplace. We move beyond simple broadcasts by setting up automated catalogs and AI chatbots — turning your WhatsApp into a 24/7 sales engine that handles inquiries and orders while you sleep.',
    metric: '24/7',
    metricLabel: 'Sales Engine',
    color: '#4ade80',
    accent: 'rgba(74,222,128,0.08)',
  },
  {
    number: '05',
    icon: Globe,
    title: 'Vernacular Content',
    tagline: 'The trust factor — their language, your brand.',
    desc: 'Language is the bridge to trust. We create ad campaigns in regional languages alongside Hindi and English. By speaking your customer\'s mother tongue, we\'ve seen brand trust increase by up to 3x.',
    metric: '3x',
    metricLabel: 'Brand Trust',
    color: '#fb923c',
    accent: 'rgba(251,146,60,0.08)',
  },
  {
    number: '06',
    icon: Users,
    title: 'Local Influencer Tie-ups',
    tagline: 'Neighborhood heroes, massive impact.',
    desc: 'We connect you with the "Local Heroes" — the food, lifestyle, and fashion bloggers who actually influence your neighborhood. We manage the partnerships that get people lining up outside your cafe or showroom.',
    metric: '∞',
    metricLabel: 'Word of Mouth',
    color: '#a78bfa',
    accent: 'rgba(167,139,250,0.08)',
  },
]

function ServiceCard({ service, i }: { service: typeof services[0]; i: number }) {
  const Icon = service.icon
  const isEven = i % 2 === 0

  return (
    <Reveal delay={0.1}>
      <motion.div
        className="relative group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card */}
        <div
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden border border-white/5 transition-all duration-500"
          style={{ background: `linear-gradient(135deg, rgba(5,13,26,0.95), rgba(10,25,47,0.9))` }}
        >
          {/* Hover background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
            style={{ background: `radial-gradient(ellipse at ${isEven ? '0% 0%' : '100% 0%'}, ${service.accent} 0%, transparent 60%)` }}
          />

          {/* Animated border on hover */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ border: `1px solid ${service.color}30` }}
          />

          {/* Number */}
          <div
            className="absolute top-8 right-8 font-display text-7xl font-bold opacity-[0.06] leading-none select-none pointer-events-none"
            style={{ color: service.color }}
          >
            {service.number}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${service.color}22, ${service.color}08)`,
                  border: `1px solid ${service.color}30`,
                  boxShadow: `0 0 0 0 ${service.color}00`,
                }}
              >
                <Icon className="w-7 h-7" style={{ color: service.color }} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-body font-semibold tracking-[0.25em] uppercase mb-2"
                style={{ color: service.color }}
              >
                {service.tagline}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-white/50 font-body text-base leading-relaxed mb-6">
                {service.desc}
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-body font-semibold group/link"
                style={{ color: service.color }}
                whileHover={{ x: 4 }}
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </motion.a>
            </div>

            {/* Metric */}
            <div
              className="flex-shrink-0 text-center p-5 rounded-2xl min-w-[100px]"
              style={{
                background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`,
                border: `1px solid ${service.color}20`,
              }}
            >
              <div
                className="font-display text-4xl font-bold leading-none mb-1"
                style={{ color: service.color }}
              >
                {service.metric}
              </div>
              <div className="text-white/35 text-xs font-body tracking-wide uppercase">
                {service.metricLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

function FloatingOrb({ x, y, size, delay, color }: { x: string; y: string; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function ServicesPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <main className="relative overflow-hidden" style={{ background: '#0A192F' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <FloatingOrb x="5%" y="10%" size={400} delay={0} color="rgba(212,175,55,0.15)" />
        <FloatingOrb x="60%" y="5%" size={300} delay={2} color="rgba(212,175,55,0.08)" />
        <FloatingOrb x="80%" y="50%" size={250} delay={1} color="rgba(212,175,55,0.06)" />

        {/* Animated lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${20 + i * 18}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.08) 40%, rgba(212,175,55,0.15) 50%, rgba(212,175,55,0.08) 60%, transparent 100%)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
            />
          ))}
        </div>

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase">
              What We Do
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-8 max-w-4xl"
          >
            <span className="block text-white">Digital Strategies</span>
            <span className="block gold-text italic">Built for the</span>
            <span className="block text-white">Streets of India.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/50 font-body text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            Six battle-tested services engineered for local Indian businesses. 
            No fluff. Just footfall, leads, and growth.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center gap-3"
          >
            <motion.div
              className="w-6 h-10 rounded-full border border-gold-500/30 flex items-start justify-center p-1"
            >
              <motion.div
                className="w-1.5 h-2.5 rounded-full bg-gold-400"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <span className="text-white/25 text-xs font-body tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services List ──────────────────────────────────────── */}
      <section className="relative py-16 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-6">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} i={i} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#050d1a' }}>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />

        <Reveal className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div>
            <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-6">Ready to Grow?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Get a Free <span className="gold-text italic">Store Audit</span>
            </h2>
            <p className="text-white/45 font-body text-lg mb-10">
              We'll analyse your current digital presence and tell you exactly what's holding back your local growth. No charge. No obligation.
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
