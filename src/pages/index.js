import React from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SEO from '../components/SEO'; // Import SEO component
import Testimonials from '../components/Testimonials';
// import ThemeDebug from '../components/ThemeDebug'; // Add to a page temporarily

// Use dynamic imports with no SSR for components with animations
const About = dynamic(() => import('../components/About'), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>Loading...</div>
});

const Projects = dynamic(() => import('../components/Projects'), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>Loading...</div>
});

const Skills = dynamic(() => import('../components/Skills'), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>Loading...</div>
});

const Contact = dynamic(() => import('../components/Contact'), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>Loading...</div>
});

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>Loading...</div>
});

export default function Home() {
  console.log('Rendering Home page');
  return (
    <>
      <SEO /> {/* Use SEO component instead of direct Head */}
      
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
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
      {/* <ThemeDebug /> Add to a page temporarily */}
    </>
  );
}