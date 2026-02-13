import { useState, useRef, useCallback, useEffect } from 'react'
import confetti from 'canvas-confetti'

interface LyricLine {
  time: number
  en: string
  es: string
}

const lyrics: LyricLine[] = [
  { time: 13.0, en: "What do you have in store?", es: "Que tienes guardado para mi?" },
  { time: 16.5, en: "One life away, we can't explore", es: "A una vida de distancia, no podemos explorar" },
  { time: 20.0, en: "But I don't want to get in the way no more", es: "Pero ya no quiero estorbar mas" },
  { time: 24.0, en: "'Cause this the type of feeling you can't ignore", es: "Porque este es el tipo de sentimiento que no puedes ignorar" },
  { time: 28.5, en: "I'm ready to break down the door, settle the score", es: "Estoy listo para tirar la puerta, arreglar las cuentas" },
  { time: 33.0, en: "I can't let you go away", es: "No puedo dejarte ir" },
  { time: 36.0, en: "I miss the smile on your face", es: "Extrano la sonrisa en tu cara" },
  { time: 39.0, en: "You know that I lo-lo-lo-love the chase", es: "Sabes que me en-en-encanta la persecucion" },
  { time: 43.0, en: "You told me once that I was crazy", es: "Me dijiste una vez que estaba loco" },
  { time: 46.5, en: "I said, \"Baby girl, I know\"", es: "Te dije, \"Nena, lo se\"" },
  { time: 49.0, en: "\"But I can't let you go away\"", es: "\"Pero no puedo dejarte ir\"" },
  { time: 52.0, en: "So don't you get me started now", es: "Asi que no me hagas empezar" },
  { time: 55.0, en: "I want a yes, I don't want maybes", es: "Quiero un si, no quiero tal vez" },
  { time: 58.5, en: "'Cause they leave me where you found me", es: "Porque me dejan donde me encontraste" },
  { time: 62.0, en: "So don't leave", es: "Asi que no te vayas" },
  { time: 65.0, en: "Ooh, I just love the way you've got me feeling", es: "Ooh, me encanta como me haces sentir" },
  { time: 71.5, en: "And now I feel it", es: "Y ahora lo siento" },
  { time: 74.5, en: "It's like, ooh", es: "Es como, ooh" },
  { time: 77.5, en: "Take away the pain", es: "Quita el dolor" },
  { time: 80.0, en: "Baby, I'm healing, baby, I'm healing", es: "Nena, estoy sanando, nena, estoy sanando" },
  { time: 85.0, en: "I don't need anything more", es: "No necesito nada mas" },
  { time: 88.0, en: "Be the wave, I'll be the shore", es: "Se la ola, yo sere la orilla" },
  { time: 91.5, en: "Crashing all over me", es: "Chocando por todo mi ser" },
  { time: 94.5, en: "I want you", es: "Te quiero a ti" },
  { time: 100.0, en: "What do you have in store?", es: "Que tienes guardado para mi?" },
  { time: 103.0, en: "Type of girl that make me drop dead on the floor", es: "El tipo de chica que me deja muerto en el piso" },
  { time: 106.5, en: "This the only girl that I love and adore", es: "Esta es la unica chica que amo y adoro" },
  { time: 110.0, en: "This the type of love that you can't ignore", es: "Este es el tipo de amor que no puedes ignorar" },
  { time: 114.0, en: "I said, \"Hey, she coming my way\"", es: "Dije, \"Hey, ella viene hacia mi\"" },
  { time: 117.5, en: "She running 'round saying whatever she wanna say", es: "Ella anda por ahi diciendo lo que quiera decir" },
  { time: 121.0, en: "I told her I don't wanna have to do this everyday", es: "Le dije que no quiero tener que hacer esto todos los dias" },
  { time: 125.0, en: "Told her that I love her but she thinking it's a game", es: "Le dije que la amo pero ella piensa que es un juego" },
  { time: 129.0, en: "Oh, no", es: "Oh, no" },
  { time: 131.0, en: "Now she uncomfortable", es: "Ahora ella esta incomoda" },
  { time: 133.5, en: "Never wanna make her feel one-dimensional", es: "Nunca quise hacerla sentir unidimensional" },
  { time: 137.5, en: "Don't know how we got there", es: "No se como llegamos ahi" },
  { time: 139.5, en: "Don't you get me started now", es: "No me hagas empezar ahora" },
  { time: 142.5, en: "You told me once that I was crazy", es: "Me dijiste una vez que estaba loco" },
  { time: 146.0, en: "I said, \"Baby girl, I know\"", es: "Te dije, \"Nena, lo se\"" },
  { time: 148.5, en: "\"But I can't let you go away\"", es: "\"Pero no puedo dejarte ir\"" },
  { time: 151.5, en: "So don't you get me started now", es: "Asi que no me hagas empezar" },
  { time: 154.5, en: "I want a yes, I don't want maybes", es: "Quiero un si, no quiero tal vez" },
  { time: 158.0, en: "'Cause they leave me where you found me", es: "Porque me dejan donde me encontraste" },
  { time: 161.5, en: "So don't leave", es: "Asi que no te vayas" },
  { time: 164.5, en: "Ooh, I just love the way you've got me feeling", es: "Ooh, me encanta como me haces sentir" },
  { time: 171.0, en: "And now I feel it", es: "Y ahora lo siento" },
  { time: 174.0, en: "It's like, ooh", es: "Es como, ooh" },
  { time: 177.0, en: "Take away the pain", es: "Quita el dolor" },
  { time: 179.5, en: "Baby, I'm healing, baby, I'm healing", es: "Nena, estoy sanando, nena, estoy sanando" },
  { time: 184.5, en: "I don't need anything more", es: "No necesito nada mas" },
  { time: 187.5, en: "Be the wave, I'll be the shore", es: "Se la ola, yo sere la orilla" },
  { time: 191.0, en: "Crashing all over me", es: "Chocando por todo mi ser" },
  { time: 194.0, en: "I want you", es: "Te quiero a ti" },
]

