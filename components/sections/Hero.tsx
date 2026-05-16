'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, TrendingUp, BarChart3, Search, Zap } from 'lucide-react'

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  // ✅ Use a ref (not state) so the IntersectionObserver callback always
  //    reads the latest value without needing to be in the dep array.
  const hasStarted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          const startTime = Date.now()
          const tick = () => {
            const elapsed = (Date.now() - startTime) / (duration * 1000)
            const progress = Math.min(elapsed, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * to))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(to)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    // ✅ Always disconnect on unmount
    return () => observer.disconnect()
  }, [to, duration]) // ✅ No 'started' state in deps — ref handles it

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Animated bar chart background ────────────────────────────────────────────
function GrowthBars() {
  const bars = [0.3, 0.5, 0.4, 0.65, 0.55, 0.75, 0.6, 0.85, 0.72, 0.92, 0.8, 1.0]
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 px-8 opacity-[0.07] pointer-events-none"
      style={{ height: '55%' }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{ background: 'linear-gradient(to top, #D4AF37, #f0d060)' }}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: h }}
          transition={{
            delay: i * 0.08,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  )
}

// ─── Floating orb ─────────────────────────────────────────────────────────────
function FloatingOrb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ─── Magnetic CTA Button ────────────────────────────────────────────────────────
function MagneticCTA({ href, children, variant = 'primary' }: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href={href}
        className={`inline-flex items-center gap-3 px-8 py-4 font-semibold font-body text-sm tracking-wide transition-all duration-300 group ${
          variant === 'primary'
            ? 'text-navy-900'
            : 'border border-gold-500/40 text-gold-400 hover:border-gold-500 hover:bg-gold-500/5'
        }`}
        style={variant === 'primary' ? {
          background: 'linear-gradient(135deg, #e8c84a 0%, #D4AF37 50%, #b8952e 100%)',
          clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
        } : {
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}
      >
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  )
}

// ─── Services Marquee ─────────────────────────────────────────────────────────
const services = [
  { icon: Search, label: 'Local SEO' },
  { icon: BarChart3, label: 'Performance Marketing' },
  { icon: TrendingUp, label: 'Content Strategy' },
  { icon: Zap, label: 'Growth Hacking' },
  { icon: Search, label: 'Google Ads' },
  { icon: BarChart3, label: 'Social Media' },
  { icon: TrendingUp, label: 'Brand Identity' },
  { icon: Zap, label: 'Lead Generation' },
]

function Marquee() {
  const doubled = [...services, ...services]
  return (
    <div className="relative overflow-hidden py-6 border-y border-gold-500/10">
      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 mx-8 text-white/40 hover:text-gold-400 transition-colors duration-200 cursor-default">
              <Icon className="w-4 h-4 text-gold-500/50" />
              <span className="text-sm font-body font-medium tracking-widest uppercase whitespace-nowrap">
                {label}
              </span>
              <span className="text-gold-500/30 ml-4">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const stats = [
    { value: 200, suffix: '+', label: 'Clients Served' },
    { value: 98, suffix: '%', label: 'Retention Rate' },
    { value: 5, suffix: 'x', label: 'Avg. ROI Growth' },
    { value: 3, suffix: '+', label: 'Years in Market' },
  ]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#0A192F' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      {/* Growth bars background */}
      <GrowthBars />

      {/* Floating orbs */}
      <FloatingOrb x="10%" y="20%" size={300} delay={0} />
      <FloatingOrb x="70%" y="10%" size={200} delay={1.5} />
      <FloatingOrb x="85%" y="60%" size={250} delay={0.8} />

      {/* Diagonal gold line accent */}
      <div className="absolute top-0 right-0 w-px h-full opacity-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 w-full">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase">
                Nagpur's Premier Digital Agency
              </span>
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
            >
              <span className="block text-white">Command</span>
              <span className="block gold-text">Your Growth.</span>
              <span className="block text-white/60 text-4xl md:text-5xl lg:text-6xl font-normal italic mt-2">
                Own the Market.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-white/55 font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            >
              We engineer digital dominance for ambitious brands. From Nagpur to 
              national scale — precision SEO, performance marketing, and 
              content that converts.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-20"
            >
              <MagneticCTA href="/contact" variant="primary">
                Start Your Growth Journey
              </MagneticCTA>
              <MagneticCTA href="/services" variant="secondary">
                Explore Services
              </MagneticCTA>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gold-500/10"
            >
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="group">
                  <div className="font-display text-3xl md:text-4xl font-bold gold-text mb-1">
                    <Counter to={value} suffix={suffix} duration={2} />
                  </div>
                  <p className="text-white/40 text-xs font-body tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee at the bottom of hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative z-10"
      >
        <Marquee />
      </motion.div>
    </section>
  )
}
