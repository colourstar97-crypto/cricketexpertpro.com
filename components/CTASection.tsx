'use client'

export default function CTASection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="cta"
      style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #e86c1e 0%, #f97316 40%, #e86c1e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Floating cricket balls decoration */}
      {[
        { x: '8%', y: '20%', size: 60, opacity: 0.08 },
        { x: '92%', y: '15%', size: 80, opacity: 0.06 },
        { x: '5%', y: '75%', size: 40, opacity: 0.1 },
        { x: '88%', y: '70%', size: 55, opacity: 0.07 },
        { x: '50%', y: '5%', size: 30, opacity: 0.05 },
      ].map((ball, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: ball.x,
            top: ball.y,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            background: `rgba(0,0,0,${ball.opacity})`,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      ))}

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Cricket emoji big */}
        <div
          style={{
            fontSize: '64px',
            marginBottom: '24px',
            display: 'block',
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))',
          }}
        >
          🏏
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.05,
            fontFamily: "'Nunito', sans-serif",
            letterSpacing: '-1px',
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          Ready to Hit Some Sixes?
        </h2>

        {/* Subtext */}
        <p
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '18px',
            lineHeight: 1.6,
            fontWeight: 700,
            marginBottom: '44px',
            maxWidth: '500px',
            margin: '0 auto 44px',
          }}
        >
          Join thousands of cricket fans playing Cricket ExpertPro right now.
          No download. No registration. Just pure cricket action!
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => scrollTo('game')}
            style={{
              background: '#ffffff',
              border: 'none',
              color: '#e86c1e',
              fontWeight: 900,
              fontSize: '17px',
              cursor: 'pointer',
              padding: '15px 40px',
              borderRadius: '10px',
              fontFamily: "'Nunito', sans-serif",
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget
              btn.style.transform = 'translateY(-4px) scale(1.02)'
              btn.style.boxShadow = '0 14px 40px rgba(0,0,0,0.25)'
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget
              btn.style.transform = 'translateY(0) scale(1)'
              btn.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'
            }}
          >
            <span>🏏</span> Start Playing Now
          </button>

          <button
            onClick={() => scrollTo('how-to-play')}
            style={{
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.6)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '17px',
              cursor: 'pointer',
              padding: '15px 40px',
              borderRadius: '10px',
              fontFamily: "'Nunito', sans-serif",
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget
              btn.style.background = 'rgba(255,255,255,0.15)'
              btn.style.borderColor = 'rgba(255,255,255,0.9)'
              btn.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget
              btn.style.background = 'transparent'
              btn.style.borderColor = 'rgba(255,255,255,0.6)'
              btn.style.transform = 'translateY(0)'
            }}
          >
            How to Play
          </button>
        </div>

        {/* Trust badges */}
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            justifyContent: 'center',
            gap: '36px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '⚡', text: 'Instant Play' },
            { icon: '📱', text: 'Mobile Ready' },
            { icon: '🔒', text: 'No Registration' },
            { icon: '🆓', text: '100% Free' },
          ].map((badge) => (
            <div
              key={badge.text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                fontWeight: 800,
              }}
            >
              <span style={{ fontSize: '16px' }}>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
