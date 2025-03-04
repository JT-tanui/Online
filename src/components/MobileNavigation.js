import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/MobileNavigation.module.css';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`.${styles.mobileNav}`)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div className={styles.mobileNav}>
      <button 
        className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              <li>
                <Link href="#home" onClick={() => setIsOpen(false)}>Home</Link>
              </li>
              <li>
                <Link href="#about" onClick={() => setIsOpen(false)}>About</Link>
              </li>
              <li>
                <Link href="#projects" onClick={() => setIsOpen(false)}>Projects</Link>
              </li>
              <li>
                <Link href="#skills" onClick={() => setIsOpen(false)}>Skills</Link>
              </li>
              <li>
                <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavigation;