// filepath: components/Header.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import DarkModeToggle from './DarkModeToggle';
import SmoothScroll from './SmoothScroll';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      // Add shadow to header on scroll
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'skills', 'testimonials', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && window.scrollY >= section.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link href="/">Your Name</Link>
      </div>
      <nav className={styles.desktopNav} aria-label="Main Navigation">
        <ul role="menubar">
          <SmoothScroll>
            <li role="none" className={activeSection === 'home' ? styles.active : ''}>
              <Link href="#home" role="menuitem" aria-current={activeSection === 'home' ? 'page' : undefined}>Home</Link>
            </li>
            <li role="none" className={activeSection === 'about' ? styles.active : ''}>
              <Link href="#about" role="menuitem" aria-current={activeSection === 'about' ? 'page' : undefined}>About</Link>
            </li>
            <li role="none" className={activeSection === 'projects' ? styles.active : ''}>
              <Link href="#projects" role="menuitem" aria-current={activeSection === 'projects' ? 'page' : undefined}>Projects</Link>
            </li>
            <li role="none" className={activeSection === 'skills' ? styles.active : ''}>
              <Link href="#skills" role="menuitem" aria-current={activeSection === 'skills' ? 'page' : undefined}>Skills</Link>
            </li>
            <li role="none" className={activeSection === 'testimonials' ? styles.active : ''}>
              <Link href="#testimonials" role="menuitem" aria-current={activeSection === 'testimonials' ? 'page' : undefined}>Testimonials</Link>
            </li>
            <li role="none" className={activeSection === 'contact' ? styles.active : ''}>
              <Link href="#contact" role="menuitem" aria-current={activeSection === 'contact' ? 'page' : undefined}>Contact</Link>
            </li>
          </SmoothScroll>
        </ul>
      </nav>
      <div className={styles.rightItems}>
        <DarkModeToggle />
        <div className={styles.mobileNavContainer}>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;