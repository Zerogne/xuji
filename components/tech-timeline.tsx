'use client'

import { useState, useEffect } from 'react'

const techWords = [
  'NEXTJS',
  'TYPESCRIPT',
  'REACT',
  'MONGODB',
  'TAILWIND',
  'NODEJS',
  'PYTHON',
  'JAVASCRIPT',
]

export default function TechTimeline() {
  const [gameActive, setGameActive] = useState(false)
  const [currentWord, setCurrentWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(30)
  const [hint, setHint] = useState('')
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  const scrambleWord = (word: string) => {
    const letters = word.split('')
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[letters[i], letters[j]] = [letters[j], letters[i]]
    }
    return letters.join('')
  }

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setLevel(1)
    setTimeLeft(30)
    newWord()
  }

  const newWord = () => {
    const word = techWords[Math.floor(Math.random() * techWords.length)]
    setCurrentWord(word)
    setScrambledWord(scrambleWord(word))
    setUserInput('')
    setHint(word[0] + '...' + word[word.length - 1])
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setUserInput(value)

    if (value === currentWord) {
      const points = 10 + Math.floor(timeLeft / 3)
      setScore((prev) => {
        const newScore = prev + points
        if (newScore > highScore) {
          setHighScore(newScore)
        }
        return newScore
      })

      setLevel((prev) => {
        const newLevel = prev + 1
        setTimeLeft((t) => t + 5) // Bonus time
        return newLevel
      })

      setTimeout(() => {
        newWord()
      }, 500)
    }
  }

  const resetGame = () => {
    setGameActive(false)
    setScore(0)
    setLevel(1)
    setTimeLeft(30)
    setUserInput('')
    setCurrentWord('')
    setScrambledWord('')
    setHint('')
  }

  return (
    <div className="w-full my-6 border border-foreground/30 p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-mono opacity-80">WORD SCRAMBLE</div>
        {gameActive ? (
          <div className="flex items-center gap-4 text-xs font-mono opacity-80">
            <span>SCORE: {score}</span>
            <span>TIME: {timeLeft}s</span>
            <span>LVL: {level}</span>
          </div>
        ) : (
          <div className="text-xs font-mono opacity-80">HIGH SCORE: {highScore}</div>
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
          <p className="text-xs font-mono opacity-70 mt-4">Unscramble the tech word!</p>
          <p className="text-xs font-mono opacity-60 mt-2">Type the correct word to score</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-xs font-mono opacity-60 mb-2">SCRAMBLED WORD</div>
            <div className="text-3xl font-mono tracking-widest mb-4">{scrambledWord}</div>
            <div className="text-xs font-mono opacity-60">Hint: {hint}</div>
          </div>

          <div>
            <input
              type="text"
              value={userInput}
              onChange={handleInput}
              className="w-full px-4 py-3 bg-background border-2 border-foreground/30 focus:border-foreground/60 focus:outline-none font-mono text-lg text-center tracking-widest uppercase"
              placeholder="Type here..."
              autoFocus
            />
          </div>

          <div className="text-center text-xs font-mono opacity-60">
            {userInput.length > 0 && userInput !== currentWord && 'Keep trying!'}
            {userInput === currentWord && 'Correct!'}
          </div>
        </div>
      )}

      {!gameActive && score > 0 && (
        <div className="mt-6 text-center">
          <div className="text-xs font-mono opacity-80 mb-2">GAME OVER</div>
          <div className="text-xs font-mono opacity-70 mb-4">
            Final Score: {score} | Level: {level}
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
