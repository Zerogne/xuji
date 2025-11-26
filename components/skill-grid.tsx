'use client'

import { useState, useEffect } from 'react'

const skills = [
  'Next.js',
  'TypeScript',
  'React',
  'Tailwind',
  'MongoDB',
  'AI/ML',
  'Design',
  'Automation',
]

export default function SkillGrid() {
  const [gameActive, setGameActive] = useState(false)
  const [cards, setCards] = useState<{ id: number; skill: string; flipped: boolean; matched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)

  const startGame = () => {
    const pairs = [...skills, ...skills]
    const shuffled = pairs
      .map((skill, index) => ({ id: index, skill, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5)
    
    setCards(shuffled)
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
    setGameActive(true)
  }

  const handleCardClick = (index: number) => {
    if (!gameActive || cards[index].flipped || cards[index].matched || flippedCards.length === 2) return

    const newCards = [...cards]
    newCards[index].flipped = true
    setCards(newCards)

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      
      if (cards[first].skill === cards[second].skill) {
        setTimeout(() => {
          const updatedCards = [...newCards]
          updatedCards[first].matched = true
          updatedCards[second].matched = true
          setCards(updatedCards)
          setFlippedCards([])
          setMatches(matches + 1)
          
          if (matches + 1 === skills.length) {
            setTimeout(() => {
              setGameActive(false)
            }, 500)
          }
        }, 500)
      } else {
        setTimeout(() => {
          const updatedCards = [...newCards]
          updatedCards[first].flipped = false
          updatedCards[second].flipped = false
          setCards(updatedCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="w-full my-6 border border-foreground/30 p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-mono opacity-80">MEMORY MATCH</div>
        {gameActive && (
          <div className="flex gap-4 text-xs font-mono opacity-80">
            <span>MATCHES: {matches}/{skills.length}</span>
            <span>MOVES: {moves}</span>
          </div>
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
          <p className="text-xs font-mono opacity-70 mt-4">Find matching skill pairs</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.matched}
              className={`px-3 py-4 border text-xs font-mono transition-all duration-200 ${
                card.matched
                  ? 'border-foreground/20 bg-foreground/5 opacity-40 cursor-not-allowed'
                  : card.flipped
                  ? 'border-foreground/60 bg-foreground/10 opacity-100'
                  : 'border-foreground/30 hover:border-foreground/50 opacity-80 hover:opacity-100'
              }`}
            >
              {card.flipped || card.matched ? card.skill : '?'}
            </button>
          ))}
        </div>
      )}

      {!gameActive && matches === skills.length && (
        <div className="mt-4 text-center text-xs font-mono opacity-60">
          Game Complete! Moves: {moves}
        </div>
      )}
    </div>
  )
}

