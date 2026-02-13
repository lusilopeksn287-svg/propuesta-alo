import { useState, useRef, useCallback } from 'react'
import './App.css'
import Hearts from './components/Hearts'
import Petals from './components/Petals'
import SparkleTrail from './components/SparkleTrail'
import Intro from './components/Intro'
import Reasons from './components/Reasons'
import Question from './components/Question'

const base = import.meta.env.BASE_URL || '/'

type Screen = 'intro' | 'reasons' | 'question'

function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [musicStarted, setMusicStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const startMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio || musicStarted) return
    audio.volume = 0.35
    audio.loop = true
    audio.play().catch(() => {
      // Autoplay blocked
    })
    setMusicStarted(true)
  }, [musicStarted])

  const handleIntro = () => {
    startMusic()
    setScreen('reasons')
  }

  return (
    <div className="app">
      <audio ref={audioRef} src={`${base}audio/feel-it.mp3`} preload="auto" />
      <Hearts />
      <Petals />
      <SparkleTrail />

      {screen === 'intro' && (
        <Intro onContinue={handleIntro} />
      )}

      {screen === 'reasons' && (
        <Reasons onFinish={() => setScreen('question')} />
      )}

      {screen === 'question' && <Question audioRef={audioRef} />}
    </div>
  )
}

export default App
