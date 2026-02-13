import { useMemo } from 'react'

const petalEmojis = ['\u{1F339}', '\u{1F33A}', '\u{1F33B}', '\u{1F338}']

export default function Petals() {
  const petals = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: petalEmojis[i % petalEmojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 0.8 + Math.random() * 0.8,
    }))
  }, [])

  return (
    <div className="petals-container">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
