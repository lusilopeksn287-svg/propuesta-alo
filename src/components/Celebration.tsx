import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export default function Celebration() {
  const hasLaunched = useRef(false)

  useEffect(() => {
    if (hasLaunched.current) return
    hasLaunched.current = true

    // Lanzar confetti en varias olas
    const launchConfetti = () => {
      // Primera ola - explosion central
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#dc143c', '#ffb6c1', '#ff1493', '#ff6b81'],
      })

      // Segunda ola - desde la izquierda
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
        })
      }, 300)

      // Tercera ola - desde la derecha
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
        })
      }, 600)

      // Corazones y estrellas extras
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 160,
          origin: { y: 0.4 },
          colors: ['#ff69b4', '#dc143c', '#ff1493', '#ffb6c1', '#e91e63'],
          shapes: ['circle', 'square'],
          scalar: 1.2,
        })
      }, 1000)

      // Ola final
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 180,
          origin: { y: 0.5, x: 0.5 },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1', '#ff1493'],
          startVelocity: 45,
          gravity: 0.8,
        })
      }, 1500)
    }

    launchConfetti()

    // Confetti continuo cada pocos segundos
    const interval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: Math.random() * 0.5 + 0.3, x: Math.random() },
        colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="celebration">
      <div className="celebration-heart">&#x1F496;</div>
      <h1 className="celebration-title">Sabia que dirias que si!</h1>
      <p className="celebration-message">
        Gracias por hacerme la persona mas feliz del mundo.
        <br /><br />
        Este 14 de febrero sera especial porque lo pasare contigo.
        <br /><br />
        Te quiero muchisimo, Alondra.
      </p>
      <p className="celebration-date">&#x2764;&#xFE0F; 14 de Febrero 2026 &#x2764;&#xFE0F;</p>
    </div>
  )
}
