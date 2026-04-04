import ProjectsView from "@/components/ProjectsView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects | Florence Bastaraud",
  description: "Side projects by Florence Bastaraud, front-end developer.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <ProjectsView />
      </main>
      <Footer />
    </>
  );
}
