import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/About.module.css';
import { personalInfo } from '../data/personalInfo';

// Optional import - only used on client
let AnimatedSection = ({ children, ...props }) => <div {...props}>{children}</div>;

// Only import AnimatedSection on the client side
if (typeof window !== 'undefined') {
  import('./AnimatedSection').then((mod) => {
    AnimatedSection = mod.default;
  });
}

const About = () => {
  // State to track if we're on the client
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Make sure personalInfo exists before accessing its properties
  const education = personalInfo?.education || {};
  const experience = personalInfo?.experience || {};
  
  // Basic content without animations
  const content = (
    <div className={styles.about}>
      <h2 className={styles.sectionTitle}>About Me</h2>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.imagePlaceholder}>
            <p>Profile Image</p>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.intro}>
            {personalInfo?.introduction || ""}
          </p>
          <p className={styles.description}>
            {personalInfo?.longIntro || ""}
          </p>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <h3>Education</h3>
              <p>{education.degree || ""}</p>
              <p>{education.institution || ""}</p>
              <p>{education.period || ""}</p>
            </div>
            <div className={styles.detailItem}>
              <h3>Experience</h3>
              <p>{experience.position || ""}</p>
              <p>{experience.company || ""}</p>
              <p>{experience.period || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // On the server, just return the content
  if (!isClient) {
    return content;
  }

  // On the client, wrap in AnimatedSection
  return (
    <AnimatedSection className={styles.about}>
      {content}
    </AnimatedSection>
  );
};

export default About;