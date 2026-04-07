import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProjectsView from "@/components/ProjectsView"

export const metadata = {
  title: "Projets persos | Florence Bastaraud",
  description:
    "Projets personnels de Florence Bastaraud, développeuse front-end.",
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <ProjectsView />
      </main>
      <Footer />
    </>
  )
}
