import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../components/Header';

// Import Hero component normally since it's simpler
import Hero from '../components/Hero';

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
  return (
    <>
      <Head>
        <title>Your Name - Software Developer</title>
        <meta name="description" content="Personal portfolio showcasing my software development projects and skills." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
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
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </>
  );
}