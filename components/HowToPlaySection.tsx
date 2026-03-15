'use client'

const steps = [
  {
    number: '1',
    title: 'Watch the Ball',
    description:
      "The bowler releases the ball from the right side. Track its trajectory and arc as it curves toward you.",
    icon: '👁️',
  },
  {
    number: '2',
    title: 'Time Your Shot',
    description:
      "The timing zone glows near your batsman. Click, tap, or press SPACE when the ball is in the perfect hit zone.",
    icon: '⏱️',
  },
  {
    number: '3',
    title: 'Hit for Runs',
    description:
      "Perfect timing = 6 runs with a golden flash! Good timing = 4 runs. OK timing = 2 runs. Miss = lose a wicket.",
    icon: '🎯',
  },
  {
    number: '4',
    title: 'Score & Combo',
    description:
      "Hit 3+ consecutive shots to activate combo multipliers. The more you chain, the higher your score multiplier!",
    icon: '🔥',
  },
]

export default function HowToPlaySection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="how-to-play"
      style={{
        padding: '100px 0',
        background: '#0f0f0f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(232,108,30,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,108,30,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
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
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
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
            <span>📖</span> QUICK GUIDE
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
            How to{' '}
            <span style={{ color: '#e86c1e' }}>Play</span>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '17px',
              fontWeight: 600,
              maxWidth: '460px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Master the game in minutes with these simple steps
          </p>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '56px',
          }}
          className="steps-grid"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: '36px 24px 30px',
                position: 'relative',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget
                card.style.border = '1px solid rgba(232,108,30,0.3)'
                card.style.transform = 'translateY(-6px)'
                card.style.boxShadow = '0 20px 50px rgba(232,108,30,0.12)'
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
              {/* Connector line (for non-last items) */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    right: '-13px',
                    width: '26px',
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(232,108,30,0.5), rgba(232,108,30,0.1))',
                    zIndex: 1,
                  }}
                  className="connector-line"
                />
              )}

              {/* Step number circle */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #e86c1e, #f97316)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '22px',
                  color: '#ffffff',
                  margin: '0 auto 20px',
                  boxShadow: '0 6px 20px rgba(232,108,30,0.5)',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                style={{
                  fontSize: '30px',
                  marginBottom: '14px',
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '18px',
                  marginBottom: '12px',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  fontWeight: 600,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Controls reference */}
        <div
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(232,108,30,0.15)',
            borderRadius: '16px',
            padding: '28px 36px',
            marginBottom: '40px',
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Controls:
          </div>
          {[
            { key: 'CLICK', desc: 'Swing Bat' },
            { key: 'SPACE', desc: 'Swing Bat' },
            { key: 'TAP', desc: 'Mobile Swing' },
          ].map((ctrl, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  background: 'rgba(232,108,30,0.12)',
                  border: '1px solid rgba(232,108,30,0.3)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  color: '#e86c1e',
                  fontWeight: 800,
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                }}
              >
                {ctrl.key}
              </div>
              <span
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                {ctrl.desc}
              </span>
            </div>
          ))}

          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { runs: '6', label: 'Perfect', color: '#ffd700' },
              { runs: '4', label: 'Good', color: '#e86c1e' },
              { runs: '2', label: 'OK', color: '#22c55e' },
              { runs: '💀', label: 'Miss', color: '#ef4444' },
            ].map((timing) => (
              <div key={timing.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    color: timing.color,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  {timing.runs}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {timing.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => scrollTo('game')}
            style={{
              background: 'linear-gradient(135deg, #e86c1e, #f97316)',
              border: 'none',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '17px',
              cursor: 'pointer',
              padding: '15px 40px',
              borderRadius: '10px',
              fontFamily: "'Nunito', sans-serif",
              boxShadow: '0 6px 25px rgba(232,108,30,0.4)',
              transition: 'all 0.25s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget
              btn.style.transform = 'translateY(-3px)'
              btn.style.boxShadow = '0 10px 35px rgba(232,108,30,0.5)'
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget
              btn.style.transform = 'translateY(0)'
              btn.style.boxShadow = '0 6px 25px rgba(232,108,30,0.4)'
            }}
          >
            <span>🏏</span> See Full Guide — Play Now!
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .connector-line {
            display: none !important;
          }
        }
        @media (max-width: 560px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
