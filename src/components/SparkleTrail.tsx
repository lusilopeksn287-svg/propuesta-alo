import { useEffect, useRef, useCallback } from 'react'

const sparkleChars = ['\u2728', '\u{1F496}', '\u2B50', '\u{1F4AB}']

export default function SparkleTrail() {
  const lastPos = useRef({ x: 0, y: 0 })
  const throttle = useRef(false)

  const createSparkle = useCallback((x: number, y: number) => {
    const el = document.createElement('span')
    el.className = 'sparkle'
    el.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)]
    el.style.left = `${x - 6 + (Math.random() - 0.5) * 20}px`
    el.style.top = `${y - 6 + (Math.random() - 0.5) * 20}px`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 800)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (throttle.current) return
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      if (Math.abs(dx) + Math.abs(dy) < 30) return

      throttle.current = true
      lastPos.current = { x: e.clientX, y: e.clientY }
      createSparkle(e.clientX, e.clientY)
      setTimeout(() => { throttle.current = false }, 60)
    }

    const handleTouch = (e: TouchEvent) => {
      if (throttle.current || !e.touches[0]) return
      const t = e.touches[0]
      const dx = t.clientX - lastPos.current.x
      const dy = t.clientY - lastPos.current.y
      if (Math.abs(dx) + Math.abs(dy) < 30) return

      throttle.current = true
      lastPos.current = { x: t.clientX, y: t.clientY }
      createSparkle(t.clientX, t.clientY)
      setTimeout(() => { throttle.current = false }, 80)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [createSparkle])

  return null
}
