import { useEffect, useRef, useState } from 'react'

const reasons = [
  {
    number: '1',
    text: 'Porque tu sonrisa ilumina hasta mi peor dia.',
  },
  {
    number: '2',
    text: 'Porque cada momento a tu lado se siente como un regalo.',
  },
  {
    number: '3',
    text: 'Porque me haces querer ser mejor persona cada dia.',
  },
  {
    number: '4',
    text: 'Porque tu risa es mi sonido favorito en el mundo.',
  },
  {
    number: '5',
    text: 'Porque contigo aprendi lo que significa querer de verdad.',
  },
  {
    number: '6',
    text: 'Porque eres la razon por la que creo en el amor.',
  },
]

interface ReasonsProps {
  onFinish: () => void
}

export default function Reasons({ onFinish }: ReasonsProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visibleCards.size === reasons.length) {
      const timer = setTimeout(onFinish, 1500)
      return () => clearTimeout(timer)
    }
  }, [visibleCards, onFinish])

  return (
    <section className="reasons section-enter" ref={sectionRef}>
      <h2 className="reasons-title">Por que te quiero...</h2>
      {reasons.map((reason, i) => (
        <div
          key={i}
          ref={(el) => { cardsRef.current[i] = el }}
          data-index={i}
          className={`reason-card ${visibleCards.has(i) ? 'visible' : ''}`}
          style={{ transitionDelay: `${i * 0.15}s` }}
        >
          <div className="reason-number">{reason.number}</div>
          <p className="reason-text">{reason.text}</p>
        </div>
      ))}
    </section>
  )
}
