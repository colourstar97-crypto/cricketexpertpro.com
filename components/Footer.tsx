'use client'

import Link from 'next/link'

const scrollLinks = {
  PLAY: [
    { label: 'Play Now', id: 'game' },
    { label: 'How to Play', id: 'how-to-play' },
    { label: 'Leaderboard', id: 'game' },
    { label: 'High Scores', id: 'game' },
  ],
  INFO: [
    { label: 'About Us', id: 'features' },
    { label: 'Features', id: 'features' },
    { label: 'Game Guide', id: 'how-to-play' },
    { label: 'Contact', id: 'footer' },
  ],
}

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '70px 0 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '60px',
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
                cursor: 'pointer',
              }}
              onClick={() => scrollTo('hero')}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #e86c1e, #f97316)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                }}
              >
                🏏
              </div>
              <div>
                <span
                  style={{
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '20px',
                    fontFamily: "'Nunito', sans-serif",
                    letterSpacing: '-0.5px',
                  }}
                >
                  Cricket
                </span>
                <span
                  style={{
                    color: '#e86c1e',
                    fontWeight: 900,
                    fontSize: '20px',
                    fontFamily: "'Nunito', sans-serif",
                    letterSpacing: '-0.5px',
                  }}
                >
                  ExpertPro
                </span>
              </div>
            </div>

            <p
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '14px',
                lineHeight: 1.7,
                fontWeight: 600,
                maxWidth: '300px',
                marginBottom: '24px',
              }}
            >
              The ultimate browser-based cricket batting game. Time your shots,
              smash sixes, build combos and become the Cricket ExpertPro!
              Play instantly — no download required.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: '𝕏', label: 'Twitter' },
                { icon: 'f', label: 'Facebook' },
                { icon: 'in', label: 'Instagram' },
                { icon: '▶', label: 'YouTube' },
              ].map((social) => (
                <div
                  key={social.label}
                  title={social.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '14px',
                    fontWeight: 700,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(232,108,30,0.15)'
                    el.style.borderColor = 'rgba(232,108,30,0.3)'
                    el.style.color = '#e86c1e'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,255,255,0.06)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                    el.style.color = 'rgba(255,255,255,0.5)'
                  }}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll link columns */}
          {Object.entries(scrollLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0,
                        fontFamily: "'Nunito', sans-serif",
                        transition: 'color 0.2s',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.target as HTMLButtonElement).style.color = '#e86c1e'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.target as HTMLButtonElement).style.color =
                          'rgba(255,255,255,0.45)'
                      }}
                    >
                      → {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal links column */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              LEGAL
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {legalLinks.map((link) => (
                <li key={link.label} style={{ marginBottom: '10px' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontFamily: "'Nunito', sans-serif",
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e86c1e'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                    }}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            © {new Date().getFullYear()} CricketExpertPro. All rights reserved.
            Built with ❤️ for cricket fans worldwide.
          </p>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#22c55e',
                borderRadius: '50%',
                boxShadow: '0 0 8px #22c55e',
                animation: 'pulse 2s infinite',
              }}
            />
            <span
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  )
}
