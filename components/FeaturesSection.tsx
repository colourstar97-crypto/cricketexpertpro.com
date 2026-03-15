'use client'

const features = [
  {
    icon: '🎯',
    title: 'Timing Mastery',
    description:
      'Perfect your shot timing with millisecond precision. Hit the sweet spot for maximum runs and epic shots.',
  },
  {
    icon: '🔥',
    title: 'Combo System',
    description:
      'Chain 3+ consecutive hits to activate combo multipliers. Higher combos = bigger scores and bonus runs!',
  },
  {
    icon: '📈',
    title: 'Level Progression',
    description:
      'Start with slow balls and work your way up. Each level increases ball speed and challenges your reflexes.',
  },
  {
    icon: '🏆',
    title: 'High Score Tracker',
    description:
      'Your personal best is saved locally. Can you beat your own record? Challenge yourself every game!',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description:
      'Tap to bat on any touchscreen device. Perfectly optimized for phones, tablets, and desktop play.',
  },
  {
    icon: '⚡',
    title: 'Instant Play',
    description:
      'No downloads, no installs, no accounts. Just click and play instantly in your browser, anytime.',
  },
]

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        padding: '100px 0',
        background: '#0f0f0f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background:
            'radial-gradient(circle, rgba(232,108,30,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(232,108,30,0.1)',
              border: '1px solid rgba(232,108,30,0.3)',
              color: '#e86c1e',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              padding: '7px 18px',
              borderRadius: '100px',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            <span>🏏</span> WHY PLAY?
          </div>
          <h2
            style={{
              fontSize: 'clamp(30px, 4vw, 52px)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              fontFamily: "'Nunito', sans-serif",
              letterSpacing: '-0.5px',
              marginBottom: '16px',
            }}
          >
            Everything You{' '}
            <span style={{ color: '#e86c1e' }}>Love</span> About Cricket
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '17px',
              fontWeight: 600,
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            We&apos;ve packed all the excitement of real cricket into a fast,
            fun browser game you can play anywhere.
          </p>
        </div>

        {/* Features grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="features-grid"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '32px 28px',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget
                card.style.border = '1px solid rgba(232,108,30,0.3)'
                card.style.transform = 'translateY(-6px)'
                card.style.boxShadow = '0 20px 50px rgba(232,108,30,0.15)'
                card.style.background = '#1e1e1e'
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget
                card.style.border = '1px solid rgba(255,255,255,0.06)'
                card.style.transform = 'translateY(0)'
                card.style.boxShadow = 'none'
                card.style.background = '#1a1a1a'
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #e86c1e, transparent)',
                  opacity: 0.6,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(232,108,30,0.12)',
                  border: '1px solid rgba(232,108,30,0.25)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  marginBottom: '20px',
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '19px',
                  marginBottom: '10px',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '15px',
                  lineHeight: 1.65,
                  fontWeight: 600,
                }}
              >
                {feature.description}
              </p>

              {/* Corner decoration */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'radial-gradient(circle, rgba(232,108,30,0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
