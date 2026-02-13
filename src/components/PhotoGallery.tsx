import { useEffect, useRef, useState } from 'react'

const photos = [
  { src: 'fotos/foto1.jpg', caption: 'Nuestro primer momento juntos' },
  { src: 'fotos/foto2.jpg', caption: 'Ese dia especial' },
  { src: 'fotos/foto3.jpg', caption: 'Siempre sonriendo' },
  { src: 'fotos/foto4.jpg', caption: 'Mi persona favorita' },
  { src: 'fotos/foto5.jpg', caption: 'Juntos es mejor' },
  { src: 'fotos/foto6.jpg', caption: 'Momentos que atesoro' },
  { src: 'fotos/foto7.jpg', caption: 'Contigo todo es magia' },
  { src: 'fotos/foto8.jpg', caption: 'Mi lugar favorito' },
  { src: 'fotos/foto9.jpg', caption: 'Te quiero' },
]

interface PhotoGalleryProps {
  onFinish: () => void
}

export default function PhotoGallery({ onFinish }: PhotoGalleryProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const base = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visibleItems.size >= photos.length) {
      const timer = setTimeout(onFinish, 2000)
      return () => clearTimeout(timer)
    }
  }, [visibleItems, onFinish])

  return (
    <section className="gallery section-enter">
      <h2 className="gallery-title">Nuestros momentos</h2>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <div
            key={i}
            ref={(el) => { itemsRef.current[i] = el }}
            data-index={i}
            className={`gallery-item ${visibleItems.has(i) ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <img src={`${base}${photo.src}`} alt={photo.caption} />
            <div className="gallery-item-overlay">{photo.caption}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
