'use client'

import Hero from '@/components/sections/Hero'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Search, BarChart3, TrendingUp, ArrowRight, Quote, Star } from 'lucide-react'

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

// ─── Services preview ─────────────────────────────────────────────────────────
const services = [
  {
    icon: Search,
    title: 'Local SEO',
    desc: 'Dominate local search results and capture customers exactly when they need you most.',
    metric: '3x visibility',
  },
  {
    icon: BarChart3,
    title: 'Performance Marketing',
    desc: 'ROI-driven paid campaigns that fill your pipeline with high-intent, qualified leads.',
    metric: '5x ROAS avg.',
  },
  {
    icon: TrendingUp,
    title: 'Content Strategy',
    desc: 'Authority-building content that educates, converts, and compounds in value over time.',
    metric: '10x engagement',
  },
]

function ServiceCard({ service, i }: { service: typeof services[0]; i: number }) {
  const Icon = service.icon
  return (
    <Reveal delay={i * 0.12}>
      <motion.div
        className="relative p-8 rounded-2xl glass-light border border-gold-500/10 card-lift group overflow-hidden"
        whileHover={{ borderColor: 'rgba(212,175,55,0.3)' }}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)' }} />
        
        <div className="w-12 h-12 rounded-xl border border-gold-500/20 flex items-center justify-center mb-6 group-hover:border-gold-500/50 transition-colors duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))' }}>
          <Icon className="w-5 h-5 text-gold-400" />
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-white/50 font-body text-sm leading-relaxed mb-6">{service.desc}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-gold-400 font-body text-xs font-semibold tracking-widest uppercase">{service.metric}</span>
          <ArrowRight className="w-4 h-4 text-gold-500/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </motion.div>
    </Reveal>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "CommandGrowth took our Nagpur business from invisible to #1 in local search within 4 months. Revenue is up 340%.",
    author: "Rajesh Sharma",
    role: "Owner, TechVista Solutions",
    stars: 5,
  },
  {
    quote: "The performance marketing team is elite. Our cost per lead dropped by 60% while volume tripled. Exceptional ROI.",
    author: "Priya Deshmukh",
    role: "Director, Infinia Realty",
    stars: 5,
  },
  {
    quote: "Their content strategy transformed our brand authority. We're now the go-to experts in our niche across Maharashtra.",
    author: "Aman Gupta",
    role: "Founder, ClearPath Advisory",
    stars: 5,
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services Preview */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4">What We Do</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                Services Built for <span className="gold-text italic">Results</span>
              </h2>
              <p className="text-white/45 font-body text-lg max-w-2xl mx-auto">
                Every strategy is engineered with one goal: measurable, compounding growth for your business.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} i={i} />
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-gold-400 font-body font-semibold text-sm tracking-wide hover:text-gold-300 transition-colors group"
              >
                View All Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why CommandGrowth */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 dot-grid opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4">Our Difference</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                  We Don't Manage Campaigns.<br />
                  <span className="gold-text italic">We Engineer Growth.</span>
                </h2>
                <p className="text-white/50 font-body text-lg leading-relaxed mb-8">
                  Most agencies set and forget. We obsessively optimize. Every rupee you spend is tracked, 
                  every conversion analyzed, and every strategy refined until your growth becomes unstoppable.
                </p>
                <div className="space-y-4">
                  {[
                    'Data-driven decisions, not guesswork',
                    'Dedicated strategist for every account',
                    'Weekly performance reports & calls',
                    'No long-term lock-in contracts',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      <span className="text-white/60 font-body text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="p-10 rounded-3xl glass border-gold-glow relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #D4AF37, transparent)', transform: 'translate(30%, -30%)' }} />
                  
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: '₹10Cr+', label: 'Ad Spend Managed' },
                      { value: '200+', label: 'Brands Scaled' },
                      { value: '#1', label: 'Local SEO Rankings' },
                      { value: '48hr', label: 'Avg. Onboarding' },
                    ].map(({ value, label }) => (
                      <div key={label} className="text-center p-4 rounded-xl"
                        style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.08)' }}>
                        <div className="font-display text-2xl font-bold gold-text mb-1">{value}</div>
                        <div className="text-white/35 text-xs font-body tracking-wide">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-32 overflow-hidden" style={{ background: '#050d1a' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4">Client Success</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Results That <span className="gold-text italic">Speak</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl glass-light border border-gold-500/10 h-full flex flex-col card-lift">
                  <Quote className="w-8 h-8 text-gold-500/30 mb-6 flex-shrink-0" />
                  <p className="text-white/65 font-body text-sm leading-relaxed flex-1 mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                      ))}
                    </div>
                    <p className="text-white font-body font-semibold text-sm">{t.author}</p>
                    <p className="text-white/35 font-body text-xs">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase mb-6">Ready?</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Your Competitors Are<br />
              <span className="gold-text italic">Growing Right Now.</span>
            </h2>
            <p className="text-white/45 font-body text-lg mb-10">
              Book a free strategy call. No obligations. Just clear, actionable insight into what it takes to dominate your market.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 font-semibold font-body text-navy-900 text-lg"
                style={{
                  background: 'linear-gradient(135deg, #e8c84a 0%, #D4AF37 50%, #b8952e 100%)',
                  clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
                  boxShadow: '0 0 40px rgba(212,175,55,0.3)',
                }}
              >
                Book Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
