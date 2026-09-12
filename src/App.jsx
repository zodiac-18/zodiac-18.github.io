import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Career from './components/sections/Career'
import Skills from './components/sections/Skills'
import Works from './components/sections/Works'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Navbar />
        <main style={{ paddingTop: '4rem' }}>
          <Hero />
          <About />
          <Career />
          <Skills />
          <Works />
          <Contact />
        </main>
      </LangProvider>
    </ThemeProvider>
  )
}