type Phase = 'no-escaping' | 'taunt' | 'yes-escaping' | 'yes-clicking' | 'done'

interface QuestionProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export default function Question({ audioRef }: QuestionProps) {
  const [phase, setPhase] = useState<Phase>('no-escaping')
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 })
  const [noEscapes, setNoEscapes] = useState(0)
  const [yesEscapes, setYesEscapes] = useState(0)
  const [progress, setProgress] = useState(0)
  const [tauntMsg, setTauntMsg] = useState('')
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const animFrameRef = useRef<number>(0)

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

  // Sync lyrics to audio
  const syncLyrics = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const currentTime = audio.currentTime
    let idx = -1
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        idx = i
        break
      }
    }

    setCurrentLyricIndex(idx)
    animFrameRef.current = requestAnimationFrame(syncLyrics)
  }, [audioRef])

  useEffect(() => {
    if (phase !== 'done') return
    animFrameRef.current = requestAnimationFrame(syncLyrics)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [phase, syncLyrics])

  // Auto-scroll to current lyric
  useEffect(() => {
    if (currentLyricIndex >= 0 && lineRefs.current[currentLyricIndex]) {
      lineRefs.current[currentLyricIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [currentLyricIndex])

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

      const interval = setInterval(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: Math.random() * 0.4 + 0.3, x: Math.random() },
          colors: ['#ff69b4', '#dc143c', '#ffb6c1'],
        })
      }, 2500)

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
      {phase !== 'done' && (
        <h2 className="question-text">
          Alondra, quieres ser<br />mi San Valentin?
        </h2>
      )}

      {phase === 'taunt' && (
        <div className="taunt-message">{tauntMsg}</div>
      )}

      {(phase === 'no-escaping' || phase === 'yes-escaping') && (
        <div className="question-area" ref={containerRef}>
          <button
            className={`btn-escape ${isNoPhase ? 'btn-escape-no' : 'btn-escape-yes'} ${btnPosition.x === 0 && btnPosition.y === 0 ? 'btn-idle' : ''}`}
            onClick={isNoPhase ? handleNoInteraction : handleYesInteraction}
            style={{
              transform: `translate(${btnPosition.x}px, ${btnPosition.y}px)`,
            }}
          >
            {getButtonLabel()}
          </button>
        </div>
      )}

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

      {phase === 'done' && (
        <div className="question-done-layout">
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

          <div className="lyrics-inline">
            <h3 className="lyrics-now-playing">d4vd - Feel It</h3>
            <div className="lyrics-scroll">
              {lyrics.map((line, i) => (
                <div
                  key={i}
                  ref={(el) => { lineRefs.current[i] = el }}
                  className={`lyric-line ${i === currentLyricIndex ? 'lyric-active' : ''} ${i < currentLyricIndex ? 'lyric-past' : ''}`}
                >
                  <p className="lyric-en">{line.en}</p>
                  <p className="lyric-es">{line.es}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
