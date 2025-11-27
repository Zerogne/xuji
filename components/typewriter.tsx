'use client'

import { useState, useEffect, useRef } from 'react'

const phrases = [
  'A learner',
  'A builder',
  'A creator',
  'Still beginning',
  'Pushing forward',
]

export default function Typewriter() {
  const [gameActive, setGameActive] = useState(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [wpm, setWpm] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<number>(0)
  const correctCharsRef = useRef<number>(0)

  useEffect(() => {
    if (gameActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [gameActive, currentPhraseIndex])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  const startGame = () => {
    setGameActive(true)
    setCurrentPhraseIndex(0)
    setUserInput('')
    setScore(0)
    setTimeLeft(30)
    setWpm(0)
    correctCharsRef.current = 0
    startTimeRef.current = Date.now()
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const endGame = () => {
    setGameActive(false)
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60
    const calculatedWpm = timeElapsed > 0 ? Math.round(correctCharsRef.current / 5 / timeElapsed) : 0
    setWpm(calculatedWpm)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const currentPhrase = phrases[currentPhraseIndex]
    
    setUserInput(value)
    
    // Count correct characters
    let correct = 0
    for (let i = 0; i < Math.min(value.length, currentPhrase.length); i++) {
      if (value[i] === currentPhrase[i]) correct++
    }
    correctCharsRef.current += correct - (correctCharsRef.current % currentPhrase.length)

    if (value === currentPhrase) {
      setScore(score + 1)
      setUserInput('')
      if (currentPhraseIndex < phrases.length - 1) {
        setCurrentPhraseIndex(currentPhraseIndex + 1)
      } else {
        setCurrentPhraseIndex(0)
      }
    }
  }

  const currentPhrase = phrases[currentPhraseIndex]

  return (
    <div className="w-full my-6 border border-foreground/30 p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-mono opacity-80">TYPING GAME</div>
        {gameActive && (
          <div className="flex gap-4 text-xs font-mono opacity-80">
            <span>SCORE: {score}</span>
            <span>TIME: {timeLeft}s</span>
          </div>
        )}
      </div>

      {!gameActive ? (
        <div className="text-center py-8">
          <button
            onClick={startGame}
                className="px-6 py-2 border border-foreground/30 hover:border-[oklch(0.60_0.18_25)] hover:bg-foreground/5 transition-all duration-200 font-mono text-sm tracking-wider"
          >
            [ START ]
          </button>
          <p className="text-xs font-mono opacity-70 mt-4">Type the phrases as fast as you can</p>
          {wpm > 0 && (
            <div className="mt-4 text-xs font-mono opacity-60">
              Final WPM: {wpm}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-2xl font-rouge min-h-[2.5rem] text-center">
            {currentPhrase.split('').map((char, index) => {
              const userChar = userInput[index]
              const isCorrect = userChar === char
              const isPast = index < userInput.length
              
              return (
                <span
                  key={index}
                  className={
                    isPast
                      ? isCorrect
                        ? 'opacity-100'
                        : 'opacity-40 line-through'
                      : 'opacity-60'
                  }
                >
                  {char}
                </span>
              )
            })}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            className="w-full px-4 py-2 bg-background border border-foreground/30 focus:border-foreground/60 focus:outline-none font-mono text-sm text-center"
            placeholder="Type here..."
          />
        </div>
      )}
    </div>
  )
}

