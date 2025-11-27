'use client'

import { useEffect, useState, useRef } from 'react'

interface Pixel {
  id: number
  x: number
  y: number
  size: number
  speed: number
  collected: boolean
}

export default function PixelGame() {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const containerRef = useRef<HTMLDivElement>(null)
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [level, setLevel] = useState(1)
  const [combo, setCombo] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(15)
    setPixels([])
    setLevel(1)
    setCombo(0)

    // Spawn pixels - speed increases with level
    const spawnInterval = Math.max(600 - level * 50, 300)
    gameIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current
        const pixelSize = 6 + Math.random() * 6
        const newPixel: Pixel = {
          id: Date.now() + Math.random(),
          x: Math.random() * (container.clientWidth - pixelSize),
          y: Math.random() * (container.clientHeight - pixelSize),
          size: pixelSize,
          speed: 0.3 + (level * 0.1) + Math.random() * 0.3,
          collected: false,
        }
        setPixels((prev) => [...prev, newPixel])
      }
    }, spawnInterval)

    // Timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const endGame = () => {
    setGameActive(false)
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeout(() => {
      setPixels([])
    }, 500)
  }

  const collectPixel = (id: number) => {
    const now = Date.now()
    const timeDiff = now - lastClickTime
    
    // Combo system
    let newCombo = combo
    if (timeDiff < 300 && lastClickTime > 0) {
      newCombo = combo + 1
    } else {
      newCombo = 1
    }
    
    setCombo(newCombo)
    setLastClickTime(now)
    
    // Score based on combo
    const points = 1 + Math.floor(newCombo / 3)
    setScore((prev) => {
      const newScore = prev + points
      // Level up every 20 points
      const newLevel = Math.floor(newScore / 20) + 1
      setLevel((currentLevel) => {
        if (newLevel > currentLevel) {
          setTimeLeft((t) => t + 3) // Bonus time
          return newLevel
        }
        return currentLevel
      })
      if (newScore > highScore) {
        setHighScore(newScore)
      }
      return newScore
    })
    
    setPixels((prev) => prev.filter((p) => p.id !== id))
  }

  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="w-full my-8">
      <div className="border border-foreground/30 p-6 bg-background">
        <div className="flex items-center justify-between mb-4 text-sm font-mono">
          <div className="flex items-center gap-4">
            <span className="opacity-60">SCORE</span>
            <span className="opacity-100">{score.toString().padStart(3, '0')}</span>
          </div>
          {gameActive ? (
            <div className="flex items-center gap-4">
              <span className="opacity-60">TIME</span>
              <span className="opacity-100">{timeLeft.toString().padStart(2, '0')}</span>
              <span className="opacity-60">LVL</span>
              <span className="opacity-100">{level}</span>
              {combo > 1 && (
                <>
                  <span className="opacity-60">COMBO</span>
                  <span className="opacity-100">x{combo}</span>
                </>
              )}
            </div>
          ) : (
            <div className="text-xs opacity-60">
              HIGH: {highScore}
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-64 border border-foreground/10 bg-background overflow-hidden cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
        >
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              onClick={() => collectPixel(pixel.id)}
              className="absolute bg-foreground transition-all duration-100 hover:opacity-70 active:scale-90"
              style={{
                left: `${pixel.x}px`,
                top: `${pixel.y}px`,
                width: `${pixel.size}px`,
                height: `${pixel.size}px`,
                boxShadow: `0 0 ${pixel.size / 2}px currentColor`,
              }}
            />
          ))}

          {!gameActive && pixels.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startGame}
                className="px-6 py-2 border border-foreground/30 hover:border-[oklch(0.60_0.18_25)] hover:bg-foreground/5 transition-all duration-200 font-mono text-sm tracking-wider"
              >
                [ START GAME ]
              </button>
            </div>
          )}

          {!gameActive && score > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/95">
              <div className="font-mono text-sm opacity-80">GAME OVER</div>
              <div className="font-mono text-xs opacity-70">Score: {score} | Level: {level}</div>
              {score === highScore && score > 0 && (
                <div className="font-mono text-xs opacity-80">NEW HIGH SCORE!</div>
              )}
              <button
                onClick={startGame}
                className="mt-4 px-4 py-1 border border-foreground/30 hover:border-[oklch(0.60_0.18_25)] text-xs font-mono tracking-wider transition-all duration-200"
              >
                [ PLAY AGAIN ]
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs font-mono opacity-40 text-center">
          Click the pixels to collect them
        </div>
      </div>
    </div>
  )
}

