import { useMemo } from 'react'

const HEART_EMOJIS = ['&#x2764;&#xFE0F;', '&#x1F497;', '&#x1F496;', '&#x1F495;', '&#x1F49E;', '&#x1F49D;', '&#x1F49B;']

export default function Hearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      size: 0.8 + Math.random() * 1.5,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    }))
  }, [])

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}rem`,
          }}
          dangerouslySetInnerHTML={{ __html: heart.emoji }}
        />
      ))}
    </div>
  )
}
