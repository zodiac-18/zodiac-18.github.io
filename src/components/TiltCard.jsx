import { useRef } from 'react'

export default function TiltCard({ children, className = '', intensity = 10 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const tiltX = ((y / rect.height) - 0.5) * -intensity
    const tiltY = ((x / rect.width) - 0.5) * intensity
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
  }

  const onLeave = () => {
    const card = ref.current
    if (card) card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.1s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
