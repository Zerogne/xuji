'use client'

import { useState, useEffect, useRef } from 'react'

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }

export default function PathVisualizer() {
  const [gameActive, setGameActive] = useState(false)
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const directionRef = useRef(INITIAL_DIRECTION)
  const touchStartRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const changeDirection = (newDirection: { x: number; y: number }) => {
    // Prevent reversing into itself
    if (
      (newDirection.x === -directionRef.current.x && newDirection.x !== 0) ||
      (newDirection.y === -directionRef.current.y && newDirection.y !== 0)
    ) {
      return
    }
    directionRef.current = newDirection
    setDirection(newDirection)
  }

  useEffect(() => {
    if (!gameActive) return

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key
      const newDirection = { ...directionRef.current }

      if (key === 'ArrowUp' && directionRef.current.y === 0) {
        newDirection.x = 0
        newDirection.y = -1
      } else if (key === 'ArrowDown' && directionRef.current.y === 0) {
        newDirection.x = 0
        newDirection.y = 1
      } else if (key === 'ArrowLeft' && directionRef.current.x === 0) {
        newDirection.x = -1
        newDirection.y = 0
      } else if (key === 'ArrowRight' && directionRef.current.x === 0) {
        newDirection.x = 1
        newDirection.y = 0
      }

      changeDirection(newDirection)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive || gameOver) return

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] }
        head.x += directionRef.current.x
        head.y += directionRef.current.y

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true)
          setGameActive(false)
          return prevSnake
        }

        // Self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          setGameActive(false)
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 10
            if (newScore > highScore) {
              setHighScore(newScore)
            }
            return newScore
          })
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          })
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 150)

    return () => clearInterval(gameLoop)
  }, [gameActive, food, gameOver, highScore])

  const startGame = () => {
    setGameActive(true)
    setSnake(INITIAL_SNAKE)
    setFood({ x: 15, y: 15 })
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setScore(0)
    setGameOver(false)
  }

  const resetGame = () => {
    setGameActive(false)
    setSnake(INITIAL_SNAKE)
    setScore(0)
    setGameOver(false)
    directionRef.current = INITIAL_DIRECTION
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!gameActive || gameOver) return
    const touch = e.touches[0]
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!gameActive || gameOver) return
    
    const touch = e.changedTouches[0]
    if (!touch) return
    
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const minSwipeDistance = 50

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && directionRef.current.x === 0) {
          changeDirection({ x: 1, y: 0 }) // Right
        } else if (deltaX < 0 && directionRef.current.x === 0) {
          changeDirection({ x: -1, y: 0 }) // Left
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && directionRef.current.y === 0) {
          changeDirection({ x: 0, y: 1 }) // Down
        } else if (deltaY < 0 && directionRef.current.y === 0) {
          changeDirection({ x: 0, y: -1 }) // Up
        }
      }
    }
  }

  const handleButtonPress = (dir: { x: number; y: number }) => {
    if (gameActive && !gameOver) {
      changeDirection(dir)
    }
  }

  return (
    <div className="w-full my-6 border border-foreground/30 p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-mono opacity-80">SNAKE GAME</div>
        {gameActive ? (
          <div className="flex items-center gap-4 text-xs font-mono opacity-80">
            <span>SCORE: {score}</span>
            <span>HIGH: {highScore}</span>
          </div>
        ) : (
          <div className="text-xs font-mono opacity-80">HIGH SCORE: {highScore}</div>
        )}
      </div>

      {!gameActive ? (
        <div className="text-center py-8">
          <button
            onClick={startGame}
            className="px-6 py-2 border border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-200 font-mono text-sm tracking-wider"
          >
            [ START ]
          </button>
          <p className="text-xs font-mono opacity-70 mt-4">
            {isMobile ? 'Swipe or use buttons to move' : 'Use arrow keys to move'}
          </p>
          <p className="text-xs font-mono opacity-60 mt-2">Eat food to grow and score!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className="relative w-full aspect-square border-2 border-foreground/30 bg-background touch-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {/* Food */}
            <div
              className="bg-foreground/80"
              style={{
                gridColumn: food.x + 1,
                gridRow: food.y + 1,
              }}
            />

            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={`${index === 0 ? 'bg-foreground' : 'bg-foreground/60'}`}
                style={{
                  gridColumn: segment.x + 1,
                  gridRow: segment.y + 1,
                }}
              />
            ))}
          </div>

          {gameOver && (
            <div className="text-center">
              <div className="text-xs font-mono opacity-80 mb-2">GAME OVER</div>
              <div className="text-xs font-mono opacity-70 mb-4">Score: {score}</div>
              <button
                onClick={resetGame}
                className="px-4 py-1 border border-foreground/30 hover:border-foreground/60 text-xs font-mono tracking-wider transition-all duration-200"
              >
                [ PLAY AGAIN ]
              </button>
            </div>
          )}

          {/* Mobile Controls */}
          {isMobile && gameActive && !gameOver && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => handleButtonPress({ x: 0, y: -1 })}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleButtonPress({ x: 0, y: -1 })
                }}
                className="w-10 h-10 border-2 border-foreground/40 bg-background active:bg-foreground/15 active:border-foreground/80 active:scale-95 transition-all font-mono text-sm flex items-center justify-center touch-manipulation select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                ↑
              </button>
              <button
                onClick={() => handleButtonPress({ x: -1, y: 0 })}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleButtonPress({ x: -1, y: 0 })
                }}
                className="w-10 h-10 border-2 border-foreground/40 bg-background active:bg-foreground/15 active:border-foreground/80 active:scale-95 transition-all font-mono text-sm flex items-center justify-center touch-manipulation select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                ←
              </button>
              <button
                onClick={() => handleButtonPress({ x: 1, y: 0 })}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleButtonPress({ x: 1, y: 0 })
                }}
                className="w-10 h-10 border-2 border-foreground/40 bg-background active:bg-foreground/15 active:border-foreground/80 active:scale-95 transition-all font-mono text-sm flex items-center justify-center touch-manipulation select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                →
              </button>
              <button
                onClick={() => handleButtonPress({ x: 0, y: 1 })}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleButtonPress({ x: 0, y: 1 })
                }}
                className="w-10 h-10 border-2 border-foreground/40 bg-background active:bg-foreground/15 active:border-foreground/80 active:scale-95 transition-all font-mono text-sm flex items-center justify-center touch-manipulation select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                ↓
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
