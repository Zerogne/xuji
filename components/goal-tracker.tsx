'use client'

import { useState, useEffect } from 'react'

export default function GoalTracker() {
  const [gameActive, setGameActive] = useState(false)
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const [showTarget, setShowTarget] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [avgReaction, setAvgReaction] = useState(0)

  useEffect(() => {
    if (!gameActive || !showTarget) return

    const timeout = setTimeout(() => {
      if (showTarget) {
        setShowTarget(false)
        setTarget(null)
        setRound((prev) => prev + 1)
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [gameActive, showTarget])

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setRound(1)
    setReactionTimes([])
    setAvgReaction(0)
    startRound()
  }

  const startRound = () => {
    setShowTarget(false)
    setTarget(null)
    const delay = 1000 + Math.random() * 2000
    
    setTimeout(() => {
      setGameActive((active) => {
        if (active) {
          const x = Math.random() * 80 + 10
          const y = Math.random() * 80 + 10
          setTarget({ x, y })
          setShowTarget(true)
          setStartTime(Date.now())
        }
        return active
      })
    }, delay)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameActive || !showTarget || !target) return

    const clickX = (e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth * 100
    const clickY = (e.clientY - e.currentTarget.getBoundingClientRect().top) / e.currentTarget.offsetHeight * 100

    const distance = Math.sqrt(
      Math.pow(clickX - target.x, 2) + Math.pow(clickY - target.y, 2)
    )

    if (distance < 5) {
      const reactionTime = Date.now() - startTime
      const points = Math.max(100 - Math.floor(reactionTime / 10), 10)
      
      setScore((prev) => {
        const newScore = prev + points
        if (newScore > highScore) {
          setHighScore(newScore)
        }
        return newScore
      })
      
      setReactionTimes((prev) => {
        const newTimes = [...prev, reactionTime]
        const avg = newTimes.reduce((a, b) => a + b, 0) / newTimes.length
        setAvgReaction(Math.round(avg))
        return newTimes
      })

      setShowTarget(false)
      setTarget(null)

      if (round < 10) {
        setTimeout(() => {
          setRound((prev) => prev + 1)
          if (gameActive) {
            startRound()
          }
        }, 500)
      } else {
        setGameActive(false)
      }
    }
  }

  const resetGame = () => {
    setGameActive(false)
    setScore(0)
    setRound(1)
    setReactionTimes([])
    setAvgReaction(0)
    setShowTarget(false)
    setTarget(null)
  }

  return (
    <div className="w-full my-6 border border-foreground/30 p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-mono opacity-80">REACTION TEST</div>
        {gameActive ? (
          <div className="flex items-center gap-4 text-xs font-mono opacity-80">
            <span>SCORE: {score}</span>
            <span>ROUND: {round}/10</span>
          </div>
        ) : (
          <div className="text-xs font-mono opacity-80">HIGH SCORE: {highScore}</div>
        )}
      </div>

      {avgReaction > 0 && (
        <div className="mb-4 text-center text-xs font-mono opacity-70">
          Avg Reaction: {avgReaction}ms
        </div>
      )}

      {!gameActive ? (
        <div className="text-center py-8">
          <button
            onClick={startGame}
                className="px-6 py-2 border border-foreground/30 hover:border-[oklch(0.60_0.18_25)] hover:bg-foreground/5 transition-all duration-200 font-mono text-sm tracking-wider"
          >
            [ START ]
          </button>
          <p className="text-xs font-mono opacity-70 mt-4">Click targets as fast as you can!</p>
          <p className="text-xs font-mono opacity-60 mt-2">10 rounds - faster = more points</p>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="relative w-full h-64 border-2 border-foreground/30 bg-background cursor-crosshair"
        >
          {showTarget && target && (
            <div
              className="absolute w-8 h-8 border-2 border-foreground bg-foreground/20 animate-pulse"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}

          {!showTarget && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-sm font-mono opacity-60">Wait for target...</div>
            </div>
          )}
        </div>
      )}

      {!gameActive && score > 0 && (
        <div className="mt-6 text-center">
          <div className="text-xs font-mono opacity-80 mb-2">GAME OVER</div>
          <div className="text-xs font-mono opacity-70 mb-4">
            Final Score: {score} | Avg: {avgReaction}ms
          </div>
          <button
            onClick={startGame}
                className="px-4 py-1 border border-foreground/30 hover:border-[oklch(0.60_0.18_25)] text-xs font-mono tracking-wider transition-all duration-200"
          >
            [ PLAY AGAIN ]
          </button>
        </div>
      )}
    </div>
  )
}
