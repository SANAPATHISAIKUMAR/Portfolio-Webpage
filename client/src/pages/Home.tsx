import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Projects } from "../components/sections/Projects";
import { Experience } from "../components/sections/Experience";
import { Skills } from "../components/sections/Skills";
import { Achievements } from "../components/sections/Achievements";
import { Hackathons } from "../components/sections/Hackathons";
import { OpenSource } from "../components/sections/OpenSource";
import { Contact } from "../components/sections/Contact";

export function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Achievements />
      <Hackathons />
      <OpenSource />
      <Contact />
    </main>
  );
}
