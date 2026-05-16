import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Token Typing Text ───────────────────────────────────── */
function TokenTyper({ text, delay = 0, speed = 60, style = {}, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]           = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          onDone?.()
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay, speed])

  return (
    <span style={style}>
      {displayed}
      {!done && (
        <span style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: 'var(--neural)',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'blink 0.9s step-end infinite',
        }} />
      )}
    </span>
  )
}

/* ─── Loss Counter Scroll Indicator ──────────────────────────*/
function ScrollIndicator() {
  const [loss, setLoss] = useState(0.847)

  useEffect(() => {
    const onScroll = () => {
      // In a r3f scroll, window scroll is different, so we might just mock the descent
      const scrollY = document.querySelector('.scroll-area')?.scrollTop || 0
      const maxScroll = (document.querySelector('.scroll-area')?.scrollHeight || window.innerHeight * 5) - window.innerHeight
      const pct = scrollY / maxScroll
      if (!isNaN(pct) && pct >= 0) {
        setLoss(Math.max(0.001, 0.847 * (1 - pct)).toFixed(3))
      }
    }
    const scrollArea = document.querySelector('.scroll-area')
    if(scrollArea) {
      scrollArea.addEventListener('scroll', onScroll)
      return () => scrollArea.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.3rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--text-3)',
        letterSpacing: '0.05em',
        zIndex: 2,
        pointerEvents: 'none'
      }}
    >
      <span style={{ color: 'var(--neural)', opacity: 0.6 }}>sys_load: {loss}</span>
      <span style={{ fontSize: '0.9rem' }}>↓</span>
    </motion.div>
  )
}

/* ─── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  const [phase, setPhase] = useState(0)  // 0=prefix, 1=name, 2=role, 3=desc, 4=done

  return (
    <section
      id="hero"
      style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
    >
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: '720px', margin: '0 auto', pointerEvents: 'auto' }}>
        {/* System tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#a0a0a0',
            letterSpacing: '0.12em',
            padding: '6px 16px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)'
          }}>
            ● SYSTEM ONLINE
          </span>
        </motion.div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(2.4rem, 6vw, 5rem)',
          fontWeight: 800,
          color: 'var(--text)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '1rem',
          minHeight: '1.2em',
          textShadow: '0 4px 24px rgba(0,0,0,0.5)'
        }}>
          <TokenTyper
            text="Architect & Developer"
            delay={600}
            speed={80}
            onDone={() => setPhase(1)}
          />
        </h1>

        {/* Role */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
          color: '#00ffff', // Cyan
          letterSpacing: '0.08em',
          marginBottom: '1.5rem',
          minHeight: '1.5em',
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          {phase >= 1 && (
            <TokenTyper
              text="AI  ·  WEBGL  ·  FULLSTACK"
              delay={100}
              speed={30}
              onDone={() => setPhase(2)}
            />
          )}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-2)',
            lineHeight: 1.7,
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
          }}
        >
          Forging the next generation of web applications.<br />
          Bridging the gap between artificial intelligence and human experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#000',
              background: '#fff',
              padding: '0.8rem 2rem',
              borderRadius: '30px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(255, 255, 255, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 255, 255, 0.25)' }}
          >
            View Projects
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
