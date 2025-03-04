import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { personalInfo } from '../data/personalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Link href="/">
              {personalInfo.name}
            </Link>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="#home">Home</Link></li>
                <li><Link href="#about">About</Link></li>
                <li><Link href="#projects">Projects</Link></li>
                <li><Link href="#skills">Skills</Link></li>
                <li><Link href="#contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerLinkGroup}>
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p>Made with ❤️ using Next.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;