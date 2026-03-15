'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled
          ? 'rgba(10, 10, 10, 0.95)'
          : 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(232,108,30,0.2)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div
          onClick={() => scrollTo('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, #e86c1e, #f97316)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 15px rgba(232,108,30,0.4)',
            }}
          >
            🏏
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span
              style={{
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '22px',
                letterSpacing: '-0.5px',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Cricket
            </span>
            <span
              style={{
                color: '#e86c1e',
                fontWeight: 900,
                fontSize: '22px',
                letterSpacing: '-0.5px',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              ExpertPro
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          {[
            { label: 'Home', id: 'hero' },
            { label: 'Play', id: 'game' },
            { label: 'How to Play', id: 'how-to-play' },
            { label: 'About', id: 'features' },
            { label: 'Contact', id: 'footer' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.75)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                fontFamily: "'Nunito', sans-serif",
                padding: '4px 0',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLButtonElement).style.color = '#e86c1e'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)'
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('game')}
            style={{
              background: 'linear-gradient(135deg, #e86c1e, #f97316)',
              border: 'none',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              padding: '10px 24px',
              borderRadius: '8px',
              fontFamily: "'Nunito', sans-serif",
              boxShadow: '0 4px 15px rgba(232,108,30,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'
              ;(e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(232,108,30,0.5)'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLButtonElement).style.transform = 'translateY(0)'
              ;(e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(232,108,30,0.4)'
            }}
          >
            Play Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#e86c1e',
                borderRadius: '2px',
                transition: 'all 0.3s',
                transform:
                  menuOpen && i === 0
                    ? 'rotate(45deg) translate(5px, 5px)'
                    : menuOpen && i === 2
                    ? 'rotate(-45deg) translate(5px, -5px)'
                    : menuOpen && i === 1
                    ? 'scaleX(0)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: '#111111',
            borderTop: '1px solid rgba(232,108,30,0.2)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {[
            { label: 'Home', id: 'hero' },
            { label: 'Play', id: 'game' },
            { label: 'How to Play', id: 'how-to-play' },
            { label: 'About', id: 'features' },
            { label: 'Contact', id: 'footer' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "'Nunito', sans-serif",
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('game')}
            style={{
              background: 'linear-gradient(135deg, #e86c1e, #f97316)',
              border: 'none',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '16px',
              cursor: 'pointer',
              padding: '12px 24px',
              borderRadius: '8px',
              fontFamily: "'Nunito', sans-serif",
              marginTop: '8px',
            }}
          >
            Play Now
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
