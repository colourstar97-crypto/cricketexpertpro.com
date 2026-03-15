'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
  maxLife: number
  size: number
  type: 'star' | 'circle' | 'square'
}

interface ScorePopup {
  x: number
  y: number
  text: string
  color: string
  life: number
  maxLife: number
  vy: number
}

interface GameState {
  phase: 'start' | 'playing' | 'gameover'
  score: number
  bestScore: number
  wickets: number
  level: number
  combo: number
  maxCombo: number
  ballX: number
  ballY: number
  ballStartX: number
  ballStartY: number
  ballEndX: number
  ballEndY: number
  ballProgress: number
  ballSpeed: number
  ballActive: boolean
  batSwinging: boolean
  batAngle: number
  batTargetAngle: number
  swingResult: 'none' | 'perfect' | 'good' | 'ok' | 'miss'
  swingCooldown: number
  bowlerArmAngle: number
  bowlerBowling: boolean
  particles: Particle[]
  scorePopups: ScorePopup[]
  screenShake: number
  glowEffect: number
  glowColor: string
  ballTrailX: number[]
  ballTrailY: number[]
  waitTimer: number
  levelUpFlash: number
}

export default function CricketGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<GameState>({
    phase: 'start',
    score: 0,
    bestScore: 0,
    wickets: 3,
    level: 1,
    combo: 0,
    maxCombo: 0,
    ballX: 0,
    ballY: 0,
    ballStartX: 0,
    ballStartY: 0,
    ballEndX: 0,
    ballEndY: 0,
    ballProgress: 0,
    ballSpeed: 0.008,
    ballActive: false,
    batSwinging: false,
    batAngle: -Math.PI / 6,
    batTargetAngle: -Math.PI / 6,
    swingResult: 'none',
    swingCooldown: 0,
    bowlerArmAngle: -Math.PI / 2,
    bowlerBowling: false,
    particles: [],
    scorePopups: [],
    screenShake: 0,
    glowEffect: 0,
    glowColor: '#e86c1e',
    ballTrailX: [],
    ballTrailY: [],
    waitTimer: 60,
    levelUpFlash: 0,
  })
  const animFrameRef = useRef<number>(0)
  const canvasSizeRef = useRef({ width: 800, height: 420 })

  const getBestScore = useCallback(() => {
    try {
      return parseInt(localStorage.getItem('cricket_best') || '0', 10)
    } catch {
      return 0
    }
  }, [])

  const saveBestScore = useCallback((score: number) => {
    try {
      localStorage.setItem('cricket_best', String(score))
    } catch {}
  }, [])

  const spawnParticles = useCallback(
    (x: number, y: number, type: 'perfect' | 'good' | 'ok', count: number) => {
      const state = gameStateRef.current
      const colors =
        type === 'perfect'
          ? ['#ffd700', '#fff700', '#ffaa00', '#ffffff', '#e86c1e', '#ff6600']
          : type === 'good'
          ? ['#e86c1e', '#f97316', '#ff8c42', '#ffa500']
          : ['#22c55e', '#16a34a', '#4ade80']

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const speed = 3 + Math.random() * (type === 'perfect' ? 7 : 5)
        const types: Array<'star' | 'circle' | 'square'> = ['star', 'circle', 'square']
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          maxLife: 60 + Math.random() * 40,
          size: type === 'perfect' ? 4 + Math.random() * 5 : 3 + Math.random() * 3,
          type: types[Math.floor(Math.random() * types.length)],
        })
      }
    },
    []
  )

  const addScorePopup = useCallback(
    (x: number, y: number, text: string, color: string) => {
      const state = gameStateRef.current
      state.scorePopups.push({
        x,
        y,
        text,
        color,
        life: 1,
        maxLife: 70,
        vy: -2.5,
      })
    },
    []
  )

  const bowlBall = useCallback(() => {
    const state = gameStateRef.current
    const { width, height } = canvasSizeRef.current
    state.ballActive = true
    state.ballProgress = 0
    state.ballStartX = width * 0.82
    state.ballStartY = height * 0.38
    state.ballEndX = width * 0.14
    state.ballEndY = height * 0.62
    state.ballX = state.ballStartX
    state.ballY = state.ballStartY
    state.ballTrailX = []
    state.ballTrailY = []
    state.swingResult = 'none'
    state.bowlerBowling = true

    // Speed based on level
    state.ballSpeed = 0.007 + state.level * 0.0012
  }, [])

  const handleSwing = useCallback(() => {
    const state = gameStateRef.current
    if (state.phase !== 'playing') return
    if (!state.ballActive) return
    if (state.batSwinging) return
    if (state.swingCooldown > 0) return

    state.batSwinging = true
    state.batTargetAngle = Math.PI / 3

    // Determine timing based on ball proximity to bat contact zone
    const { width, height } = canvasSizeRef.current
    const batX = width * 0.14
    const batY = height * 0.62
    const dist = Math.sqrt(
      Math.pow(state.ballX - batX, 2) + Math.pow(state.ballY - batY, 2)
    )

    let result: 'perfect' | 'good' | 'ok' | 'miss'
    let runs = 0
    let popupText = ''
    let popupColor = '#ffffff'

    if (dist < 28) {
      result = 'perfect'
      runs = 6
      popupText = '6! PERFECT!'
      popupColor = '#ffd700'
      state.glowEffect = 40
      state.glowColor = '#ffd700'
      spawnParticles(batX, batY, 'perfect', 30)
      state.screenShake = 10
    } else if (dist < 55) {
      result = 'good'
      runs = 4
      popupText = '4! GREAT!'
      popupColor = '#e86c1e'
      state.glowEffect = 25
      state.glowColor = '#e86c1e'
      spawnParticles(batX, batY, 'good', 18)
      state.screenShake = 5
    } else if (dist < 85) {
      result = 'ok'
      runs = 2
      popupText = '2 runs'
      popupColor = '#22c55e'
      spawnParticles(batX, batY, 'ok', 8)
    } else {
      result = 'miss'
      runs = 0
      popupText = 'MISS!'
      popupColor = '#ef4444'
    }

    state.swingResult = result

    if (result !== 'miss') {
      state.combo++
      const comboMultiplier = state.combo >= 3 ? Math.floor(state.combo / 3) + 1 : 1
      const finalRuns = runs * comboMultiplier
      state.score += finalRuns

      if (comboMultiplier > 1) {
        addScorePopup(batX + 40, batY - 30, `x${comboMultiplier} COMBO!`, '#ff8c00')
      }
      addScorePopup(batX, batY - 20, popupText, popupColor)

      if (state.score > state.bestScore) {
        state.bestScore = state.score
        saveBestScore(state.score)
      }

      // Level up every 30 runs
      const newLevel = Math.floor(state.score / 30) + 1
      if (newLevel > state.level) {
        state.level = newLevel
        state.levelUpFlash = 80
        addScorePopup(width / 2, height / 2, `LEVEL ${state.level}!`, '#ffd700')
      }

      if (state.maxCombo < state.combo) state.maxCombo = state.combo
    } else {
      state.combo = 0
      state.wickets--
      addScorePopup(batX, batY - 20, popupText, popupColor)

      if (state.wickets <= 0) {
        setTimeout(() => {
          gameStateRef.current.phase = 'gameover'
        }, 800)
      }
    }

    state.swingCooldown = 30
    state.ballActive = false

    // Queue next bowl
    setTimeout(() => {
      if (gameStateRef.current.phase === 'playing' && gameStateRef.current.wickets > 0) {
        gameStateRef.current.batSwinging = false
        gameStateRef.current.batAngle = -Math.PI / 6
        gameStateRef.current.batTargetAngle = -Math.PI / 6
        gameStateRef.current.swingCooldown = 0
        gameStateRef.current.waitTimer = 80
      }
    }, 900)
  }, [spawnParticles, addScorePopup, saveBestScore])

  const startGame = useCallback(() => {
    const state = gameStateRef.current
    state.phase = 'playing'
    state.score = 0
    state.wickets = 3
    state.level = 1
    state.combo = 0
    state.maxCombo = 0
    state.ballActive = false
    state.batSwinging = false
    state.batAngle = -Math.PI / 6
    state.batTargetAngle = -Math.PI / 6
    state.swingResult = 'none'
    state.swingCooldown = 0
    state.particles = []
    state.scorePopups = []
    state.screenShake = 0
    state.glowEffect = 0
    state.levelUpFlash = 0
    state.waitTimer = 80
    state.bestScore = getBestScore()
  }, [getBestScore])

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h)
    skyGrad.addColorStop(0, '#0d1b35')
    skyGrad.addColorStop(0.5, '#0f2040')
    skyGrad.addColorStop(1, '#0a1020')
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, w, h)

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    const stars = [
      [50, 30], [120, 15], [200, 45], [300, 20], [420, 35], [500, 10],
      [620, 40], [700, 25], [750, 55], [80, 70], [160, 55], [380, 60],
    ]
    stars.forEach(([sx, sy]) => {
      ctx.beginPath()
      ctx.arc(sx, sy, 1.2, 0, Math.PI * 2)
      ctx.fill()
    })

    // Ground
    const groundGrad = ctx.createLinearGradient(0, h * 0.65, 0, h)
    groundGrad.addColorStop(0, '#1a3a10')
    groundGrad.addColorStop(1, '#0d2008')
    ctx.fillStyle = groundGrad
    ctx.fillRect(0, h * 0.65, w, h * 0.35)

    // Outfield grass texture lines
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'
    ctx.lineWidth = 1
    for (let i = 0; i < 8; i++) {
      const y = h * 0.65 + (h * 0.35 * i) / 8
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    // Pitch (center strip)
    const pitchGrad = ctx.createLinearGradient(0, h * 0.55, 0, h * 0.75)
    pitchGrad.addColorStop(0, '#c4a26a')
    pitchGrad.addColorStop(0.5, '#b8934a')
    pitchGrad.addColorStop(1, '#a07830')
    ctx.fillStyle = pitchGrad
    ctx.beginPath()
    ctx.roundRect(w * 0.08, h * 0.56, w * 0.84, h * 0.2, 4)
    ctx.fill()

    // Pitch border
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Pitch texture lines
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'
    ctx.lineWidth = 1
    for (let i = 1; i < 10; i++) {
      const px = w * 0.08 + (w * 0.84 * i) / 10
      ctx.beginPath()
      ctx.moveTo(px, h * 0.56)
      ctx.lineTo(px, h * 0.76)
      ctx.stroke()
    }

    // Batting crease (left)
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(w * 0.17, h * 0.54)
    ctx.lineTo(w * 0.17, h * 0.78)
    ctx.stroke()

    // Bowling crease (right)
    ctx.beginPath()
    ctx.moveTo(w * 0.83, h * 0.54)
    ctx.lineTo(w * 0.83, h * 0.78)
    ctx.stroke()

    // Popping crease
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(w * 0.12, h * 0.66)
    ctx.lineTo(w * 0.88, h * 0.66)
    ctx.stroke()

    // Ambient glow on ground
    const groundGlow = ctx.createRadialGradient(w * 0.5, h * 0.7, 0, w * 0.5, h * 0.7, w * 0.4)
    groundGlow.addColorStop(0, 'rgba(232,108,30,0.04)')
    groundGlow.addColorStop(1, 'transparent')
    ctx.fillStyle = groundGlow
    ctx.fillRect(0, h * 0.6, w, h * 0.4)
  }, [])

  const drawWickets = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, side: 'left' | 'right') => {
      const wicketColor = '#f0e8d0'
      const stumps = side === 'left' ? [-12, 0, 12] : [-12, 0, 12]

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.beginPath()
      ctx.ellipse(x, y + h * 0.015, 22, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Stumps
      stumps.forEach((offset) => {
        const sx = x + offset
        ctx.strokeStyle = wicketColor
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.shadowColor = 'rgba(240,232,208,0.3)'
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.moveTo(sx, y - h * 0.05)
        ctx.lineTo(sx, y + h * 0.02)
        ctx.stroke()
        ctx.shadowBlur = 0
      })

      // Bails
      ctx.strokeStyle = '#e86c1e'
      ctx.lineWidth = 2.5
      ctx.shadowColor = '#e86c1e'
      ctx.shadowBlur = 6
      ctx.beginPath()
      ctx.moveTo(x - 14, y - h * 0.05 + 3)
      ctx.lineTo(x + 14, y - h * 0.05 + 3)
      ctx.stroke()
      ctx.shadowBlur = 0
    },
    []
  )

  const drawBatsman = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, batAngle: number, swingResult: string) => {
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.beginPath()
      ctx.ellipse(x, y + 5, 18, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Legs
      ctx.fillStyle = '#dce8f5'
      ctx.fillRect(x - 10, y - 18, 8, 22)
      ctx.fillRect(x + 2, y - 18, 8, 22)

      // Pads
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.roundRect(x - 12, y - 20, 10, 25, 3)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(x + 2, y - 20, 10, 25, 3)
      ctx.fill()

      // Pad straps
      ctx.strokeStyle = '#cccccc'
      ctx.lineWidth = 1
      for (let i = 0; i < 3; i++) {
        const py = y - 15 + i * 7
        ctx.beginPath()
        ctx.moveTo(x - 12, py)
        ctx.lineTo(x - 2, py)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x + 2, py)
        ctx.lineTo(x + 12, py)
        ctx.stroke()
      }

      // Body (jersey)
      const jerseyGrad = ctx.createLinearGradient(x - 14, y - 65, x + 14, y - 20)
      jerseyGrad.addColorStop(0, '#2255cc')
      jerseyGrad.addColorStop(1, '#1133aa')
      ctx.fillStyle = jerseyGrad
      ctx.beginPath()
      ctx.roundRect(x - 14, y - 65, 28, 45, 5)
      ctx.fill()

      // Jersey number
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.font = 'bold 9px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('18', x, y - 40)

      // Gloves
      ctx.fillStyle = '#1a1a1a'
      ctx.beginPath()
      ctx.roundRect(x + 8, y - 50, 12, 10, 4)
      ctx.fill()

      // Helmet
      const helmetGrad = ctx.createRadialGradient(x - 2, y - 82, 2, x, y - 75, 16)
      helmetGrad.addColorStop(0, '#3366ee')
      helmetGrad.addColorStop(1, '#1122aa')
      ctx.fillStyle = helmetGrad
      ctx.beginPath()
      ctx.arc(x, y - 78, 16, Math.PI, 0)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, y - 78, 16, 0, Math.PI)
      ctx.fill()

      // Helmet visor
      ctx.fillStyle = '#0a0a1a'
      ctx.beginPath()
      ctx.roundRect(x - 10, y - 70, 22, 8, 2)
      ctx.fill()

      // Helmet grill
      ctx.strokeStyle = '#333344'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 4; i++) {
        const gx = x - 8 + i * 5
        ctx.beginPath()
        ctx.moveTo(gx, y - 70)
        ctx.lineTo(gx + 2, y - 62)
        ctx.stroke()
      }

      // Face
      ctx.fillStyle = '#f4c870'
      ctx.beginPath()
      ctx.arc(x, y - 78, 11, 0, Math.PI * 2)
      ctx.fill()

      // BAT - draw with rotation from bat grip
      ctx.save()
      ctx.translate(x + 10, y - 45)
      ctx.rotate(batAngle)

      // Handle
      ctx.strokeStyle = '#5c2d0a'
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, 38)
      ctx.stroke()

      // Handle grip tape
      ctx.strokeStyle = '#222222'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(-3, i * 4.5)
        ctx.lineTo(3, i * 4.5 + 3)
        ctx.stroke()
      }

      // Blade
      const bladeGrad = ctx.createLinearGradient(-8, 38, 8, 38)
      bladeGrad.addColorStop(0, '#e8c87a')
      bladeGrad.addColorStop(0.5, '#f0d88a')
      bladeGrad.addColorStop(1, '#c8a850')
      ctx.fillStyle = bladeGrad
      ctx.beginPath()
      ctx.roundRect(-8, 38, 18, 38, [3, 3, 6, 6])
      ctx.fill()

      // Blade edge
      ctx.strokeStyle = '#a07830'
      ctx.lineWidth = 1
      ctx.stroke()

      // Blade ridge
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(1, 42)
      ctx.lineTo(1, 72)
      ctx.stroke()

      ctx.restore()

      // Swing trail effect
      if (swingResult === 'perfect') {
        ctx.strokeStyle = 'rgba(255,215,0,0.3)'
        ctx.lineWidth = 8
        ctx.lineCap = 'round'
        ctx.save()
        ctx.translate(x + 10, y - 45)
        ctx.rotate(batAngle - 0.4)
        ctx.beginPath()
        ctx.moveTo(0, 38)
        ctx.lineTo(0, 76)
        ctx.stroke()
        ctx.restore()
      } else if (swingResult === 'good') {
        ctx.strokeStyle = 'rgba(232,108,30,0.3)'
        ctx.lineWidth = 6
        ctx.save()
        ctx.translate(x + 10, y - 45)
        ctx.rotate(batAngle - 0.3)
        ctx.beginPath()
        ctx.moveTo(0, 38)
        ctx.lineTo(0, 76)
        ctx.stroke()
        ctx.restore()
      }

      ctx.textAlign = 'left'
    },
    []
  )

  const drawBowler = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, armAngle: number) => {
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.beginPath()
      ctx.ellipse(x, y + 4, 15, 4, 0, 0, Math.PI * 2)
      ctx.fill()

      // Legs
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(x - 8, y - 15, 6, 20)
      ctx.fillRect(x + 2, y - 15, 6, 20)

      // Body
      const bodyGrad = ctx.createLinearGradient(x - 12, y - 60, x + 12, y - 15)
      bodyGrad.addColorStop(0, '#cc2222')
      bodyGrad.addColorStop(1, '#991111')
      ctx.fillStyle = bodyGrad
      ctx.beginPath()
      ctx.roundRect(x - 12, y - 60, 24, 42, 5)
      ctx.fill()

      // Jersey number
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.font = 'bold 9px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('7', x, y - 35)

      // Head
      ctx.fillStyle = '#f4c870'
      ctx.beginPath()
      ctx.arc(x, y - 72, 11, 0, Math.PI * 2)
      ctx.fill()

      // Cap
      ctx.fillStyle = '#cc2222'
      ctx.beginPath()
      ctx.arc(x, y - 76, 11, Math.PI, 0)
      ctx.fill()
      ctx.fillRect(x - 11, y - 76, 22, 5)
      // Peak
      ctx.beginPath()
      ctx.moveTo(x - 11, y - 71)
      ctx.lineTo(x - 18, y - 68)
      ctx.lineTo(x - 8, y - 68)
      ctx.closePath()
      ctx.fill()

      // Bowling arm (animated)
      ctx.save()
      ctx.translate(x - 10, y - 45)
      ctx.rotate(armAngle)

      // Upper arm
      ctx.strokeStyle = '#f4c870'
      ctx.lineWidth = 7
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -22)
      ctx.stroke()

      // Forearm
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.moveTo(0, -22)
      ctx.lineTo(6, -40)
      ctx.stroke()

      // Hand (ball holding)
      ctx.fillStyle = '#f4c870'
      ctx.beginPath()
      ctx.arc(6, -40, 5, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // Non-bowling arm
      ctx.save()
      ctx.translate(x + 10, y - 45)
      ctx.rotate(-0.5)
      ctx.strokeStyle = '#f4c870'
      ctx.lineWidth = 6
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(-8, -16)
      ctx.stroke()
      ctx.restore()

      ctx.textAlign = 'left'
    },
    []
  )

  const drawBall = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, glowColor: string, glowAmount: number) => {
      const radius = 9

      // Shadow on pitch
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.beginPath()
      ctx.ellipse(x, y + radius + 5, radius * 0.8, radius * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()

      // Glow effect
      if (glowAmount > 0) {
        ctx.shadowColor = glowColor
        ctx.shadowBlur = 20 * (glowAmount / 40)
      }

      // Ball gradient (red cricket ball)
      const grad = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, radius)
      grad.addColorStop(0, '#ff5555')
      grad.addColorStop(0.5, '#cc1111')
      grad.addColorStop(1, '#880000')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Seam - horizontal
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(x, y, radius, -0.4, 0.4)
      ctx.stroke()

      // Seam - vertical
      ctx.beginPath()
      ctx.arc(x, y, radius, Math.PI - 0.4, Math.PI + 0.4)
      ctx.stroke()

      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.beginPath()
      ctx.arc(x - 3, y - 3, 4, 0, Math.PI * 2)
      ctx.fill()
    },
    []
  )

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    particles.forEach((p) => {
      const alpha = p.life / p.maxLife
      ctx.globalAlpha = alpha

      ctx.fillStyle = p.color
      ctx.shadowColor = p.color
      ctx.shadowBlur = 4

      if (p.type === 'star') {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.life * 0.1)
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5 - Math.PI / 2
          const outerR = p.size
          const innerR = p.size * 0.4
          ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR)
          const innerAngle = angle + Math.PI / 5
          ctx.lineTo(Math.cos(innerAngle) * innerR, Math.sin(innerAngle) * innerR)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      } else if (p.type === 'square') {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.life * 0.08)
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    })
  }, [])

  const drawScorePopups = useCallback(
    (ctx: CanvasRenderingContext2D, popups: ScorePopup[]) => {
      popups.forEach((popup) => {
        const alpha = popup.life / popup.maxLife
        ctx.globalAlpha = Math.min(1, alpha * 3)
        ctx.shadowColor = popup.color
        ctx.shadowBlur = 8
        ctx.fillStyle = popup.color
        ctx.font = `bold ${14 + (1 - alpha) * 4}px Nunito, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillText(popup.text, popup.x, popup.y)
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })
      ctx.textAlign = 'left'
    },
    []
  )

  const drawStartScreen = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, bestScore: number) => {
      // Overlay
      ctx.fillStyle = 'rgba(0,0,0,0.75)'
      ctx.fillRect(0, 0, w, h)

      // Center card
      const cardW = 380
      const cardH = 320
      const cardX = (w - cardW) / 2
      const cardY = (h - cardH) / 2

      // Card background
      ctx.fillStyle = '#111111'
      ctx.strokeStyle = 'rgba(232,108,30,0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(cardX, cardY, cardW, cardH, 20)
      ctx.fill()
      ctx.stroke()

      // Top orange bar
      ctx.fillStyle = '#e86c1e'
      ctx.beginPath()
      ctx.roundRect(cardX, cardY, cardW, 6, [20, 20, 0, 0])
      ctx.fill()

      // Trophy icon
      ctx.font = '52px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('🏆', w / 2, cardY + 75)

      // Title
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 28px Nunito, sans-serif'
      ctx.fillText('CRICKET EXPERT PRO', w / 2, cardY + 120)

      // Subtitle
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = 'bold 15px Nunito, sans-serif'
      ctx.fillText('Click & Time Your Shot!', w / 2, cardY + 150)

      // Best score
      if (bestScore > 0) {
        ctx.fillStyle = '#e86c1e'
        ctx.font = 'bold 14px Nunito, sans-serif'
        ctx.fillText(`Best Score: ${bestScore}`, w / 2, cardY + 180)
      }

      // Controls hint
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.font = 'bold 13px Nunito, sans-serif'
      ctx.fillText('CLICK / SPACE / TAP to swing', w / 2, cardY + 210)

      // Play button
      const btnW = 180
      const btnH = 50
      const btnX = (w - btnW) / 2
      const btnY = cardY + 235

      const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnH)
      btnGrad.addColorStop(0, '#f97316')
      btnGrad.addColorStop(1, '#e86c1e')
      ctx.fillStyle = btnGrad
      ctx.shadowColor = '#e86c1e'
      ctx.shadowBlur = 20
      ctx.beginPath()
      ctx.roundRect(btnX, btnY, btnW, btnH, 12)
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 18px Nunito, sans-serif'
      ctx.fillText('🏏 PLAY NOW', w / 2, btnY + 32)

      ctx.textAlign = 'left'
    },
    []
  )

  const drawGameOver = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, score: number, bestScore: number, maxCombo: number) => {
      // Overlay
      ctx.fillStyle = 'rgba(0,0,0,0.82)'
      ctx.fillRect(0, 0, w, h)

      const cardW = 380
      const cardH = 360
      const cardX = (w - cardW) / 2
      const cardY = (h - cardH) / 2

      ctx.fillStyle = '#111111'
      ctx.strokeStyle = 'rgba(239,68,68,0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(cardX, cardY, cardW, cardH, 20)
      ctx.fill()
      ctx.stroke()

      // Red top bar
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.roundRect(cardX, cardY, cardW, 6, [20, 20, 0, 0])
      ctx.fill()

      // Game over emoji
      ctx.font = '50px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('🏏', w / 2, cardY + 70)

      // Title
      ctx.fillStyle = '#ef4444'
      ctx.font = 'bold 32px Nunito, sans-serif'
      ctx.fillText('GAME OVER', w / 2, cardY + 115)

      // Subtitle
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = 'bold 14px Nunito, sans-serif'
      ctx.fillText('All wickets lost!', w / 2, cardY + 140)

      // Score
      ctx.fillStyle = '#e86c1e'
      ctx.font = 'bold 44px Nunito, sans-serif'
      ctx.fillText(`${score}`, w / 2, cardY + 200)

      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.font = 'bold 13px Nunito, sans-serif'
      ctx.fillText('RUNS SCORED', w / 2, cardY + 218)

      // Stats row
      const newBest = score >= bestScore
      ctx.fillStyle = newBest ? '#ffd700' : 'rgba(255,255,255,0.5)'
      ctx.font = 'bold 14px Nunito, sans-serif'
      ctx.fillText(
        newBest ? `🏆 NEW BEST: ${score}!` : `Best: ${bestScore}`,
        w / 2,
        cardY + 248
      )

      if (maxCombo > 0) {
        ctx.fillStyle = '#e86c1e'
        ctx.font = 'bold 13px Nunito, sans-serif'
        ctx.fillText(`Max Combo: x${maxCombo}`, w / 2, cardY + 270)
      }

      // Play Again button
      const btnW = 200
      const btnH = 50
      const btnX = (w - btnW) / 2
      const btnY = cardY + 288

      const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnH)
      btnGrad.addColorStop(0, '#f97316')
      btnGrad.addColorStop(1, '#e86c1e')
      ctx.fillStyle = btnGrad
      ctx.shadowColor = '#e86c1e'
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.roundRect(btnX, btnY, btnW, btnH, 12)
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 17px Nunito, sans-serif'
      ctx.fillText('🔄 Play Again', w / 2, btnY + 32)

      ctx.textAlign = 'left'
    },
    []
  )

  const drawHUD = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, state: GameState) => {
      const { score, wickets, level, combo } = state

      // HUD background
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      ctx.beginPath()
      ctx.roundRect(10, 10, 200, 58, 10)
      ctx.fill()

      // Score
      ctx.fillStyle = '#e86c1e'
      ctx.font = 'bold 12px Nunito, sans-serif'
      ctx.fillText('SCORE', 22, 28)
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px Nunito, sans-serif'
      ctx.fillText(`${score}`, 22, 52)

      // Level
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = 'bold 12px Nunito, sans-serif'
      ctx.fillText('LVL', 100, 28)
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px Nunito, sans-serif'
      ctx.fillText(`${level}`, 100, 52)

      // Combo
      if (combo >= 2) {
        ctx.fillStyle = 'rgba(255,140,0,0.9)'
        ctx.font = 'bold 12px Nunito, sans-serif'
        ctx.fillText('COMBO', 145, 28)
        ctx.fillStyle = combo >= 5 ? '#ffd700' : '#e86c1e'
        ctx.font = `bold 22px Nunito, sans-serif`
        ctx.fillText(`x${Math.floor(combo / 3) + 1}`, 145, 52)
      }

      // Wickets (right side)
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      ctx.beginPath()
      ctx.roundRect(w - 130, 10, 120, 42, 10)
      ctx.fill()

      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = 'bold 11px Nunito, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText('WICKETS', w - 16, 27)

      // Wicket icons
      for (let i = 0; i < 3; i++) {
        ctx.font = '16px sans-serif'
        const icon = i < wickets ? '🏏' : '💀'
        ctx.globalAlpha = i < wickets ? 1 : 0.3
        ctx.fillText(icon, w - 14 - i * 26, 46)
        ctx.globalAlpha = 1
      }

      ctx.textAlign = 'left'

      // Level up flash
      if (state.levelUpFlash > 0) {
        const flashAlpha = state.levelUpFlash / 80
        ctx.fillStyle = `rgba(255,215,0,${flashAlpha * 0.15})`
        ctx.fillRect(0, 0, w, h)
      }
    },
    []
  )

  const drawTimingZone = useCallback(
    (ctx: CanvasRenderingContext2D, batX: number, batY: number, ballX: number, ballY: number) => {
      const dist = Math.sqrt(Math.pow(ballX - batX, 2) + Math.pow(ballY - batY, 2))

      // Show timing indicator when ball is close
      if (dist < 150) {
        const intensity = 1 - dist / 150

        // Perfect zone
        ctx.strokeStyle = `rgba(255,215,0,${intensity * 0.6})`
        ctx.lineWidth = 2
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.arc(batX, batY, 28, 0, Math.PI * 2)
        ctx.stroke()

        // Good zone
        ctx.strokeStyle = `rgba(232,108,30,${intensity * 0.4})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(batX, batY, 55, 0, Math.PI * 2)
        ctx.stroke()

        // OK zone
        ctx.strokeStyle = `rgba(34,197,94,${intensity * 0.25})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(batX, batY, 85, 0, Math.PI * 2)
        ctx.stroke()

        ctx.setLineDash([])
      }
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = gameStateRef.current
    state.bestScore = getBestScore()

    const resize = () => {
      const container = canvas.parentElement
      if (!container) return
      const w = Math.min(container.clientWidth, 900)
      const h = Math.min(Math.round(w * (420 / 800)), 420)
      canvas.width = w
      canvas.height = h
      canvasSizeRef.current = { width: w, height: h }
    }
    resize()
    window.addEventListener('resize', resize)

    let frameCount = 0

    const loop = () => {
      frameCount++
      const { width: w, height: h } = canvasSizeRef.current
      const batX = w * 0.14
      const batY = h * 0.62

      // Update particles
      state.particles = state.particles.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.18 // gravity
        p.vx *= 0.97
        p.life--
        return p.life > 0
      })

      // Update score popups
      state.scorePopups = state.scorePopups.filter((popup) => {
        popup.y += popup.vy
        popup.life--
        return popup.life > 0
      })

      // Update glow
      if (state.glowEffect > 0) state.glowEffect--
      if (state.levelUpFlash > 0) state.levelUpFlash--
      if (state.swingCooldown > 0) state.swingCooldown--
      if (state.screenShake > 0) state.screenShake -= 0.5

      // Update bat animation
      if (state.batSwinging) {
        state.batAngle += (state.batTargetAngle - state.batAngle) * 0.18
        if (Math.abs(state.batAngle - state.batTargetAngle) < 0.05) {
          state.batAngle = state.batTargetAngle
        }
      } else {
        state.batAngle += (-Math.PI / 6 - state.batAngle) * 0.15
      }

      // Bowler arm animation
      if (state.bowlerBowling) {
        state.bowlerArmAngle += (Math.PI / 2 - state.bowlerArmAngle) * 0.12
        if (state.bowlerArmAngle > Math.PI / 3) {
          state.bowlerBowling = false
          state.bowlerArmAngle = -Math.PI / 2
        }
      } else {
        state.bowlerArmAngle = -Math.PI / 2 + Math.sin(frameCount * 0.04) * 0.2
      }

      // Ball movement (parabolic arc)
      if (state.ballActive && state.phase === 'playing') {
        state.ballProgress += state.ballSpeed

        if (state.ballProgress >= 1) {
          // Ball reached batsman without swing = miss
          state.ballActive = false
          state.combo = 0
          state.wickets--
          addScorePopup(batX, batY - 30, 'MISS!', '#ef4444')

          if (state.wickets <= 0) {
            setTimeout(() => {
              gameStateRef.current.phase = 'gameover'
            }, 600)
          } else {
            setTimeout(() => {
              if (gameStateRef.current.phase === 'playing') {
                gameStateRef.current.waitTimer = 80
              }
            }, 700)
          }
        } else {
          const t = state.ballProgress
          // Parabolic: x linear, y arc
          state.ballX =
            state.ballStartX + (state.ballEndX - state.ballStartX) * t
          const arcHeight = -h * 0.18
          state.ballY =
            state.ballStartY +
            (state.ballEndY - state.ballStartY) * t +
            arcHeight * 4 * t * (1 - t)

          // Ball trail
          state.ballTrailX.unshift(state.ballX)
          state.ballTrailY.unshift(state.ballY)
          if (state.ballTrailX.length > 8) {
            state.ballTrailX.pop()
            state.ballTrailY.pop()
          }
        }
      }

      // Wait timer before next bowl
      if (state.phase === 'playing' && !state.ballActive && state.waitTimer > 0) {
        state.waitTimer--
        if (state.waitTimer === 0) {
          bowlBall()
        }
      }

      // ---- DRAW ----
      ctx.save()

      // Screen shake
      if (state.screenShake > 0) {
        const shakeAmt = state.screenShake * 0.5
        ctx.translate(
          (Math.random() - 0.5) * shakeAmt,
          (Math.random() - 0.5) * shakeAmt
        )
      }

      // Background
      drawBackground(ctx, w, h)

      // Draw timing zone (only during play and ball active)
      if (state.phase === 'playing' && state.ballActive) {
        drawTimingZone(ctx, batX, batY, state.ballX, state.ballY)
      }

      // Wickets
      drawWickets(ctx, w * 0.14, h * 0.65, w, h, 'left')
      drawWickets(ctx, w * 0.86, h * 0.65, w, h, 'right')

      // Batsman
      drawBatsman(ctx, batX, batY, state.batAngle, state.swingResult)

      // Bowler
      drawBowler(ctx, w * 0.86, h * 0.63, state.bowlerArmAngle)

      // Ball trail
      if (state.ballActive) {
        state.ballTrailX.forEach((tx, i) => {
          const alpha = (1 - i / state.ballTrailX.length) * 0.25
          ctx.fillStyle = `rgba(255,80,80,${alpha})`
          ctx.beginPath()
          ctx.arc(tx, state.ballTrailY[i], 9 * (1 - i / state.ballTrailX.length), 0, Math.PI * 2)
          ctx.fill()
        })

        // Ball
        drawBall(ctx, state.ballX, state.ballY, state.glowColor, state.glowEffect)
      }

      // Particles
      drawParticles(ctx, state.particles)

      // Score popups
      drawScorePopups(ctx, state.scorePopups)

      // HUD
      if (state.phase === 'playing') {
        drawHUD(ctx, w, h, state)
      }

      // Screens
      if (state.phase === 'start') {
        drawStartScreen(ctx, w, h, state.bestScore)
      } else if (state.phase === 'gameover') {
        drawGameOver(ctx, w, h, state.score, state.bestScore, state.maxCombo)
      }

      ctx.restore()

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [
    getBestScore,
    addScorePopup,
    bowlBall,
    drawBackground,
    drawBatsman,
    drawBowler,
    drawBall,
    drawParticles,
    drawScorePopups,
    drawHUD,
    drawStartScreen,
    drawGameOver,
    drawTimingZone,
    drawWickets,
  ])

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      const state = gameStateRef.current
      const canvas = canvasRef.current
      if (!canvas) return

      // Get click position
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const clickX = (clientX - rect.left) * scaleX
      const clickY = (clientY - rect.top) * scaleY

      const { width: w, height: h } = canvasSizeRef.current

      if (state.phase === 'start') {
        // Check if click is on play button
        const btnW = 180
        const cardH = 320
        const cardY = (h - cardH) / 2
        const btnX = (w - btnW) / 2
        const btnY = cardY + 235
        if (clickX >= btnX && clickX <= btnX + btnW && clickY >= btnY && clickY <= btnY + 50) {
          startGame()
        } else {
          startGame()
        }
        return
      }

      if (state.phase === 'gameover') {
        // Check play again button
        const btnW = 200
        const cardH = 360
        const cardY = (h - cardH) / 2
        const btnX = (w - btnW) / 2
        const btnY = cardY + 288
        if (clickX >= btnX && clickX <= btnX + btnW && clickY >= btnY && clickY <= btnY + 50) {
          startGame()
        } else {
          startGame()
        }
        return
      }

      if (state.phase === 'playing') {
        handleSwing()
      }
    },
    [startGame, handleSwing]
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
        const state = gameStateRef.current
        if (state.phase === 'start' || state.phase === 'gameover') {
          startGame()
        } else if (state.phase === 'playing') {
          handleSwing()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [startGame, handleSwing])

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasClick}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          cursor: 'pointer',
          borderRadius: '12px',
          touchAction: 'none',
        }}
        aria-label="Cricket game - click to play"
      />
    </div>
  )
}
