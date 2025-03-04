import React from 'react';
import Image from 'next/image';
import styles from '../styles/About.module.css';
import { personalInfo } from '../data/personalInfo';
import AnimatedSection from './AnimatedSection';

const About = () => {
  // Make sure personalInfo exists before accessing its properties
  const education = personalInfo?.education || {};
  const experience = personalInfo?.experience || {};
  
  return (
    <div className={styles.about}>
      <h2 className={styles.sectionTitle}>About Me</h2>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.imagePlaceholder}>
            <p>Profile Image</p>
          </div>
          {/* Uncomment when image is available */}
          {/* <Image
            src="/images/about-image.jpg"
            alt="About Me"
            width={400}
            height={400}
            className={styles.aboutImage}
          /> */}
        </div>
        <AnimatedSection className={styles.content}>
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
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;