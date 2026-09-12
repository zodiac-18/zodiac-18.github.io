import { useLang } from '../../context/LangContext'
import { content } from '../../data/content'
import ScrollReveal from '../ScrollReveal'
import './About.css'

export default function About() {
  const { lang } = useLang()
  const t = content[lang].about

  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>
        <div className="about-content">
          <ScrollReveal delay={60}>
            <p className="about-intro">{t.intro}</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="about-cards">
              {t.items.map(item => {
                const inner = (
                  <>
                    <span className="about-card-emoji">{item.emoji}</span>
                    <span className="about-card-label">{item.label}</span>
                    <span className="about-card-value">{item.value}</span>
                  </>
                )
                return item.link
                  ? (
                    <a
                      key={item.label}
                      className="about-card about-card-link"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </a>
                  )
                  : <div key={item.label} className="about-card">{inner}</div>
              })}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="about-hobbies-card">
              <span className="about-card-emoji">🎯</span>
              <span className="about-card-label">{t.hobbiesLabel}</span>
              <div className="hobby-tags">
                {t.hobbies.map(h => (
                  <span key={h.label} className="hobby-tag">
                    <span className="hobby-emoji">{h.emoji}</span> {h.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
