import { useState } from 'react'
import './App.css'
import Hearts from './components/Hearts'
import Intro from './components/Intro'
import Reasons from './components/Reasons'
import PhotoGallery from './components/PhotoGallery'
import Question from './components/Question'

type Screen = 'intro' | 'reasons' | 'gallery' | 'question'

function App() {
  const [screen, setScreen] = useState<Screen>('intro')

  return (
    <div className="app">
      <Hearts />

      {screen === 'intro' && (
        <Intro onContinue={() => setScreen('reasons')} />
      )}

      {screen === 'reasons' && (
        <Reasons onFinish={() => setScreen('gallery')} />
      )}

      {screen === 'gallery' && (
        <PhotoGallery onFinish={() => setScreen('question')} />
      )}

      {screen === 'question' && <Question />}
    </div>
  )
}

export default App
