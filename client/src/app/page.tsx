import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Projects } from "../components/sections/Projects";
import { Experience } from "../components/sections/Experience";
import { Skills } from "../components/sections/Skills";
import { Services } from "../components/sections/Services";
import { Certifications } from "../components/sections/Certifications";
import { Achievements } from "../components/sections/Achievements";
import { Hackathons } from "../components/sections/Hackathons";
// OpenSource (React Query) + Contact (React Hook Form + Zod) are the heavy,
// SEO-irrelevant client widgets — loaded client-only so their deps stay out of
// the initial bundle. Content sections above stay server-rendered for SEO.
import { OpenSource, Contact } from "../components/sections/LazySections";

/**
 * Home page. A server component that composes the client section components —
 * keeping the page shell out of the client bundle. Each section opts into
 * "use client" itself where it needs interactivity.
 */
export default function Page() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Services />
      <Certifications />
      <Achievements />
      <Hackathons />
      <OpenSource />
      <Contact />
    </main>
  );
}
