'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Play, Target, MessageCircle, Globe, Users, ArrowRight } from 'lucide-react'

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

const services = [
  {
    number: '01', icon: MapPin,
    title: 'Hyper-Local SEO & Google Maps',
    tagline: 'Be the destination, not just a pin.',
    desc: 'We make sure your business is the first thing people see when they search "near me." We optimize your Google Business Profile to dominate local map packs — ensuring you aren\'t just on the map, you\'re the destination.',
    metric: '3x', metricLabel: 'More Visibility',
    hoverBg: '#1A1710', color: '#D4AF37',
  },
  {
    number: '02', icon: Play,
    title: 'Social Media Management',
    tagline: 'Instagram Reels that stop the scroll.',
    desc: 'In 2026, if you aren\'t on the "Explore" page, you don\'t exist. We specialize in high-retention Instagram Reels that showcase your products, your vibe, and your story — turning scrollers into walk-in customers.',
    metric: '10x', metricLabel: 'Engagement',
    hoverBg: '#1a0a2e', color: '#e879f9',
  },
  {
    number: '03', icon: Target,
    title: 'Radius-Targeted Performance Marketing',
    tagline: 'Every rupee, within 10km of your door.',
    desc: 'Stop wasting budget on people 50km away. We run precision Meta and Google Ads within a 5–10km radius of your storefront. Drive immediate footfall and high-intent inquiries.',
    metric: '5x', metricLabel: 'Avg. ROAS',
    hoverBg: '#041a2e', color: '#38bdf8',
  },
  {
    number: '04', icon: MessageCircle,
    title: 'Next-Gen WhatsApp Marketing',
    tagline: "India's marketplace, automated.",
    desc: 'WhatsApp is India\'s favorite marketplace. We move beyond simple broadcasts with automated catalogs and AI chatbots — turning your WhatsApp into a 24/7 sales engine that handles inquiries while you sleep.',
    metric: '24/7', metricLabel: 'Sales Engine',
    hoverBg: '#041a0e', color: '#4ade80',
  },
  {
    number: '05', icon: Globe,
    title: 'Vernacular Content',
    tagline: 'The trust factor — their language, your brand.',
    desc: 'Language is the bridge to trust. We create ad campaigns in regional languages alongside Hindi and English. By speaking your customer\'s mother tongue, we\'ve seen brand trust increase by up to 3x.',
    metric: '3x', metricLabel: 'Brand Trust',
    hoverBg: '#1a0e04', color: '#fb923c',
  },
  {
    number: '06', icon: Users,
    title: 'Local Influencer Tie-ups',
    tagline: 'Neighborhood heroes, massive impact.',
    desc: 'We connect you with the "Local Heroes" — the food, lifestyle, and fashion bloggers who actually influence your neighborhood. We manage partnerships that get people lining up outside your showroom.',
    metric: '∞', metricLabel: 'Word of Mouth',
    hoverBg: '#120a2e', color: '#a78bfa',
  },
]

