'use client'

const checklistItems = [
  'Feel the rush of a perfectly timed six',
  'Realistic ball physics and trajectory',
  'Dynamic bowler animations and styles',
  'Responsive bat swing mechanics',
  'Combo streaks with visual flair',
  'Progressive difficulty that keeps you hooked',
  'Instant feedback with score popups',
  'Particle effects on power shots',
]

const cricketCards = [
  {
    emoji: '🔴',
    title: 'THE BALL',
    desc: 'Authentic red cricket ball with realistic arc trajectory and seam movement',
    color: '#cc2222',
  },
  {
    emoji: '🟫',
    title: 'THE PITCH',
    desc: 'Classic cricket pitch with crease markings and fielding zone',
    color: '#8B6914',
  },
  {
    emoji: '🏏',
    title: 'THE SHOT',
    desc: 'Master the perfect timing to drive, cut, pull and sweep for maximum runs',
    color: '#e86c1e',
  },
]

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{
        padding: '100px 0',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orb */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(232,108,30,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="experience-grid"
      >
        {/* Left: Text content */}
        <div>
          {/* Badge */}
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
            <span>🎮</span> THE EXPERIENCE
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              fontFamily: "'Nunito', sans-serif",
              letterSpacing: '-0.5px',
              marginBottom: '20px',
            }}
          >
            Feel the{' '}
            <span style={{ color: '#e86c1e' }}>Thrill</span>
            <br />
            of Every Shot
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '16px',
              lineHeight: 1.7,
              fontWeight: 600,
              marginBottom: '36px',
              maxWidth: '460px',
            }}
          >
            Cricket ExpertPro captures the heart-pounding tension of facing a fast
            bowler. Every delivery is a new challenge, every hit a triumph.
          </p>

          {/* Checklist */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {checklistItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    background: 'rgba(232,108,30,0.15)',
                    border: '1px solid rgba(232,108,30,0.4)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '12px',
                    color: '#e86c1e',
                    fontWeight: 900,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '15px',
                    fontWeight: 700,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cricket cards grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {cricketCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget
                card.style.border = '1px solid rgba(232,108,30,0.25)'
                card.style.transform = 'translateX(6px)'
                card.style.background = '#1e1e1e'
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget
                card.style.border = '1px solid rgba(255,255,255,0.06)'
                card.style.transform = 'translateX(0)'
                card.style.background = '#1a1a1a'
              }}
            >
              {/* Left accent */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  background: `linear-gradient(180deg, ${card.color}, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: `rgba(232,108,30,0.08)`,
                  border: `1px solid rgba(232,108,30,0.2)`,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0,
                }}
              >
                {card.emoji}
              </div>

              {/* Text */}
              <div>
                <h3
                  style={{
                    color: '#e86c1e',
                    fontWeight: 800,
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    fontWeight: 600,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom stats card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(232,108,30,0.1), rgba(232,108,30,0.05))',
              border: '1px solid rgba(232,108,30,0.2)',
              borderRadius: '16px',
              padding: '24px 28px',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { value: '3', label: 'Wickets' },
              { value: '∞', label: 'Combos' },
              { value: '6', label: 'Max Runs' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#e86c1e',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: 700,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
