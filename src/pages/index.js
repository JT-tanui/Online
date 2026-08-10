import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import About from '../components/About';
import Projects from '../components/Projects';
import MoreWork from '../components/MoreWork';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// These were previously loaded with `dynamic(..., { ssr: false })`, which on a
// static export meant none of them existed in the exported HTML — the entire
// page below the hero was JavaScript-only. Search engines that render JS
// eventually caught up; AI crawlers and answer engines that fetch raw HTML saw
// a near-empty page. Static imports put the real content in the document.

export default function Home() {
  return (
    <>
      <SEO />

      <Header />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="more-work">
          <MoreWork />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
