import React from 'react';
import Image from 'next/image';
import Timeline from './Timeline';
import styles from '../styles/About.module.css';
import { personalInfo } from '../data/personalInfo';

const About = () => {
  // Make sure personalInfo exists before accessing its properties
  const education = personalInfo?.education || {};
  const experience = personalInfo?.experience || {};
  
  return (
    <div className={styles.about}>
      <h2 className={styles.sectionTitle}>About Me</h2>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {personalInfo?.avatarUrl ? (
            <Image
              src={personalInfo.avatarUrl}
              alt={`${personalInfo.name}, software engineer`}
              width={500}
              height={500}
              className={styles.aboutImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <p>{personalInfo?.name}</p>
            </div>
          )}
        </div>
        <div className={styles.content}>
          {/* aboutLead, not `introduction` — the hero already used that one and
              printing it twice was the loudest repetition on the page. */}
          <p className={styles.intro}>
            {personalInfo?.aboutLead || ""}
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
      
      {/* Rendered server-side: the education equivalency and work history are
          the parts a crawler most needs to see. */}
      <Timeline />
    </div>
  );
};

export default About;