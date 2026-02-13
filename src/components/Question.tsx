import { useState, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'

type Phase = 'no-escaping' | 'taunt' | 'yes-escaping' | 'yes-clicking' | 'done'

export default function Question() {
  const [phase, setPhase] = useState<Phase>('no-escaping')
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 })
  const [noEscapes, setNoEscapes] = useState(0)
  const [yesEscapes, setYesEscapes] = useState(0)
  const [progress, setProgress] = useState(0)
  const [tauntMsg, setTauntMsg] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const noMessages = [
    'No',
    'Jajaja intentalo de nuevo!',
    'Noop, aqui no!',
    'Casi! pero no...',
    'Sigue intentando!',
  ]

  const yesMessages = [
    'Si!',
    'Jaja tampoco aqui!',
    'Ya casi!',
  ]

  const moveButton = useCallback(() => {
    if (!containerRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const maxX = container.width / 2 - 80
    const maxY = container.height / 2 - 30
    const newX = (Math.random() - 0.5) * 2 * maxX
    const newY = (Math.random() - 0.5) * 2 * maxY
    setBtnPosition({ x: newX, y: newY })
  }, [])

  const handleNoInteraction = useCallback(() => {
    if (phase !== 'no-escaping') return
    const next = noEscapes + 1
    setNoEscapes(next)
    if (next >= 5) {
      setBtnPosition({ x: 0, y: 0 })
      setTauntMsg('Jajajaja hasta crees que sera tan facil')
      setPhase('taunt')
      setTimeout(() => {
        setPhase('yes-escaping')
        setTauntMsg('')
        setBtnPosition({ x: 0, y: 0 })
      }, 2500)
    } else {
      moveButton()
    }
  }, [phase, noEscapes, moveButton])

  const handleYesInteraction = useCallback(() => {
    if (phase !== 'yes-escaping') return
    const next = yesEscapes + 1
    setYesEscapes(next)
    if (next >= 3) {
      setBtnPosition({ x: 0, y: 0 })
      setPhase('yes-clicking')
    } else {
      moveButton()
    }
  }, [phase, yesEscapes, moveButton])

  const handleYesClick = useCallback(() => {
    if (phase !== 'yes-clicking') return
    const next = Math.min(progress + 5, 100)
    setProgress(next)

    // Mini confetti every 20%
    if (next % 20 === 0 && next < 100) {
      confetti({
        particleCount: 15,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
      })
    }

    if (next >= 100) {
      setPhase('done')
      // Big celebration
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#ff69b4', '#dc143c', '#ffb6c1', '#ff1493', '#e91e63'],
      })
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
        })
      }, 200)
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
        })
      }, 400)
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 180,
          origin: { y: 0.4, x: 0.5 },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1', '#ff1493'],
          startVelocity: 50,
          gravity: 0.7,
        })
      }, 800)

      // Continuous confetti after win
      const interval = setInterval(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: Math.random() * 0.4 + 0.3, x: Math.random() },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
        })
      }, 2500)

      // Stop after a while
      setTimeout(() => clearInterval(interval), 30000)
    }
  }, [phase, progress])

  const getButtonLabel = () => {
    if (phase === 'no-escaping') {
      return noMessages[Math.min(noEscapes, noMessages.length - 1)]
    }
    if (phase === 'yes-escaping') {
      return yesMessages[Math.min(yesEscapes, yesMessages.length - 1)]
    }
    return ''
  }

  const isNoPhase = phase === 'no-escaping'

  return (
    <section className="question-section section-enter">
      <h2 className="question-text">
        Alondra, quieres ser<br />mi San Valentin?
      </h2>

      {/* Taunt message */}
      {phase === 'taunt' && (
        <div className="taunt-message">{tauntMsg}</div>
      )}

      {/* Escaping button phases */}
      {(phase === 'no-escaping' || phase === 'yes-escaping') && (
        <div className="question-area" ref={containerRef}>
          <button
            className={isNoPhase ? 'btn-escape btn-escape-no' : 'btn-escape btn-escape-yes'}
            onMouseEnter={isNoPhase ? handleNoInteraction : handleYesInteraction}
            onTouchStart={(e) => {
              e.preventDefault()
              if (isNoPhase) handleNoInteraction()
              else handleYesInteraction()
            }}
            onClick={isNoPhase ? handleNoInteraction : handleYesInteraction}
            style={{
              transform: `translate(${btnPosition.x}px, ${btnPosition.y}px)`,
            }}
          >
            {getButtonLabel()}
          </button>
        </div>
      )}

      {/* Click to fill progress bar */}
      {phase === 'yes-clicking' && (
        <div className="yes-progress-area">
          <p className="progress-instruction">
            Dale click a "Si" hasta llegar al 100%!
          </p>
          <button className="btn-yes-click" onClick={handleYesClick}>
            Si! ({progress}%)
          </button>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
            <span className="progress-bar-text">{progress}%</span>
          </div>
        </div>
      )}

      {/* Final celebration */}
      {phase === 'done' && (
        <div className="question-celebration">
          <div className="qc-heart">&#x1F496;</div>
          <h2 className="qc-title">Sabia que dirias que si!</h2>
          <p className="qc-message">
            Gracias por hacerme la persona mas feliz del mundo.
            <br /><br />
            Este 14 de febrero sera especial porque lo pasare contigo.
            <br /><br />
            Te quiero muchisimo, Alondra.
          </p>
          <p className="qc-date">&#x2764;&#xFE0F; 14 de Febrero 2026 &#x2764;&#xFE0F;</p>
        </div>
      )}
    </section>
  )
}
