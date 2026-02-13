import { useState, useEffect, useRef } from 'react'

interface IntroProps {
  onContinue: () => void
}

export default function Intro({ onContinue }: IntroProps) {
  const [typedText, setTypedText] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [showVolumePopup, setShowVolumePopup] = useState(false)
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

  const handleOpenClick = () => {
    setShowVolumePopup(true)
  }

  const handleVolumeOk = () => {
    setShowVolumePopup(false)
    onContinue()
  }

  return (
    <section className="intro">
      <div className="intro-envelope">&#x1F48C;</div>
      <h1 className="intro-title">Alondra</h1>
      <div className="intro-typing">
        {typedText}
        <span className="typing-cursor" />
      </div>
      {showButton && (
        <button className="intro-btn" onClick={handleOpenClick}>
          Abrir mi carta
        </button>
      )}

      {showVolumePopup && (
        <div className="volume-overlay" onClick={handleVolumeOk}>
          <div className="volume-popup" onClick={(e) => e.stopPropagation()}>
            <span className="volume-icon">&#x1F50A;</span>
            <p className="volume-text">
              Sube el volumen de tu celular o computadora antes de continuar
            </p>
            <button className="volume-btn" onClick={handleVolumeOk}>
              Ya le subi!
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
