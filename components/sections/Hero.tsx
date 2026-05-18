'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, TrendingUp, BarChart3, Search, Zap, MessageCircle, Users } from 'lucide-react'

// ── Animated Counter ────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = Date.now()
        const tick = () => {
          const prog = Math.min((Date.now() - t0) / (duration * 1000), 1)
          const eased = 1 - Math.pow(1 - prog, 3)
          setCount(Math.floor(eased * to))
          if (prog < 1) requestAnimationFrame(tick)
          else setCount(to)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Word-by-word animated heading ───────────────────────────────────────────
function AnimatedHeading({ children, className = '', delay = 0 }: {
  children: string; className?: string; delay?: number
}) {
  const words = children.split(' ')
  return (
    <span className={className} style={{ display: 'block' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: delay + i * 0.06 }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.75, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

// ── Magnetic CTA ─────────────────────────────────────────────────────────────
function MagneticCTA({ href, children, variant = 'primary' }: {
  href: string; children: React.ReactNode; variant?: 'primary' | 'secondary'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 18 })
  const sy = useSpring(y, { stiffness: 280, damping: 18 })

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={e => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width  / 2)) * 0.28)
        y.set((e.clientY - (r.top  + r.height / 2)) * 0.28)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
    >
      <Link href={href} data-cursor
        className={`btn-shimmer inline-flex items-center gap-3 px-8 py-4 font-bold font-body text-sm tracking-wide transition-all duration-300 group ${
          variant === 'primary' ? 'text-navy-900' : 'border border-gold-500/35 text-gold-400 hover:border-gold-500 hover:bg-gold-500/5'
        }`}
        style={variant === 'primary' ? {
          background: 'linear-gradient(135deg, #e8c84a 0%, #D4AF37 50%, #b8952e 100%)',
          clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
          boxShadow: '0 0 36px rgba(212,175,55,0.22)',
        } : {
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}
      >
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </Link>
    </motion.div>
  )
}

// ── Services Marquee ─────────────────────────────────────────────────────────
const services = [
  { icon: Search,         label: 'Local SEO'              },
  { icon: BarChart3,      label: 'Performance Marketing'  },
  { icon: TrendingUp,     label: 'Content Strategy'       },
  { icon: Zap,            label: 'Growth Hacking'         },
  { icon: MessageCircle,  label: 'WhatsApp Marketing'     },
  { icon: Users,          label: 'Influencer Tie-ups'     },
  { icon: Search,         label: 'Google Ads'             },
  { icon: BarChart3,      label: 'Social Media'           },
]

function Marquee() {
  const doubled = [...services, ...services]
  return (
    <div className="relative overflow-hidden py-6 border-y border-gold-500/8">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0A192F, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #0A192F, transparent)' }} />

      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map(({ icon: Icon, label }, i) => (
            <div key={i}
              className="flex items-center gap-3 mx-8 text-white/35 hover:text-gold-400 transition-colors duration-200 cursor-default group">
              <Icon className="w-4 h-4 text-gold-500/40 group-hover:text-gold-400 transition-colors" />
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase whitespace-nowrap">
                {label}
              </span>
              <span className="text-gold-500/20 ml-4">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Floating Orb ─────────────────────────────────────────────────────────────
function Orb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
        filter: 'blur(48px)',
      }}
      animate={{ y: [0, -28, 0], opacity: [0.4, 0.75, 0.4] }}
      transition={{ duration: 7 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ── Growing Bar Chart BG ─────────────────────────────────────────────────────
function GrowthBars() {
  const bars = [0.28, 0.45, 0.38, 0.6, 0.5, 0.72, 0.58, 0.82, 0.7, 0.9, 0.78, 1.0]
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 px-8 opacity-[0.055] pointer-events-none"
      style={{ height: '55%' }}>
      {bars.map((h, i) => (
        <motion.div key={i} className="flex-1 rounded-t-sm"
          style={{ background: 'linear-gradient(to top, #D4AF37, #f0d060)' }}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: h }}
          transition={{ delay: i * 0.07, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

// ── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY   = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOp  = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const stats = [
    { value: 200, suffix: '+', label: 'Clients Served'  },
    { value: 98,  suffix: '%', label: 'Retention Rate'  },
    { value: 5,   suffix: 'x', label: 'Avg. ROI Growth' },
    { value: 3,   suffix: '+', label: 'Years in Market' },
  ]

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0A192F' }}>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Growth bars */}
      <GrowthBars />

      {/* Orbs */}
      <Orb x="8%"  y="18%" size={380} delay={0}   />
      <Orb x="68%" y="8%"  size={260} delay={1.6} />
      <Orb x="82%" y="55%" size={300} delay={0.9} />

      {/* Animated scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3].map(i => (
          <motion.div key={i} className="absolute h-px w-full"
            style={{
              top: `${18 + i * 20}%`,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.07) 40%, rgba(212,175,55,0.14) 50%, rgba(212,175,55,0.07) 60%, transparent)',
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.8 }}
          />
        ))}
      </div>

      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-px h-full opacity-8 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      {/* Content */}
      <motion.div style={{ y: heroY, opacity: heroOp }}
        className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 w-full">
          <div className="max-w-4xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-10"
            >
              <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.32em] uppercase">
                Nagpur's Premier Digital Agency
              </span>
              <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            </motion.div>

            {/* Headline — word-by-word */}
            <h1 className="font-display font-black leading-[0.93] mb-10"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}>
              <AnimatedHeading delay={0.2} className="text-white">Command</AnimatedHeading>
              <AnimatedHeading delay={0.38}
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #f0d060 0%, #D4AF37 40%, #b8952e 70%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                } as React.CSSProperties}
              >Your Growth.</AnimatedHeading>
              <AnimatedHeading delay={0.58}
                className="text-white/50 italic font-normal"
                style={{ fontSize: '0.62em' } as React.CSSProperties}
              >Own the Market.</AnimatedHeading>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-white/50 font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            >
              We engineer digital dominance for ambitious brands. From Nagpur to
              national scale — precision SEO, performance marketing, and
              content that converts.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="flex flex-wrap gap-4 mb-20"
            >
              <MagneticCTA href="/contact" variant="primary">Start Your Growth Journey</MagneticCTA>
              <MagneticCTA href="/services" variant="secondary">Explore Services</MagneticCTA>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gold-500/10"
            >
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="group">
                  <div className="font-display text-3xl md:text-4xl font-bold gold-text mb-1">
                    <Counter to={value} suffix={suffix} duration={2} />
                  </div>
                  <p className="text-white/35 text-xs font-body tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10"
      >
        <Marquee />
      </motion.div>
    </section>
  )
}
