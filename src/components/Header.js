import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Header.module.css';
import { personalInfo } from '../data/personalInfo';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  useTheme(); // Keep the context hook if needed, but without destructuring theme

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Disable body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Clean up
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Home">
          {personalInfo?.name || 'Portfolio'}
        </Link>
        
        <div className={styles.rightSection}>
          <nav className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {isHomePage ? (
                <>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#testimonials">Testimonials</a></li>
                  <li><a href="#contact">Contact</a></li>
                </>
              ) : (
                <>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/#about">About</Link></li>
                  <li><Link href="/#projects">Projects</Link></li>
                  <li><Link href="/#skills">Skills</Link></li>
                  <li><Link href="/#testimonials">Testimonials</Link></li>
                  <li><Link href="/#contact">Contact</Link></li>
                </>
              )}
              <li><Link href="/blog" className={router.pathname === '/blog' ? styles.active : ''}>Blog</Link></li>
            </ul>
          </nav>
          
          <ThemeToggle />
          
          <button 
            className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.active : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className={styles.mobileMenuHeader}>
                <Link href="/" className={styles.mobileLogo} onClick={handleMenuItemClick}>
                  {personalInfo?.name || 'Portfolio'}
                </Link>
                <p className={styles.mobileSubtitle}>{personalInfo?.title || 'Web Developer'}</p>
                <button 
                  className={styles.closeBtn} 
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span>×</span>
                </button>
              </div>
              
              <nav className={styles.mobileNav}>
                <ul>
                  {isHomePage ? (
                    <>
                      <li><a href="#home" onClick={handleMenuItemClick}>Home</a></li>
                      <li><a href="#about" onClick={handleMenuItemClick}>About</a></li>
                      <li><a href="#projects" onClick={handleMenuItemClick}>Projects</a></li>
                      <li><a href="#skills" onClick={handleMenuItemClick}>Skills</a></li>
                      <li><a href="#testimonials" onClick={handleMenuItemClick}>Testimonials</a></li>
                      <li><a href="#contact" onClick={handleMenuItemClick}>Contact</a></li>
                    </>
                  ) : (
                    <>
                      <li><Link href="/" onClick={handleMenuItemClick}>Home</Link></li>
                      <li><Link href="/#about" onClick={handleMenuItemClick}>About</Link></li>
                      <li><Link href="/#projects" onClick={handleMenuItemClick}>Projects</Link></li>
                      <li><Link href="/#skills" onClick={handleMenuItemClick}>Skills</Link></li>
                      <li><Link href="/#testimonials" onClick={handleMenuItemClick}>Testimonials</Link></li>
                      <li><Link href="/#contact" onClick={handleMenuItemClick}>Contact</Link></li>
                    </>
                  )}
                  <li><Link href="/blog" onClick={handleMenuItemClick} className={router.pathname === '/blog' ? styles.active : ''}>Blog</Link></li>
                </ul>
              </nav>
              
              <div className={styles.mobileMenuFooter}>
                <div className={styles.mobileMenuSocial}>
                  {personalInfo?.socials?.github && (
                    <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {personalInfo?.socials?.linkedin && (
                    <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                  {personalInfo?.socials?.twitter && (
                    <a href={personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {personalInfo?.socials?.credly && (
                    <a href={personalInfo.socials.credly} target="_blank" rel="noopener noreferrer" aria-label="Credly">
                      <i className="fas fa-certificate"></i>
                    </a>
                  )}
                  {personalInfo?.socials?.wakatime && (
                    <a href={personalInfo.socials.wakatime} target="_blank" rel="noopener noreferrer" aria-label="WakaTime">
                      <i className="fas fa-clock"></i>
                    </a>
                  )}
                </div>
                <div className={styles.mobileContactInfo}>
                  {personalInfo?.email && (
                    <p className={styles.mobileContactItem}>
                      <i className="fas fa-envelope"></i>
                      <span>{personalInfo.email}</span>
                    </p>
                  )}
                  {personalInfo?.location && (
                    <p className={styles.mobileContactItem}>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{personalInfo.location}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;