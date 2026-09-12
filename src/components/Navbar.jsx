import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { content } from '../data/content'
import './Navbar.css'

export default function Navbar() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)

  const t = content[lang]
  const sections = ['about', 'career', 'skills', 'works', 'contact']

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand">Kenichi Ogita</div>
        <ul className="nav-menu">
          {sections.map((id, i) => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>
                {t.nav[i]}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-controls">
          <button className="nav-toggle-btn" onClick={toggleLang}>{lang === 'ja' ? 'EN' : 'JA'}</button>
          <button className="nav-toggle-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <i className="fas fa-sun" /> : <i className="fas fa-moon" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
