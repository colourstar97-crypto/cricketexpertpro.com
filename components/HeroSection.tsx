'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 280

    let ballX = 340
    let ballY = 100
    let ballVX = -2.2
    let ballVY = 0.5
    let frame = 0
    let animId: number

    const drawMiniGame = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bg.addColorStop(0, '#0d1b2e')
      bg.addColorStop(1, '#0a0a0a')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Pitch strip
      const pitchGrad = ctx.createLinearGradient(0, 160, 0, 220)
      pitchGrad.addColorStop(0, '#3a2a1a')
      pitchGrad.addColorStop(1, '#2a1a0a')
      ctx.fillStyle = pitchGrad
      ctx.beginPath()
      ctx.roundRect(30, 160, 340, 60, 4)
      ctx.fill()

      // Crease lines
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(80, 160)
      ctx.lineTo(80, 220)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(320, 160)
      ctx.lineTo(320, 220)
      ctx.stroke()

      // Wickets (right)
      ctx.strokeStyle = '#e0d5c5'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      for (let i = 0; i < 3; i++) {
        const wx = 330 + i * 9
        ctx.beginPath()
        ctx.moveTo(wx, 145)
        ctx.lineTo(wx, 165)
        ctx.stroke()
      }
      // Bails
      ctx.strokeStyle = '#e86c1e'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(327, 148)
      ctx.lineTo(351, 148)
      ctx.stroke()

      // Batsman (left)
      const batsmanX = 75
      const batsmanY = 155

      // Body
      ctx.fillStyle = '#3a6fd8'
      ctx.beginPath()
      ctx.roundRect(batsmanX - 10, batsmanY - 50, 20, 40, 4)
      ctx.fill()

      // Head
      ctx.fillStyle = '#f0c870'
      ctx.beginPath()
      ctx.arc(batsmanX, batsmanY - 60, 12, 0, Math.PI * 2)
      ctx.fill()

      // Helmet
      ctx.fillStyle = '#1a3a8a'
      ctx.beginPath()
      ctx.arc(batsmanX, batsmanY - 63, 12, Math.PI, 0)
      ctx.fill()

      // Bat (swing animation)
      const swingAngle = Math.sin(frame * 0.04) * 0.3 - 0.5
      ctx.save()
      ctx.translate(batsmanX + 8, batsmanY - 20)
      ctx.rotate(swingAngle)
      // Handle
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, 40)
      ctx.stroke()
      // Blade
      ctx.fillStyle = '#deb887'
      ctx.beginPath()
      ctx.roundRect(-6, 40, 14, 28, 3)
      ctx.fill()
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

      // Legs
      ctx.fillStyle = '#e0d5c5'
      ctx.fillRect(batsmanX - 9, batsmanY - 10, 7, 20)
      ctx.fillRect(batsmanX + 2, batsmanY - 10, 7, 20)

      // Bowler (right)
      const bowlerX = 300
      const bowlerY = 155

      // Body
      ctx.fillStyle = '#cc3333'
      ctx.beginPath()
      ctx.roundRect(bowlerX - 8, bowlerY - 45, 16, 35, 4)
      ctx.fill()

      // Head
      ctx.fillStyle = '#f0c870'
      ctx.beginPath()
      ctx.arc(bowlerX, bowlerY - 55, 10, 0, Math.PI * 2)
      ctx.fill()

      // Bowling arm animation
      const bowlAngle = -Math.PI / 3 + Math.sin(frame * 0.04) * 0.8
      ctx.save()
      ctx.translate(bowlerX - 8, bowlerY - 35)
      ctx.rotate(bowlAngle)
      ctx.strokeStyle = '#f0c870'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -22)
      ctx.stroke()
      ctx.restore()

      // Ball with movement
      ballX += ballVX
      ballY += ballVY
      ballVY += 0.06 // gravity

      // Reset ball
      if (ballX < 40 || ballY > 220) {
        ballX = 340
        ballY = 95 + Math.random() * 20
        ballVX = -2.2 - Math.random() * 0.5
        ballVY = 0.3 + Math.random() * 0.4
      }

      // Ball shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.beginPath()
      ctx.ellipse(ballX, 215, 6, 3, 0, 0, Math.PI * 2)
      ctx.fill()

      // Ball glow
      const ballGlow = ctx.createRadialGradient(ballX, ballY, 0, ballX, ballY, 12)
      ballGlow.addColorStop(0, 'rgba(232,108,30,0.3)')
      ballGlow.addColorStop(1, 'rgba(232,108,30,0)')
      ctx.fillStyle = ballGlow
      ctx.beginPath()
      ctx.arc(ballX, ballY, 12, 0, Math.PI * 2)
      ctx.fill()

      // Ball
      const ballGrad = ctx.createRadialGradient(ballX - 2, ballY - 2, 1, ballX, ballY, 7)
      ballGrad.addColorStop(0, '#ff4444')
      ballGrad.addColorStop(0.6, '#cc2222')
      ballGrad.addColorStop(1, '#881111')
      ctx.fillStyle = ballGrad
      ctx.beginPath()
      ctx.arc(ballX, ballY, 7, 0, Math.PI * 2)
      ctx.fill()

      // Seam line on ball
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(ballX, ballY, 7, -0.5, 0.5)
      ctx.stroke()

      // Score display
      ctx.fillStyle = 'rgba(232,108,30,0.1)'
      ctx.beginPath()
      ctx.roundRect(10, 10, 100, 30, 6)
      ctx.fill()
      ctx.fillStyle = '#e86c1e'
      ctx.font = 'bold 11px Nunito, sans-serif'
      ctx.fillText('SCORE: 247', 20, 30)

      ctx.fillStyle = 'rgba(255,255,255,0.07)'
      ctx.beginPath()
      ctx.roundRect(120, 10, 80, 30, 6)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = 'bold 11px Nunito, sans-serif'
      ctx.fillText('LEVEL: 3', 132, 30)

      // Wicket hearts
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i < 2 ? '#e86c1e' : 'rgba(255,255,255,0.2)'
        ctx.font = '14px sans-serif'
        ctx.fillText('🏏', 285 + i * 20, 32)
      }

      // "PREVIEW" watermark
      ctx.fillStyle = 'rgba(255,255,255,0.04)'
      ctx.font = 'bold 32px Nunito, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('LIVE PREVIEW', canvas.width / 2, canvas.height / 2 + 50)
      ctx.textAlign = 'left'

      animId = requestAnimationFrame(drawMiniGame)
    }

    drawMiniGame()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1525 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '70px',
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(232,108,30,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(232,108,30,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(232,108,30,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,108,30,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(232,108,30,0.12)',
              border: '1px solid rgba(232,108,30,0.35)',
              color: '#e86c1e',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              padding: '7px 18px',
              borderRadius: '100px',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            <span style={{ fontSize: '14px' }}>⚡</span>
            NO DOWNLOAD NEEDED
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 62px)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '20px',
              fontFamily: "'Nunito', sans-serif",
              letterSpacing: '-1px',
            }}
          >
            The Ultimate{' '}
            <span
              style={{
                color: '#e86c1e',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              Cricket
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #e86c1e, transparent)',
                  borderRadius: '2px',
                }}
              />
            </span>
            <br />
            ExpertPro!
          </h1>

          {/* Subtext */}
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '17px',
              lineHeight: 1.7,
              marginBottom: '36px',
              fontWeight: 600,
              maxWidth: '480px',
            }}
          >
            Master the art of batting! Time your shots perfectly, smash sixes,
            build incredible combos and climb the leaderboard in this
            action-packed browser cricket game.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '28px',
              marginBottom: '36px',
            }}
          >
            {[
              { value: '50K+', label: 'Players' },
              { value: '1M+', label: 'Games Played' },
              { value: '4.9★', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#e86c1e',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 700,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => scrollTo('game')}
              style={{
                background: 'linear-gradient(135deg, #e86c1e, #f97316)',
                border: 'none',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
                padding: '14px 32px',
                borderRadius: '10px',
                fontFamily: "'Nunito', sans-serif",
                boxShadow: '0 6px 25px rgba(232,108,30,0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget
                btn.style.transform = 'translateY(-3px)'
                btn.style.boxShadow = '0 10px 35px rgba(232,108,30,0.55)'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget
                btn.style.transform = 'translateY(0)'
                btn.style.boxShadow = '0 6px 25px rgba(232,108,30,0.45)'
              }}
            >
              <span>🏏</span> Play Now
            </button>
            <button
              onClick={() => scrollTo('how-to-play')}
              style={{
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
                padding: '14px 32px',
                borderRadius: '10px',
                fontFamily: "'Nunito', sans-serif",
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget
                btn.style.borderColor = '#e86c1e'
                btn.style.color = '#e86c1e'
                btn.style.background = 'rgba(232,108,30,0.08)'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget
                btn.style.borderColor = 'rgba(255,255,255,0.2)'
                btn.style.color = '#ffffff'
                btn.style.background = 'transparent'
              }}
            >
              How to Play
            </button>
          </div>
        </div>

        {/* Right - Game Preview Canvas */}
        <div style={{ position: 'relative' }}>
          {/* Outer glow ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-15px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(232,108,30,0.15), transparent, rgba(232,108,30,0.1))',
              border: '1px solid rgba(232,108,30,0.2)',
            }}
          />

          {/* Game window header */}
          <div
            style={{
              background: '#1a1a1a',
              borderRadius: '16px 16px 0 0',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255,255,255,0.07)',
              borderBottom: 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '6px',
              }}
            >
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
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '6px',
                padding: '4px 12px',
                color: 'rgba(255,255,255,0.35)',
                fontSize: '12px',
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
            >
              cricketexpertpro.com/play
            </div>
          </div>

          {/* Canvas */}
          <div
            style={{
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.07)',
              borderTop: 'none',
              borderRadius: '0 0 16px 16px',
              overflow: 'hidden',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            {/* "LIVE" badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(232,108,30,0.9)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  background: '#fff',
                  borderRadius: '50%',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
              LIVE
            </div>
          </div>

          {/* "Click to Play" overlay label */}
          <div
            style={{
              position: 'absolute',
              bottom: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(232,108,30,0.15)',
              border: '1px solid rgba(232,108,30,0.3)',
              color: '#e86c1e',
              fontSize: '13px',
              fontWeight: 700,
              padding: '6px 20px',
              borderRadius: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            ↑ Live Game Preview - Scroll Down to Play!
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            display: none;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
