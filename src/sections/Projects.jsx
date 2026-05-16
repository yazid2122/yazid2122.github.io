import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    method: 'GET',
    endpoint: '/repo/playwright-ecommerce-tests',
    name: 'E-Commerce Test Automation',
    status: 'PRODUCTION',
    latency: '1.2s avg',
    description: 'Comprehensive automated testing suite for e-commerce platforms. Built with Playwright and TypeScript, featuring full CI/CD pipeline integration for robust regression testing.',
    stack: ['Playwright', 'TypeScript', 'CI/CD'],
    response: `{\n  "tests_passed": 142,\n  "coverage": "94%",\n  "status": "stable"\n}`,
    github: 'https://github.com/yazid212/playwright-ecommerce-tests',
    demo: '#',
  },
  {
    id: 2,
    method: 'POST',
    endpoint: '/repo/tp_nlp_gpt2',
    name: 'GPT-2 Text Generation',
    status: 'PRODUCTION',
    latency: '2.4s avg',
    description: 'Natural Language Processing implementation utilizing the GPT-2 transformer architecture. Fine-tuned for context-aware text generation and sequence completion.',
    stack: ['Python', 'PyTorch', 'Transformers', 'NLP'],
    response: `{\n  "model": "gpt2-custom",\n  "loss": 0.14,\n  "perplexity": 12.4\n}`,
    github: 'https://github.com/yazid212/tp_nlp_gpt2',
    demo: '#',
  },
  {
    id: 3,
    method: 'GET',
    endpoint: '/repo/devops-capstone-project',
    name: 'CI/CD DevOps Capstone',
    status: 'PRODUCTION',
    latency: '45ms avg',
    description: 'End-to-end DevOps pipeline demonstrating modern continuous integration and deployment strategies. Features Docker containerization, automated testing, and seamless GitHub Actions integration.',
    stack: ['DevOps', 'Docker', 'GitHub Actions', 'CI/CD'],
    response: `{\n  "build": "success",\n  "deploy_time": "1m 12s",\n  "environments": ["staging", "prod"]\n}`,
    github: 'https://github.com/yazid212/devops-capstone-project',
    demo: '#',
  },
]

const METHOD_STYLE = {
  POST: { color: '#00ff9f', bg: 'rgba(0,255,159,0.08)', border: 'rgba(0,255,159,0.2)' },
  GET:  { color: '#0066ff', bg: 'rgba(0,102,255,0.08)', border: 'rgba(0,102,255,0.2)' },
}

const STATUS_STYLE = {
  PRODUCTION: { color: '#00ff9f', dot: '#00ff9f' },
  BETA:       { color: '#ca8a04', dot: '#ca8a04' },
  DEV:        { color: '#444',    dot: '#333' },
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)
  const method = METHOD_STYLE[project.method]
  const status = STATUS_STYLE[project.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{
        border: `1px solid ${open ? 'rgba(0,255,159,0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '10px',
        overflow: 'hidden',
        background: open ? 'rgba(0,255,159,0.05)' : 'rgba(10, 10, 10, 0.5)',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'pointer',
      }}
      onClick={() => setOpen(o => !o)}
    >
      {/* Card header — always visible */}
      <div style={{
        padding: '1.1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        {/* Method badge */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          fontWeight: 700,
          color: method.color,
          background: method.bg,
          border: `1px solid ${method.border}`,
          borderRadius: '4px',
          padding: '2px 8px',
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}>
          {project.method}
        </span>

        {/* Endpoint */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.83rem',
          fontWeight: 600,
          color: 'var(--text)',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {project.endpoint}
        </span>

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: status.dot,
            boxShadow: project.status === 'PRODUCTION' ? `0 0 6px ${status.dot}` : 'none',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.63rem',
            color: status.color,
            letterSpacing: '0.08em',
          }}>
            {project.status}
          </span>
        </div>

        {/* Latency */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.63rem',
          color: 'var(--text-3)',
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}>
          ⏱ {project.latency}
        </span>

        {/* Expand toggle */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-3)',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(90deg)' : 'none',
          flexShrink: 0,
        }}>
          ▶
        </span>
      </div>

      {/* Expanded body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
            }}>
              {/* Left — description + stack + links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-3)',
                    letterSpacing: '0.1em',
                    marginBottom: '0.4rem',
                  }}>
                    DESCRIPTION
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--text-2)',
                    lineHeight: 1.65,
                  }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-3)',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}>
                    DEPENDENCIES
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.stack.map(s => (
                      <span key={s} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-2)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '3px',
                        padding: '2px 8px',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <a
                    href={project.github}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-3)',
                      textDecoration: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '5px',
                      padding: '0.4rem 0.9rem',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)' }}
                  >
                    ⌨ GitHub
                  </a>
                  <a
                    href={project.demo}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--neural)',
                      textDecoration: 'none',
                      border: '1px solid rgba(0,255,159,0.25)',
                      borderRadius: '5px',
                      padding: '0.4rem 0.9rem',
                      background: 'rgba(0,255,159,0.05)',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,159,0.12)'; e.currentTarget.style.borderColor = 'rgba(0,255,159,0.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,159,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,255,159,0.25)' }}
                  >
                    ↗ Live Demo
                  </a>
                </div>
              </div>

              {/* Right — response body */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--text-3)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}>
                  RESPONSE  ·  200 OK
                </p>
                <pre style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#a8ff78',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  padding: '1rem',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {project.response}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: '8rem 1.5rem', background: 'transparent', pointerEvents: 'none' }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', pointerEvents: 'auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--neural)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            // deployed.endpoints
          </p>
          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            AI Projects
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-2)',
          }}>
            Click any endpoint to expand the response · {PROJECTS.filter(p => p.status === 'PRODUCTION').length} in production
          </p>
        </motion.div>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
