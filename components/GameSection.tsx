'use client'

import dynamic from 'next/dynamic'

const CricketGame = dynamic(() => import('./CricketGame'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '420px',
        background: '#0d1b35',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '16px',
        fontWeight: 700,
      }}
    >
      Loading Cricket ExpertPro...
    </div>
  ),
})

export default function GameSection() {
  return (
    <section
      id="game"
      style={{
        padding: '100px 0',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background:
            'radial-gradient(ellipse, rgba(232,108,30,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
              marginBottom: '20px',
            }}
          >
            <span>🏏</span> PLAY NOW — FREE
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              fontFamily: "'Nunito', sans-serif",
              letterSpacing: '-0.5px',
              marginBottom: '12px',
            }}
          >
            Cricket{' '}
            <span style={{ color: '#e86c1e' }}>ExpertPro</span>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '16px',
              fontWeight: 600,
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Click / Tap / Press SPACE to swing your bat at the perfect moment!
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '28px',
          }}
          className="stats-row"
        >
          {[
            { icon: '🏆', label: 'Score', desc: 'Build runs' },
            { icon: '⭐', label: 'Best', desc: 'Personal record' },
            { icon: '📈', label: 'Level', desc: 'Increase speed' },
            { icon: '🏏', label: 'Wickets', desc: '3 lives total' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '16px 20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
              <div
                style={{
                  color: '#e86c1e',
                  fontWeight: 800,
                  fontSize: '15px',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Game container */}
        <div
          style={{
            background: '#0d1525',
            border: '1px solid rgba(232,108,30,0.2)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(232,108,30,0.1), 0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Game window header bar */}
          <div
            style={{
              background: '#111111',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: c,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '6px',
                padding: '4px 16px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '13px',
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
            >
              cricketexpertpro.com — Live Game
            </div>
            <div
              style={{
                background: 'rgba(232,108,30,0.15)',
                border: '1px solid rgba(232,108,30,0.3)',
                color: '#e86c1e',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '20px',
              }}
            >
              LIVE
            </div>
          </div>

          {/* Game canvas */}
          <div style={{ padding: '0' }}>
            <CricketGame />
          </div>
        </div>

        {/* Controls legend */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { key: 'CLICK', label: 'Swing Bat' },
            { key: 'SPACE', label: 'Swing Bat' },
            { key: 'TAP', label: 'Mobile' },
          ].map((ctrl) => (
            <div
              key={ctrl.key}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <div
                style={{
                  background: 'rgba(232,108,30,0.1)',
                  border: '1px solid rgba(232,108,30,0.25)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  color: '#e86c1e',
                  fontWeight: 800,
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              >
                {ctrl.key}
              </div>
              <span
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                {ctrl.label}
              </span>
            </div>
          ))}

          <div
            style={{
              height: '20px',
              width: '1px',
              background: 'rgba(255,255,255,0.1)',
              margin: '0 4px',
            }}
          />

          {[
            { runs: '6', label: 'Perfect', color: '#ffd700' },
            { runs: '4', label: 'Good', color: '#e86c1e' },
            { runs: '2', label: 'OK', color: '#22c55e' },
            { runs: '💀', label: 'Miss', color: '#ef4444' },
          ].map((t) => (
            <div
              key={t.label}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span
                style={{
                  color: t.color,
                  fontWeight: 900,
                  fontSize: '14px',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {t.runs}
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
