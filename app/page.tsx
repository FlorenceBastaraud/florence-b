import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Sequotec from "@/components/Sequotec";
import Career from "@/components/Career";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Sequotec />
        <Career />
      </main>
      <Footer />
    </>
  );
}
