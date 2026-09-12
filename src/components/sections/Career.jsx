import { useLang } from '../../context/LangContext'
import { content } from '../../data/content'
import ScrollReveal from '../ScrollReveal'
import './Career.css'

export default function Career() {
  const { lang } = useLang()
  const t = content[lang].career

  return (
    <section id="career" className="section section-alt">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>
        <div className="timeline">
          {t.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-date">{item.period}</div>
                  <h3 className="timeline-title">
                    {item.place}
                    {item.current && <span className="timeline-now">now</span>}
                  </h3>
                  <p className="timeline-subtitle">{item.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
