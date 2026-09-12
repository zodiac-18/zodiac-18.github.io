import { useLang } from '../../context/LangContext'
import { content } from '../../data/content'
import ScrollReveal from '../ScrollReveal'
import TiltCard from '../TiltCard'
import './Works.css'

function highlightSelf(text, selfName) {
  if (!text.includes(selfName)) return <>{text}</>
  const parts = text.split(selfName)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <u>{selfName}</u>}
        </span>
      ))}
    </>
  )
}

export default function Works() {
  const { lang } = useLang()
  const t = content[lang].works

  return (
    <section id="works" className="section section-alt">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>

        {/* Awards */}
        <ScrollReveal delay={80}>
          <h3 className="pub-category-title">
            <i className="fas fa-trophy" /> {t.awardsLabel}
          </h3>
        </ScrollReveal>
        <div className="awards-grid">
          {t.awards.map((award, i) => (
            <ScrollReveal key={i} delay={120 + i * 80}>
              <TiltCard className="award-card">
                <div className="award-icon-circle">
                  <i className={award.highlight ? 'fas fa-trophy' : 'fas fa-medal'} />
                </div>
                <div className="award-body">
                  <h3>{award.title}</h3>
                  <p className="award-date">{award.year}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Publications */}
        <ScrollReveal delay={80}>
          <h3 className="pub-category-title" style={{ marginTop: '3rem' }}>
            <i className="fas fa-file-alt" /> {t.pubsLabel}
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <ul className="publication-list">
            {t.pubs.map((pub, i) => (
              <li key={i}>
                <span className="publication-item">
                  <span className="publication-authors">
                    {highlightSelf(pub.authors, pub.selfName)},&nbsp;
                  </span>
                  <span className="publication-title">{pub.title}&nbsp;</span>
                  <span className="publication-venue">{pub.venue}</span>
                  {pub.badge && (
                    <span className={`pub-badge ${pub.badge === 'in press' ? 'badge-press' : 'badge-award'}`}>
                      {pub.badge}
                    </span>
                  )}
                  {pub.link && (
                    <> <a href={pub.link} target="_blank" rel="noopener noreferrer">[Link]</a></>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}
