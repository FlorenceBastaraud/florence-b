import About from "@/components/About"
import Career from "@/components/Career"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ProjectsCTA from "@/components/ProjectsCTA"
import Sequotec from "@/components/Sequotec"
import Skills from "@/components/Skills"

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Sequotec />
        <Skills />
        <Career />
        <ProjectsCTA />
      </main>
      <Footer />
    </>
  )
}