// IMPL 1: Full card background wipes up on hover, all text stays readable
function ServiceCard({ service, i }: { service: typeof services[0]; i: number }) {
  const Icon = service.icon
  return (
    <Reveal delay={i * 0.07}>
      <div className="relative group overflow-hidden border border-white/5 rounded-2xl"
        style={{ transition: 'border-color 0.4s' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = service.color + '30')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
      >
        {/* Default bg */}
        <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-400"
          style={{ background: 'linear-gradient(135deg,rgba(5,13,26,0.95),rgba(10,25,47,0.9))' }} />
        {/* Hover bg — slides up */}
        <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          style={{ background: service.hoverBg, transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
        {/* Ghost number */}
        <div className="absolute top-6 right-6 font-display text-8xl font-black leading-none select-none pointer-events-none opacity-[0.06]"
          style={{ color: service.color }}>{service.number}</div>

        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg,${service.color}20,${service.color}06)`, border: `1px solid ${service.color}30` }}>
              <Icon className="w-6 h-6" style={{ color: service.color }} />
            </div>
          </div>
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase mb-2"
              style={{ color: service.color }}>{service.tagline}</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 leading-tight text-white">
              {service.title}</h3>
            <p className="font-body text-base leading-relaxed mb-6 text-white/50 group-hover:text-white/65 transition-colors duration-300">
              {service.desc}</p>
            <motion.a href="/contact"
              className="inline-flex items-center gap-2 text-sm font-body font-semibold group/link"
              style={{ color: service.color }} whileHover={{ x: 4 }}>
              Learn More
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </motion.a>
          </div>
          {/* Metric */}
          <div className="flex-shrink-0 text-center px-6 py-4 rounded-xl min-w-[90px] transition-all duration-500"
            style={{ background: `${service.color}10`, border: `1px solid ${service.color}20` }}>
            <div className="font-display text-4xl font-black leading-none mb-1 group-hover:scale-110 transition-transform duration-300"
              style={{ color: service.color }}>{service.metric}</div>
            <div className="text-white/35 text-xs font-body tracking-wide uppercase">{service.metricLabel}</div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// IMPL 2: Big editorial text list — giant outlined type, small descriptor right
const bigTextItems = [
  { big: 'LOCAL SEO',        small: 'Google Maps · #1 Rankings · Near Me'          },
  { big: 'PERFORMANCE ADS',  small: 'Meta · Google · 5–10km Radius · 5x ROAS'      },
  { big: 'REELS CONTENT',    small: 'Instagram · Explore Page · 10x Engagement'    },
  { big: 'WHATSAPP AI',      small: 'Automated Catalogs · Chatbots · 24/7 Sales'   },
  { big: 'VERNACULAR',       small: 'Hindi · Regional Languages · 3x Trust'        },
  { big: 'INFLUENCERS',      small: 'Local Heroes · Partnerships · Real Footfall'  },
]

function BigTextSection() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: '#050d1a' }}>
      <Reveal className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.12)' }} />
          <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.35em] uppercase">Our Expertise</p>
          <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.12)' }} />
        </div>
      </Reveal>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {bigTextItems.map(({ big, small }, i) => (
          <Reveal key={big} delay={i * 0.06}>
            <div className="group flex items-baseline justify-between py-5 border-b hover:pl-2 transition-all duration-300"
              style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
              <BigWord text={big} />
              <span className="font-body text-xs tracking-widest uppercase ml-6 shrink-0 transition-colors duration-300 text-white/20 group-hover:text-white/45">
                {small}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function BigWord({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  return (
    <span
      ref={ref}
      className="font-display font-black leading-none tracking-tight select-none cursor-default"
      style={{
        fontSize: 'clamp(32px,5.5vw,76px)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.18)',
        transition: 'color 0.4s ease, -webkit-text-stroke 0.4s ease',
      }}
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.color = '#D4AF37'
        ref.current.style.webkitTextStroke = '0px'
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.color = 'transparent'
        ref.current.style.webkitTextStroke = '1px rgba(255,255,255,0.18)'
      }}
    >{text}</span>
  )
}

function FloatingOrb({ x, y, size, delay, color }: {
  x: string; y: string; size: number; delay: number; color: string
}) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(60px)' }}
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

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <FloatingOrb x="5%" y="10%" size={400} delay={0} color="rgba(212,175,55,0.15)" />
        <FloatingOrb x="60%" y="5%" size={300} delay={2} color="rgba(212,175,55,0.08)" />
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} className="absolute h-px w-full pointer-events-none"
            style={{ top: `${20 + i * 18}%`, background: 'linear-gradient(90deg,transparent 0%,rgba(212,175,55,0.08) 40%,rgba(212,175,55,0.15) 50%,rgba(212,175,55,0.08) 60%,transparent 100%)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
          />
        ))}

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37)' }} />
            <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase">What We Do</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }} />
          </motion.div>

          {/* IMPL 5 — Nagpur removed from hero headline */}
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-8 max-w-4xl">
            <span className="block text-white">Digital Strategies</span>
            <span className="block gold-text italic">Built for</span>
            <span className="block text-white">India.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/50 font-body text-lg md:text-xl leading-relaxed max-w-2xl">
            Six battle-tested services engineered for local Indian businesses.
            No fluff. Just footfall, leads, and growth.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-16 flex items-center gap-3">
            <motion.div className="w-6 h-10 rounded-full border border-gold-500/30 flex items-start justify-center p-1">
              <motion.div className="w-1.5 h-2.5 rounded-full bg-gold-400"
                animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.div>
            <span className="text-white/25 text-xs font-body tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </section>

      {/* IMPL 2 */}
      <BigTextSection />

      {/* IMPL 1 */}
      <section className="relative py-16 pb-32" style={{ background: '#0A192F' }}>
        <Reveal className="max-w-6xl mx-auto px-6 lg:px-8 mb-8">
          <p className="text-white/15 text-xs font-body tracking-[0.3em] uppercase">Hover any card to explore</p>
        </Reveal>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-4">
          {services.map((s, i) => <ServiceCard key={s.number} service={s} i={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#050d1a' }}>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%,rgba(212,175,55,0.07) 0%,transparent 70%)' }} />
        <Reveal className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div>
            <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-6">Ready to Grow?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Get a Free <span className="gold-text italic">Store Audit</span>
            </h2>
            <p className="text-white/45 font-body text-lg mb-10">
              We'll analyse your current digital presence and tell you exactly what's holding your growth back. No charge. No obligation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 font-semibold font-body text-navy-900"
                  style={{ background: 'linear-gradient(135deg,#e8c84a 0%,#D4AF37 50%,#b8952e 100%)',
                    clipPath: 'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)',
                    boxShadow: '0 0 40px rgba(212,175,55,0.25)' }}>
                  Get Free Store Audit <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a href="https://wa.me/91XXXXXXXXXX"
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold font-body text-gold-400 border border-gold-500/40 hover:border-gold-500"
                  style={{ clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}>
                  Chat on WhatsApp <MessageCircle className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
