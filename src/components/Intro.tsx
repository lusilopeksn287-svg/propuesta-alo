import { useState, useEffect, useRef } from 'react'

interface IntroProps {
  onContinue: () => void
}

export default function Intro({ onContinue }: IntroProps) {
  const [typedText, setTypedText] = useState('')
  const [showButton, setShowButton] = useState(false)
  const fullText = 'Tengo algo especial para ti...'
  const indexRef = useRef(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < fullText.length) {
          setTypedText(fullText.slice(0, indexRef.current + 1))
          indexRef.current++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowButton(true), 500)
        }
      }, 70)

      return () => clearInterval(interval)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="intro">
      <div className="intro-envelope">&#x1F48C;</div>
      <h1 className="intro-title">Alondra</h1>
      <p className="intro-subtitle">14 de Febrero</p>
      <div className="intro-typing">
        {typedText}
        <span className="typing-cursor" />
      </div>
      {showButton && (
        <button className="intro-btn" onClick={onContinue}>
          Abrir mi carta
        </button>
      )}
    </section>
  )
}
