'use client'

import Link from 'next/link'

interface LegalLayoutProps {
  title: string
  subtitle: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalLayout({ title, subtitle, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: "'Nunito', sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #e86c1e, #f97316)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🏏
            </div>
            <div>
              <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '22px', letterSpacing: '-0.5px' }}>Cricket</span>
              <span style={{ color: '#e86c1e', fontWeight: 900, fontSize: '22px', letterSpacing: '-0.5px' }}>ExpertPro</span>
            </div>
          </Link>
          <Link href="/" style={{
            background: 'linear-gradient(135deg, #e86c1e, #f97316)',
            color: '#ffffff', fontWeight: 800, fontSize: '15px',
            padding: '10px 24px', borderRadius: '8px', textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(232,108,30,0.4)',
            fontFamily: "'Nunito', sans-serif",
          }}>
            ▶ Play Now
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        paddingTop: '130px', paddingBottom: '60px', paddingLeft: '24px', paddingRight: '24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(232,108,30,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(232,108,30,0.12)', border: '1px solid rgba(232,108,30,0.25)', borderRadius: '999px', padding: '6px 16px', marginBottom: '24px' }}>
          <span style={{ width: '6px', height: '6px', background: '#e86c1e', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ color: '#e86c1e', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Legal</span>
        </div>
        <h1 style={{ color: '#ffffff', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 52px)', margin: '0 0 12px', lineHeight: 1.1 }}>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: 600, margin: '0 0 16px' }}>{subtitle}</p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontWeight: 600 }}>Last updated: {lastUpdated}</p>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Link href="/" style={{ color: '#e86c1e', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px' }}>→</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600 }}>{title}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{
          background: '#111111', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px', padding: 'clamp(24px, 5vw, 56px)',
        }}>
          {children}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {[
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Use', href: '/terms-of-use' },
            { label: 'Cookies', href: '/cookies' },
            { label: 'Disclaimer', href: '/disclaimer' },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{
              color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700,
              textDecoration: 'none', padding: '8px 16px',
              background: 'rgba(255,255,255,0.04)', borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.07)', transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e86c1e')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '13px', fontWeight: 600, marginTop: '24px' }}>
          © {new Date().getFullYear()} CricketExpertPro. All rights reserved.
        </p>
      </div>

      <style>{`
        h2 { color: #ffffff; font-weight: 800; font-size: 20px; margin: 40px 0 12px; font-family: 'Nunito', sans-serif; }
        h2:first-child { margin-top: 0; }
        h3 { color: #e86c1e; font-weight: 700; font-size: 16px; margin: 24px 0 8px; font-family: 'Nunito', sans-serif; }
        p { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.8; font-weight: 600; margin: 0 0 16px; font-family: 'Nunito', sans-serif; }
        ul, ol { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.8; font-weight: 600; margin: 0 0 16px; padding-left: 24px; font-family: 'Nunito', sans-serif; }
        li { margin-bottom: 6px; }
        a { color: #e86c1e; }
        hr { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 40px 0; }
        .highlight-box { background: rgba(232,108,30,0.08); border: 1px solid rgba(232,108,30,0.2); border-radius: 10px; padding: 16px 20px; margin: 24px 0; }
        .highlight-box p { color: rgba(255,255,255,0.7); margin: 0; }
      `}</style>
    </div>
  )
}
