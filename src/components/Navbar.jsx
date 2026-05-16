import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(5, 5, 5, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        pointerEvents: 'auto'
      }}
    >
      {/* Logo */}
      <motion.a
        href="#hero"
        whileHover={{ opacity: 0.8 }}
        style={{
          textDecoration: 'none',
          fontFamily: 'var(--font-head)',
          fontWeight: 800,
          fontSize: '1.2rem',
          color: '#ffffff',
          letterSpacing: '-0.03em',
        }}
      >
        MMH
      </motion.a>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {NAV_LINKS.map((link) => {
          const id = link.href.replace('#', '')
          const isActive = active === id
          return (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setActive(id)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: isActive ? '#ffffff' : '#888888',
                textDecoration: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '30px',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.2s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.color = '#888888'
              }}
            >
              {link.label}
            </motion.a>
          )
        })}
      </div>
    </motion.nav>
  )
}
