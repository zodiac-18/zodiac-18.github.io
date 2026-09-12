import { useLang } from '../../context/LangContext'
import { content } from '../../data/content'
import ScrollReveal from '../ScrollReveal'
import './Skills.css'

export default function Skills() {
  const { lang } = useLang()
  const t = content[lang].skills

  return (
    <section id="skills" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>

        <div className="skills-grid">
          <ScrollReveal delay={80}>
            <div className="skill-category">
              <h3 className="skill-category-title">
                <i className="fas fa-code" /> {t.langLabel}
              </h3>
              <div className="lang-chips">
                {t.langs.map(l => (
                  <span key={l.name} className="lang-chip">
                    <i className={l.icon} /> {l.name}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="skill-category">
              <h3 className="skill-category-title">
                <i className="fas fa-flask" /> {t.researchLabel}
              </h3>
              <div className="expertise-tags">
                {t.research.map(r => <span key={r} className="expertise-tag">{r}</span>)}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="skill-category">
              <h3 className="skill-category-title">
                <i className="fas fa-certificate" /> {t.certLabel}
              </h3>
              <ul className="cert-list">
                {t.certs.map(c => (
                  <li key={c.name} className="cert-item">
                    <i className="fas fa-award cert-icon" />
                    <span className="cert-name">
                      {c.name}
                      {c.score && <span className="cert-score"> — {c.score}</span>}
                    </span>
                    <span className="cert-date">{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
