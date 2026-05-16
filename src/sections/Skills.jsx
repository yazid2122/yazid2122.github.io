import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const SKILLS = [
  { name: 'Python',        score: 98.3, category: 'Core',    tier: 'S' },
  { name: 'TypeScript',    score: 92.1, category: 'Frontend',tier: 'S' },
  { name: 'JavaScript',    score: 94.5, category: 'Frontend',tier: 'S' },
  { name: 'Deep Learning', score: 91.7, category: 'ML',      tier: 'A' },
  { name: 'NLP (GPT-2)',   score: 89.2, category: 'AI',      tier: 'A' },
  { name: 'Gradio',        score: 88.0, category: 'Deploy',  tier: 'A' },
  { name: 'Playwright',    score: 96.4, category: 'QA',      tier: 'S' },
  { name: 'CI/CD',         score: 90.1, category: 'DevOps',  tier: 'S' },
  { name: 'Agile',         score: 87.6, category: 'Process', tier: 'A' },
  { name: 'DevOps',        score: 92.8, category: 'DevOps',  tier: 'S' },
]

const TIER_COLOR = {
  S: { color: '#00ff9f', bg: 'rgba(0,255,159,0.08)', border: 'rgba(0,255,159,0.2)' },
  A: { color: '#0066ff', bg: 'rgba(0,102,255,0.08)', border: 'rgba(0,102,255,0.2)' },
  B: { color: '#888888', bg: 'rgba(136,136,136,0.08)', border: 'rgba(136,136,136,0.2)' },
}

/* ─── Animated confidence bar ────────────────────────────── */
function ConfidenceBar({ score, color }) {
  const barRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && barRef.current) {
        barRef.current.style.width = `${score}%`
      }
    }, { threshold: 0.1 })
    if (barRef.current) observer.observe(barRef.current.parentElement)
    return () => observer.disconnect()
  }, [score])

  return (
    <div style={{ height: '2px', background: '#1a1a1a', borderRadius: '1px', overflow: 'hidden', flex: 1 }}>
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: color,
          borderRadius: '1px',
          transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
          boxShadow: `0 0 6px ${color}`,
        }}
      />
    </div>
  )
}

/* ─── Skill Row ─────────────────────────────────────────── */
function SkillRow({ skill, index }) {
  const tier = TIER_COLOR[skill.tier]
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr 80px auto 52px',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.65rem 1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'background 0.15s',
        cursor: 'default',
      }}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
    >
      {/* Rank */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-3)',
        letterSpacing: '0.05em',
      }}>
        #{String(index + 1).padStart(2, '0')}
      </span>

      {/* Name */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text)',
        letterSpacing: '0.02em',
      }}>
        {skill.name}
      </span>

      {/* Confidence bar */}
      <ConfidenceBar score={skill.score} color={tier.color} />

      {/* Score */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: tier.color,
        fontWeight: 700,
        textAlign: 'right',
        letterSpacing: '0.03em',
      }}>
        {skill.score.toFixed(1)}%
      </span>

      {/* Tier badge */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        fontWeight: 700,
        color: tier.color,
        background: tier.bg,
        border: `1px solid ${tier.border}`,
        borderRadius: '3px',
        padding: '1px 6px',
        textAlign: 'center',
        letterSpacing: '0.08em',
      }}>
        {skill.tier}
      </span>
    </motion.div>
  )
}

/* ─── Skills Section ─────────────────────────────────────── */
export default function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: '8rem 1.5rem', background: 'transparent', pointerEvents: 'none' }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', pointerEvents: 'auto' }}>

        {/* Section header */}
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
            // model.capabilities
          </p>
          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            Benchmark Results
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-2)',
          }}>
            Evaluated across {SKILLS.length} capabilities · Last run: today
          </p>
        </motion.div>

        {/* Leaderboard table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(10, 10, 10, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '28px 1fr 80px auto 52px',
            gap: '1rem',
            padding: '0.6rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(255, 255, 255, 0.03)',
          }}>
            {['RANK', 'CAPABILITY', 'CONFIDENCE', 'SCORE', 'TIER'].map((h) => (
              <span key={h} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--text-3)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {SKILLS.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} index={i} />
          ))}

          {/* Footer */}
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-3)',
            }}>
              {SKILLS.filter(s=>s.tier==='S').length} S-tier  ·  {SKILLS.filter(s=>s.tier==='A').length} A-tier  ·  {SKILLS.filter(s=>s.tier==='B').length} B-tier
            </span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['S','A','B'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: TIER_COLOR[t].color,
                  letterSpacing: '0.05em',
                }}>
                  {t}: {TIER_COLOR[t].color === '#00ff9f' ? 'Expert' : t === 'A' ? 'Proficient' : 'Competent'}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
