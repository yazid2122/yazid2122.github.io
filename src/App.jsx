import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import NeuralCore from './components/3d/NeuralCore'

import './index.css'
import Navbar   from './components/Navbar'
import Hero     from './sections/Hero'
import Skills   from './sections/Skills'
import Projects from './sections/Projects'
import Contact  from './sections/Contact'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg)' }}>
      {/* HUD Navigation (Fixed over everything) */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50 }}>
        <Navbar />
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* 3D Neural Core Background */}
        <NeuralCore />

        {/* Scroll Controls wrapping HTML content */}
        <ScrollControls pages={5} damping={0.25}>
          {/* HTML Overlay (The HUD) */}
          <Scroll html style={{ width: '100vw' }}>
            <div style={{ pointerEvents: 'none' }}>
              <Hero />
              <Skills />
              <Projects />
              <Contact />
              <footer style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                pointerEvents: 'auto'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-3)',
                  letterSpacing: '0.05em',
                }}>
                  {'<ai.dev />'}  ·  {new Date().getFullYear()}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-3)',
                  letterSpacing: '0.05em',
                }}>
                  built with React Three Fiber · Neural Interface
                </span>
              </footer>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
