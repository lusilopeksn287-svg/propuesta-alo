import { useState, useRef, useCallback, useEffect } from 'react'
import confetti from 'canvas-confetti'

interface LyricLine {
  time: number
  en: string
  es: string
}

const lyrics: LyricLine[] = [
  // Verse 1
  { time: 8.65, en: "What do you have in store?", es: "Que tienes guardado para mi?" },
  { time: 9.93, en: "One life away, we can't explore", es: "A una vida de distancia, no podemos explorar" },
  { time: 11.70, en: "But I don't want to get in the way no more", es: "Pero ya no quiero estorbar mas" },
  { time: 13.85, en: "'Cause this the type of feeling you can't ignore", es: "Porque este es el tipo de sentimiento que no puedes ignorar" },
  { time: 15.81, en: "I'm ready to break down the door", es: "Estoy listo para tirar la puerta" },
  { time: 17.67, en: "Settle the score, I can't let you go away", es: "Arreglar las cuentas, no puedo dejarte ir" },
  { time: 20.51, en: "I miss the smile off your face", es: "Extrano la sonrisa en tu cara" },
  { time: 22.36, en: "You know that I l-l-l-love the chase", es: "Sabes que me en-en-encanta la persecucion" },
  // Pre-chorus 1
  { time: 24.48, en: "You told me once that I was crazy, I said, \"Baby girl, I know\"", es: "Me dijiste una vez que estaba loco, te dije, \"Nena, lo se\"" },
  { time: 29.39, en: "But I can't let you go away, so don't you get me started now", es: "Pero no puedo dejarte ir, asi que no me hagas empezar" },
  { time: 32.47, en: "I want a yes, I don't want maybes 'cause they leave me where you found me", es: "Quiero un si, no quiero tal vez porque me dejan donde me encontraste" },
  { time: 38.70, en: "So don't leave", es: "Asi que no te vayas" },
  // Chorus 1
  { time: 40.03, en: "Ooh, I just love the way you got me feeling", es: "Ooh, me encanta como me haces sentir" },
  { time: 45.51, en: "And now I can feel it, it's like, ooh", es: "Y ahora lo siento, es como, ooh" },
  { time: 49.51, en: "Take away the pain, baby, I'm healing", es: "Quita el dolor, nena, estoy sanando" },
  { time: 53.28, en: "Baby, I'm healing", es: "Nena, estoy sanando" },
  // Post-chorus
  { time: 56.10, en: "I don't need anything more", es: "No necesito nada mas" },
  { time: 59.85, en: "Be the wave, I'll be the shore", es: "Se la ola, yo sere la orilla" },
  { time: 63.75, en: "Crashing all over me, I want you", es: "Chocando por todo mi ser, te quiero a ti" },
  // Verse 2
  { time: 72.25, en: "What do you have in store?", es: "Que tienes guardado para mi?" },
  { time: 73.75, en: "Type of girl that make me drop dead on the floor", es: "El tipo de chica que me deja muerto en el piso" },
  { time: 75.88, en: "This the only girl that I love and adore", es: "Esta es la unica chica que amo y adoro" },
  { time: 77.62, en: "This the type of love that you can't ignore", es: "Este es el tipo de amor que no puedes ignorar" },
  { time: 79.83, en: "I said, \"Hey, she comin' my way\"", es: "Dije, \"Hey, ella viene hacia mi\"" },
  { time: 81.63, en: "She runnin' 'round sayin' whatever she wanna say", es: "Ella anda por ahi diciendo lo que quiera decir" },
  { time: 83.68, en: "I told her I don't wanna have to do this everyday", es: "Le dije que no quiero tener que hacer esto todos los dias" },
  { time: 85.53, en: "Told her that I love her, but she thinkin' it's a game", es: "Le dije que la amo pero ella piensa que es un juego" },
  { time: 87.50, en: "Oh, no, now she uncomfortable", es: "Oh, no, ahora ella esta incomoda" },
  { time: 89.52, en: "Never wanna make it for one-dimensional", es: "Nunca quise hacerla sentir unidimensional" },
  { time: 93.73, en: "Don't know how we got here", es: "No se como llegamos ahi" },
  { time: 94.58, en: "Don't you get me started now", es: "No me hagas empezar ahora" },
  // Pre-chorus 2
  { time: 96.07, en: "You told me once that I was crazy, I said, \"Baby girl, I know\"", es: "Me dijiste una vez que estaba loco, te dije, \"Nena, lo se\"" },
  { time: 101.05, en: "But I can't let you go away, so don't you get me started now", es: "Pero no puedo dejarte ir, asi que no me hagas empezar" },
  { time: 103.99, en: "I want a yes, I don't want maybes 'cause they leave me where you found me", es: "Quiero un si, no quiero tal vez porque me dejan donde me encontraste" },
  { time: 110.43, en: "So don't leave", es: "Asi que no te vayas" },
  // Chorus 2
  { time: 111.97, en: "Ooh, I just love the way you got me feeling", es: "Ooh, me encanta como me haces sentir" },
  { time: 116.96, en: "And now I can feel it, it's like, ooh", es: "Y ahora lo siento, es como, ooh" },
  { time: 121.65, en: "Take away the pain, baby, I'm healing", es: "Quita el dolor, nena, estoy sanando" },
  { time: 125.13, en: "Baby, I'm healing", es: "Nena, estoy sanando" },
  // Outro
  { time: 127.25, en: "I don't need anything more", es: "No necesito nada mas" },
  { time: 131.64, en: "Be the wave, I'll be the shore", es: "Se la ola, yo sere la orilla" },
  { time: 135.10, en: "Crashing all over me, I want you", es: "Chocando por todo mi ser, te quiero a ti" },
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
    const btnWidth = 180
    const btnHeight = 50
    const padding = 20
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Random absolute position anywhere on screen
    const newX = padding + Math.random() * (vw - btnWidth - padding * 2)
    const newY = padding + Math.random() * (vh - btnHeight - padding * 2)
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
    } else {
      moveButton()
    }
  }, [phase, noEscapes, moveButton])

  const handleTauntContinue = useCallback(() => {
    if (phase !== 'taunt') return
    setPhase('yes-escaping')
    setTauntMsg('')
    setBtnPosition({ x: 0, y: 0 })
  }, [phase])

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
      {phase !== 'done' && phase !== 'taunt' && (
        <h2 className="question-text">
          Alondra, quieres ser<br />mi San Valentin?
        </h2>
      )}

      {phase === 'taunt' && (
        <div className="taunt-message">
          {tauntMsg}
          <br />
          <button className="taunt-continue" onClick={handleTauntContinue}>
            Continuar
          </button>
        </div>
      )}

      {(phase === 'no-escaping' || phase === 'yes-escaping') && (
        <div className="question-area">
          <button
            className={`btn-escape ${isNoPhase ? 'btn-escape-no' : 'btn-escape-yes'} ${btnPosition.x === 0 && btnPosition.y === 0 ? 'btn-idle' : ''}`}
            onClick={isNoPhase ? handleNoInteraction : handleYesInteraction}
            style={
              btnPosition.x === 0 && btnPosition.y === 0
                ? {}
                : { left: `${btnPosition.x}px`, top: `${btnPosition.y}px` }
            }
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
