import { useState } from 'react'

const base = import.meta.env.BASE_URL || '/'

interface Slide {
  images: string[]
  text: string
  subtitle?: string
  extraImage?: string
}

const slides: Slide[] = [
  {
    images: ['fotos/foto1.jpg'],
    text: 'Porque confiaste en mi cuando nadie mas lo hacia',
  },
  {
    images: ['fotos/foto2.jpg'],
    text: 'Porque jalas a cualquier lado solo para hacer desmadre juntos',
  },
  {
    images: ['fotos/foto3.jpg'],
    text: 'Porque estas igual de loquita que yo',
  },
  {
    images: ['fotos/foto4.jpg'],
    text: 'Porque le entras a los azulitos y te gusta Lilo & Stitch',
    subtitle: 'Osea mi naquita \u2764\uFE0F',
    extraImage: 'fotos/stitch.svg',
  },
  {
    images: ['fotos/foto5.jpg', 'fotos/foto6.jpg'],
    text: 'Por nuestra familia perruna',
  },
  {
    images: ['fotos/foto7.jpg', 'fotos/foto8.jpg', 'fotos/foto9.jpg'],
    text: 'Porque cada dia descubro algo nuevo que me enamora mas de ti',
  },
]

interface ReasonsProps {
  onFinish: () => void
}

export default function Reasons({ onFinish }: ReasonsProps) {
  const [current, setCurrent] = useState(-1) // -1 = title screen

  const slide = current >= 0 ? slides[current] : null
  const isLast = current === slides.length - 1

  const handleNext = () => {
    if (isLast) {
      onFinish()
    } else {
      setCurrent((prev) => prev + 1)
    }
  }

  return (
    <section className="reasons section-enter">
      {current === -1 && (
        <div className="reasons-intro" key="title">
          <h2 className="reasons-title">Razones por las que te amo</h2>
          <button className="reasons-btn" onClick={() => setCurrent(0)}>
            Comenzar
          </button>
        </div>
      )}

      {slide && (
        <div className="slide" key={current}>
          <p className="slide-counter">{current + 1} / {slides.length}</p>

          <div className={`slide-images ${slide.images.length > 1 ? 'slide-images-multi' : ''}`}>
            {slide.images.map((img, i) => (
              <div className="slide-img-wrapper" key={i}>
                <img src={`${base}${img}`} alt="" className="slide-img" />
              </div>
            ))}
          </div>

          {slide.extraImage && (
            <div className="slide-extra">
              <img src={`${base}${slide.extraImage}`} alt="Stitch" className="slide-extra-img" />
            </div>
          )}

          <p className="slide-text">{slide.text}</p>

          {slide.subtitle && (
            <p className="slide-subtitle">{slide.subtitle}</p>
          )}

          <button className="reasons-btn" onClick={handleNext}>
            {isLast ? 'Continuar' : 'Siguiente'}
          </button>
        </div>
      )}
    </section>
  )
}
