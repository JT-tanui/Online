import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Timeline from './Timeline';
import styles from '../styles/About.module.css';
import { personalInfo } from '../data/personalInfo';

const About = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          <Timeline />
        </div>
      </div>
      
      {/* Add timeline section */}
      {isClient && <Timeline />}
    </div>
  );
};

export default About;