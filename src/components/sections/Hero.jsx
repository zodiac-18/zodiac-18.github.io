import { useEffect, useRef } from 'react'
import { useLang } from '../../context/LangContext'
import { content } from '../../data/content'
import './Hero.css'

export default function Hero() {
  const { lang } = useLang()
  const t = content[lang]
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const socialRef = useRef(null)

  useEffect(() => {
    const els = [imageRef, titleRef, subtitleRef, socialRef]
    const timer = setTimeout(() => {
      els.forEach(r => r.current?.classList.add('hero-visible'))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-image-wrap" ref={imageRef}>
            <img className="hero-photo" src="/profile.jpg" alt="Kenichi Ogita" />
          </div>
          <h1 className="hero-title" ref={titleRef}>Kenichi Ogita</h1>
          <p className="hero-subtitle" ref={subtitleRef}>{t.hero.subtitle}</p>
          <div className="social-links" ref={socialRef}>
            <a href="https://github.com/zodiac_18" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/kenichi-ogita-336ab2274/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://atcoder.jp/users/lunz_0d" target="_blank" rel="noopener noreferrer" aria-label="AtCoder">
              <i className="fas fa-code" />
            </a>
            <a href="mailto:kenogita1811@gmail.com" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
