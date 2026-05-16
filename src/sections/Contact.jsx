import { useState } from 'react'
import { motion } from 'framer-motion'

const SOCIAL = [
  { label: 'GitHub',      icon: '⌨', href: 'https://github.com/',          mono: 'github.com/yourhandle' },
  { label: 'LinkedIn',    icon: '▣', href: 'https://linkedin.com/in/',      mono: 'linkedin.com/in/yourname' },
  { label: 'Hugging Face',icon: '◈', href: 'https://huggingface.co/',       mono: 'huggingface.co/yourname' },
  { label: 'Email',       icon: '✉', href: 'mailto:your@email.com',         mono: 'your@email.com' },
]

const FIELD_STYLE = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '6px',
  color: 'var(--text)',
  fontSize: '0.88rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)
  const [focus, setFocus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  const fieldStyle = (name) => ({
    ...FIELD_STYLE,
    borderColor: focus === name ? 'rgba(0,255,159,0.4)' : 'var(--border-2)',
    boxShadow: focus === name ? '0 0 0 2px rgba(0,255,159,0.06)' : 'none',
  })

  return (
    <section
      id="contact"
      style={{ padding: '8rem 1.5rem', background: 'transparent', pointerEvents: 'none' }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', pointerEvents: 'auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--neural)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            // POST /connect
          </p>
          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            Initialize Connection
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-2)',
            maxWidth: '480px',
          }}>
            Open to AI engineering roles, freelance projects, and collaborations. Send a request.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Left — Social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-3)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              ENDPOINTS
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SOCIAL.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem 1rem',
                    background: 'rgba(10, 10, 10, 0.5)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                    group: true,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,159,0.5)'
                    e.currentTarget.style.background = 'rgba(0,255,159,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.background = 'rgba(10, 10, 10, 0.5)'
                  }}
                >
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-2)', width: '20px', textAlign: 'center' }}>
                    {item.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text)',
                      letterSpacing: '0.02em',
                      marginBottom: '1px',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-3)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.mono}
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-3)', fontSize: '0.75rem' }}>↗</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-3)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              REQUEST BODY  ·  application/json
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(10, 10, 10, 0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}
            >
              {[
                { key: 'name',    label: '"name"',    type: 'text',  placeholder: 'your name' },
                { key: 'email',   label: '"email"',   type: 'email', placeholder: 'your@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--neural)',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.03em',
                  }}>
                    {f.label}:
                  </label>
                  <input
                    type={f.type}
                    required
                    value={form[f.key]}
                    placeholder={f.placeholder}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    onFocus={() => setFocus(f.key)}
                    onBlur={() => setFocus(null)}
                    style={fieldStyle(f.key)}
                  />
                </div>
              ))}

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--neural)',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.03em',
                }}>
                  "message":
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  placeholder="what are you building?"
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocus('message')}
                  onBlur={() => setFocus(null)}
                  style={{ ...fieldStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '0.8rem 2rem',
                  background: sent ? '#166534' : '#fff',
                  border: 'none',
                  borderRadius: '30px',
                  color: sent ? '#86efac' : '#000',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: sent ? '0 4px 14px rgba(22,163,74,0.3)' : '0 4px 14px rgba(255,255,255,0.25)',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = sent ? '0 6px 20px rgba(22,163,74,0.4)' : '0 6px 20px rgba(255,255,255,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = sent ? '0 4px 14px rgba(22,163,74,0.3)' : '0 4px 14px rgba(255,255,255,0.25)' }}
              >
                {sent ? '✓ Sent' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
