import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { personalInfo } from '../data/personalInfo';

const SocialLink = ({ href, icon, label, isVisible = true }) => {
  if (!isVisible || !href) return null;
  
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <i className={icon}></i>
      <span className={styles.linkLabel}>{label}</span>
    </a>
  );
};

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
          <div className={styles.social}>
            <h3>Connect</h3>
            <div className={styles.socialLinks}>
              <SocialLink 
                href={personalInfo?.socials?.github} 
                icon="fab fa-github" 
                label="GitHub" 
              />
              <SocialLink 
                href={personalInfo?.socials?.linkedin} 
                icon="fab fa-linkedin-in" 
                label="LinkedIn" 
              />
              <SocialLink 
                href={personalInfo?.socials?.twitter} 
                icon="fab fa-twitter" 
                label="Twitter" 
              />
              <SocialLink 
                href={personalInfo?.socials?.credly} 
                icon="fas fa-certificate" 
                label="Credly" 
                isVisible={!!personalInfo?.socials?.credly}
              />
              <SocialLink 
                href={personalInfo?.socials?.wakatime} 
                icon="fas fa-code" 
                label="WakaTime" 
                isVisible={!!personalInfo?.socials?.wakatime}
              />
            </div>
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

        <div className={styles.contact}>
          <h3>Contact Info</h3>
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} className={styles.contactItem}>
              <i className="fas fa-envelope"></i>
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo?.phone && (
            <a href={`tel:${personalInfo.phone}`} className={styles.contactItem}>
              <i className="fas fa-phone"></i>
              <span>{personalInfo.phone}</span>
            </a>
          )}
          {personalInfo?.location && (
            <p className={styles.contactItem}>
              <i className="fas fa-map-marker-alt"></i>
              <span>{personalInfo.location}</span>
            </p>
          )}
        </div>
        
        <p className={styles.copyText}>
          &copy; {currentYear} {personalInfo?.name || 'Portfolio'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;