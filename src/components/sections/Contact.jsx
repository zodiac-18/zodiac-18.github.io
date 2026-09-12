import { useLang } from '../../context/LangContext'
import { content } from '../../data/content'
import ScrollReveal from '../ScrollReveal'
import './Contact.css'

const ICON_CLASS = {
  github: 'fab fa-github',
  linkedin: 'fab fa-linkedin',
  atcoder: 'fas fa-code',
}

export default function Contact() {
  const { lang } = useLang()
  const t = content[lang].contact

  return (
    <section id="contact" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="contact-desc">{t.desc}</p>
          <p className="contact-email">{t.email}</p>
          <div className="contact-links">
            {t.links.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn"
              >
                <i className={ICON_CLASS[link.icon] || 'fas fa-link'} />
                {link.label}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
      <footer className="site-footer">
        <p>© 2026 Kenichi Ogita</p>
      </footer>
    </section>
  )
}
