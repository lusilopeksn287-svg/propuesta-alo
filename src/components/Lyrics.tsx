import { useState, useEffect, useRef, useCallback } from 'react'

interface LyricLine {
  time: number
  en: string
  es: string
}

const lyrics: LyricLine[] = [
  // Verse 1
  { time: 13.0, en: "What do you have in store?", es: "Que tienes guardado para mi?" },
  { time: 16.5, en: "One life away, we can't explore", es: "A una vida de distancia, no podemos explorar" },
  { time: 20.0, en: "But I don't want to get in the way no more", es: "Pero ya no quiero estorbar mas" },
  { time: 24.0, en: "'Cause this the type of feeling you can't ignore", es: "Porque este es el tipo de sentimiento que no puedes ignorar" },
  { time: 28.5, en: "I'm ready to break down the door, settle the score", es: "Estoy listo para tirar la puerta, arreglar las cuentas" },
  { time: 33.0, en: "I can't let you go away", es: "No puedo dejarte ir" },
  { time: 36.0, en: "I miss the smile on your face", es: "Extrano la sonrisa en tu cara" },
  { time: 39.0, en: "You know that I lo-lo-lo-love the chase", es: "Sabes que me en-en-encanta la persecucion" },
  // Pre-Chorus
  { time: 43.0, en: "You told me once that I was crazy", es: "Me dijiste una vez que estaba loco" },
  { time: 46.5, en: "I said, \"Baby girl, I know\"", es: "Te dije, \"Nena, lo se\"" },
  { time: 49.0, en: "\"But I can't let you go away\"", es: "\"Pero no puedo dejarte ir\"" },
  { time: 52.0, en: "So don't you get me started now", es: "Asi que no me hagas empezar" },
  { time: 55.0, en: "I want a yes, I don't want maybes", es: "Quiero un si, no quiero tal vez" },
  { time: 58.5, en: "'Cause they leave me where you found me", es: "Porque me dejan donde me encontraste" },
  { time: 62.0, en: "So don't leave", es: "Asi que no te vayas" },
  // Chorus
  { time: 65.0, en: "Ooh, I just love the way you've got me feeling", es: "Ooh, me encanta como me haces sentir" },
  { time: 71.5, en: "And now I feel it", es: "Y ahora lo siento" },
  { time: 74.5, en: "It's like, ooh", es: "Es como, ooh" },
  { time: 77.5, en: "Take away the pain", es: "Quita el dolor" },
  { time: 80.0, en: "Baby, I'm healing, baby, I'm healing", es: "Nena, estoy sanando, nena, estoy sanando" },
  { time: 85.0, en: "I don't need anything more", es: "No necesito nada mas" },
  { time: 88.0, en: "Be the wave, I'll be the shore", es: "Se la ola, yo sere la orilla" },
  { time: 91.5, en: "Crashing all over me", es: "Chocando por todo mi ser" },
  { time: 94.5, en: "I want you", es: "Te quiero a ti" },
  // Verse 2
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
  // Pre-Chorus 2
  { time: 142.5, en: "You told me once that I was crazy", es: "Me dijiste una vez que estaba loco" },
  { time: 146.0, en: "I said, \"Baby girl, I know\"", es: "Te dije, \"Nena, lo se\"" },
  { time: 148.5, en: "\"But I can't let you go away\"", es: "\"Pero no puedo dejarte ir\"" },
  { time: 151.5, en: "So don't you get me started now", es: "Asi que no me hagas empezar" },
  { time: 154.5, en: "I want a yes, I don't want maybes", es: "Quiero un si, no quiero tal vez" },
  { time: 158.0, en: "'Cause they leave me where you found me", es: "Porque me dejan donde me encontraste" },
  { time: 161.5, en: "So don't leave", es: "Asi que no te vayas" },
  // Chorus 2
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

interface LyricsProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export default function Lyrics({ audioRef }: LyricsProps) {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [started, setStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const animFrameRef = useRef<number>(0)

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

    setCurrentIndex(idx)
    animFrameRef.current = requestAnimationFrame(syncLyrics)
  }, [audioRef])

  useEffect(() => {
    if (!started) return
    animFrameRef.current = requestAnimationFrame(syncLyrics)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [started, syncLyrics])

  // Auto-scroll to current lyric
  useEffect(() => {
    if (currentIndex >= 0 && lineRefs.current[currentIndex]) {
      lineRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [currentIndex])

  const handleStart = () => {
    const audio = audioRef.current
    if (!audio) return
    // Restart song from beginning for the lyrics section
    audio.currentTime = 0
    audio.play()
    setStarted(true)
  }

  return (
    <section className="lyrics-section section-enter">
      {!started ? (
        <div className="lyrics-intro">
          <h2 className="lyrics-title">d4vd - Feel It</h2>
          <p className="lyrics-subtitle">Nuestra cancion</p>
          <button className="reasons-btn" onClick={handleStart}>
            Escuchar juntos
          </button>
        </div>
      ) : (
        <div className="lyrics-container" ref={containerRef}>
          <h3 className="lyrics-now-playing">d4vd - Feel It</h3>
          <div className="lyrics-scroll">
            {lyrics.map((line, i) => (
              <div
                key={i}
                ref={(el) => { lineRefs.current[i] = el }}
                className={`lyric-line ${i === currentIndex ? 'lyric-active' : ''} ${i < currentIndex ? 'lyric-past' : ''}`}
              >
                <p className="lyric-en">{line.en}</p>
                <p className="lyric-es">{line.es}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
