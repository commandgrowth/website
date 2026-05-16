'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Phone, MessageCircle, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// GOOGLE SHEETS SETUP:
// 1. Go to your Google Sheet → Extensions → Apps Script
// 2. Paste the Apps Script from GOOGLE_APPS_SCRIPT.js (provided separately)
// 3. Deploy as a Web App (Execute as: Me, Who has access: Anyone)
// 4. Copy the Web App URL and paste it below ↓
// ─────────────────────────────────────────────────────────────
const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FloatingOrb({ x, y, size, delay, color = 'rgba(212,175,55,0.12)' }: {
  x: string; y: string; size: number; delay: number; color?: string
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 8 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

type FormData = {
  name: string
  email: string
  phone: string
  businessName: string
  city: string
  service: string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const services = [
  'Hyper-Local SEO & Google Maps',
  'Social Media Management (Reels)',
  'Radius-Targeted Performance Marketing',
  'WhatsApp Marketing & Automation',
  'Vernacular Content Creation',
  'Local Influencer Tie-ups',
  'Full Growth Package',
  'Not Sure Yet — Advise Me',
]

function InputField({
  label, name, type = 'text', value, onChange, placeholder, required = false
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative">
      <label className="block text-white/50 font-body text-xs font-semibold tracking-widest uppercase mb-2">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-white/[0.03] border text-white font-body text-sm px-5 py-4 rounded-xl outline-none transition-all duration-300 placeholder:text-white/20"
          style={{
            borderColor: focused ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.07)',
            boxShadow: focused ? '0 0 0 3px rgba(212,175,55,0.08)' : 'none',
          }}
        />
        {/* Bottom gold line animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-px rounded-full"
          style={{ background: 'linear-gradient(90deg, #D4AF37, #e8c84a)' }}
          animate={{ width: focused ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [focused, setFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Send to Google Sheets via Apps Script
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      })

      // no-cors means we can't read the response status, so assume success
      setStatus('success')
      setForm({ name: '', email: '', phone: '', businessName: '', city: '', service: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <main className="relative overflow-hidden" style={{ background: '#0A192F' }}>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <FloatingOrb x="5%" y="10%" size={400} delay={0} />
        <FloatingOrb x="70%" y="5%" size={300} delay={1.5} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span className="text-gold-400 text-xs font-body font-semibold tracking-[0.3em] uppercase">Get In Touch</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl"
          >
            <span className="block text-white">Let's Build Your</span>
            <span className="block gold-text italic">Growth Story.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/50 font-body text-lg max-w-xl"
          >
            Fill in the form and we'll get back to you within 24 hours with a free store audit — no obligations.
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <section className="relative py-8 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* ─ Contact Info ─────────────────────────────── */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="space-y-8">
                  {/* Info cards */}
                  {[
                    { icon: MapPin, label: 'Our Location', value: 'Nagpur, Maharashtra, India', color: '#D4AF37' },
                    { icon: Mail, label: 'Email Us', value: 'hello@commandgrowth.com', color: '#38bdf8', href: 'mailto:hello@commandgrowth.com' },
                    { icon: Phone, label: 'Call Us', value: '+91 XX XXXX XXXX', color: '#4ade80', href: 'tel:+91XXXXXXXXXX' },
                    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat directly with our team', color: '#25D366', href: 'https://wa.me/91XXXXXXXXXX' },
                  ].map(({ icon: Icon, label, value, color, href }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `linear-gradient(135deg, ${color}20, ${color}08)`, border: `1px solid ${color}25` }}
                      >
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <div>
                        <p className="text-white/30 font-body text-xs tracking-widest uppercase mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-white font-body font-medium text-sm hover:text-gold-400 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-white font-body font-medium text-sm">{value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* WhatsApp CTA */}
                  <motion.a
                    href="https://wa.me/91XXXXXXXXXX"
                    className="flex items-center gap-3 px-6 py-4 rounded-xl font-body font-semibold text-sm transition-all duration-300 group"
                    style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', color: '#25D366' }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(37,211,102,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp Now
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  {/* Response promise */}
                  <div
                    className="p-5 rounded-xl"
                    style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)' }}
                  >
                    <p className="text-gold-400 font-body text-xs font-semibold tracking-widest uppercase mb-2">Our Promise</p>
                    <p className="text-white/50 font-body text-sm leading-relaxed">
                      Every inquiry gets a personal reply within <span className="text-white font-semibold">24 hours</span>. You'll speak to a strategist, not a bot.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ─ Form ─────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <Reveal delay={0.15}>
                <div
                  className="relative p-8 md:p-10 rounded-3xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10,25,47,0.95), rgba(5,13,26,0.95))',
                    border: '1px solid rgba(212,175,55,0.1)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at top right, #D4AF37, transparent 70%)' }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}
                  />

                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
                        >
                          <CheckCircle className="w-10 h-10 text-gold-400" />
                        </motion.div>
                        <h3 className="font-display text-3xl font-bold text-white mb-3">You're in!</h3>
                        <p className="text-white/50 font-body text-base max-w-sm">
                          We've received your details. Our team will reach out within 24 hours with your free store audit.
                        </p>
                        <motion.button
                          onClick={() => setStatus('idle')}
                          className="mt-8 text-gold-400 font-body text-sm underline underline-offset-4 hover:text-gold-300"
                          whileHover={{ x: 2 }}
                        >
                          Submit another inquiry
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="mb-2">
                          <h3 className="font-display text-2xl font-bold text-white mb-1">Get Your Free Store Audit</h3>
                          <p className="text-white/35 font-body text-sm">Takes 2 minutes. Results are priceless.</p>
                        </div>

                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <InputField label="Your Name" name="name" value={form.name} onChange={handleChange} placeholder="Rajesh Sharma" required />
                          <InputField label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} placeholder="My Store Pvt Ltd" required />
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <InputField label="Phone / WhatsApp" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                          <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="hello@yourbiz.com" required />
                        </div>

                        {/* City */}
                        <InputField label="City / Area" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Nagpur, Dharampeth" required />

                        {/* Service select */}
                        <div>
                          <label className="block text-white/50 font-body text-xs font-semibold tracking-widest uppercase mb-2">
                            Service Interested In <span className="text-gold-400">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="service"
                              value={form.service}
                              onChange={handleChange}
                              required
                              onFocus={() => setFocused(true)}
                              onBlur={() => setFocused(false)}
                              className="w-full bg-white/[0.03] border text-white font-body text-sm px-5 py-4 rounded-xl outline-none transition-all duration-300 appearance-none cursor-pointer"
                              style={{
                                borderColor: focused ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.07)',
                                boxShadow: focused ? '0 0 0 3px rgba(212,175,55,0.08)' : 'none',
                                color: form.service ? 'white' : 'rgba(255,255,255,0.2)',
                              }}
                            >
                              <option value="" disabled style={{ background: '#0A192F' }}>Select a service…</option>
                              {services.map(s => (
                                <option key={s} value={s} style={{ background: '#0A192F', color: 'white' }}>{s}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-4 h-4 text-gold-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-white/50 font-body text-xs font-semibold tracking-widest uppercase mb-2">
                            Tell Us About Your Business
                          </label>
                          <div className="relative">
                            <textarea
                              name="message"
                              value={form.message}
                              onChange={handleChange}
                              rows={4}
                              placeholder="e.g. We run a cafe in Sitabuldi and want to increase walk-in customers through local SEO and Instagram Reels..."
                              className="w-full bg-white/[0.03] border border-white/[0.07] text-white font-body text-sm px-5 py-4 rounded-xl outline-none transition-all duration-300 placeholder:text-white/20 resize-none focus:border-gold-500/50 focus:shadow-none"
                              style={{ boxShadow: 'none' }}
                              onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                            />
                          </div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {status === 'error' && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3 p-4 rounded-xl"
                              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                            >
                              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                              <p className="text-red-400 font-body text-sm">Something went wrong. Please try WhatsApp instead.</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={status === 'loading'}
                          className="relative w-full py-4 font-semibold font-body text-navy-900 text-base overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #e8c84a 0%, #D4AF37 50%, #b8952e 100%)',
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            boxShadow: '0 0 40px rgba(212,175,55,0.2)',
                            opacity: status === 'loading' ? 0.7 : 1,
                          }}
                          whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                          whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                        >
                          {/* Shimmer */}
                          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />

                          <span className="relative flex items-center justify-center gap-3">
                            {status === 'loading' ? (
                              <>
                                <motion.div
                                  className="w-4 h-4 rounded-full border-2 border-navy-900 border-t-transparent"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                />
                                Sending…
                              </>
                            ) : (
                              <>
                                Get My Free Store Audit
                                <Send className="w-4 h-4" />
                              </>
                            )}
                          </span>
                        </motion.button>

                        <p className="text-white/20 font-body text-xs text-center">
                          No spam. No cold calls. Just real growth advice from a real team.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
