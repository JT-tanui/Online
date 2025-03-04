import React, { useEffect, useState } from 'react';
import styles from '../styles/Skills.module.css';
import { skills } from '../data/skills';

const Skills = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const importAnimatedSection = async () => {
      try {
        await import('react-intersection-observer');
        await import('framer-motion');
      } catch (e) {
        console.error("Could not load animation libraries:", e);
      }
    };
    
    importAnimatedSection();
  }, []);

  return (
    <div className={styles.skills}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      
      <div className={styles.container}>
        <div className={styles.skillCategory}>
          <h3>Technical Skills</h3>
          <div className={styles.skillBars}>
            {skills?.technical?.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercentage}>{skill.level}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progress} 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            )) || []}
          </div>
        </div>
        
        <div className={styles.skillCategory}>
          <h3>Tools & Technologies</h3>
          <div className={styles.skillBars}>
            {skills?.tools?.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercentage}>{skill.level}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progress} 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            )) || []}
          </div>
        </div>
        
        <div className={styles.skillCategory}>
          <h3>Soft Skills</h3>
          <div className={styles.softSkills}>
            {skills?.soft?.map((skill, index) => (
              <div key={index} className={styles.softSkillItem}>
                {skill}
              </div>
            )) || []}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;