import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { personalInfo } from '../data/personalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumn}>
          <Link href="/" className={styles.logo}>
            {personalInfo?.name || 'Portfolio'}
          </Link>
          <p className={styles.shortBio}>
            {personalInfo?.shortBio || 'A passionate web developer creating modern and responsive web applications.'}
          </p>
          <div className={styles.socialLinks}>
            {personalInfo?.socials?.github && (
              <a href={personalInfo.socials.github} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            )}
            {personalInfo?.socials?.linkedin && (
              <a href={personalInfo.socials.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            {personalInfo?.socials?.twitter && (
              <a href={personalInfo.socials.twitter} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {personalInfo?.socials?.instagram && (
              <a href={personalInfo.socials.instagram} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </div>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>Quick Links</h3>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href="/#home" className={styles.navLink}>Home</Link></li>
            <li className={styles.navItem}><Link href="/#about" className={styles.navLink}>About</Link></li>
            <li className={styles.navItem}><Link href="/#projects" className={styles.navLink}>Projects</Link></li>
            <li className={styles.navItem}><Link href="/#skills" className={styles.navLink}>Skills</Link></li>
            <li className={styles.navItem}><Link href="/#testimonials" className={styles.navLink}>Testimonials</Link></li>
            <li className={styles.navItem}><Link href="/#contact" className={styles.navLink}>Contact</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>Contact</h3>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <strong>Email:</strong> {personalInfo?.email || 'email@example.com'}
            </li>
            <li className={styles.navItem}>
              <strong>Location:</strong> {personalInfo?.location || 'City, Country'}
            </li>
            <li className={styles.navItem}>
              <strong>Available for:</strong> Freelance, Full-time positions
            </li>
          </ul>
        </div>
        
        <p className={styles.copyText}>
          &copy; {currentYear} {personalInfo?.name || 'Portfolio'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;