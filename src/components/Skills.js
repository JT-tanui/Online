import React from 'react';
import styles from '../styles/Skills.module.css';
import { skills } from '../data/skills';
import AnimatedSection from './AnimatedSection';

const Skills = () => {
  return (
    <div className={styles.skills}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      
      <div className={styles.container}>
        <AnimatedSection className={styles.skillCategory} delay={0.1}>
          <h3>Technical Skills</h3>
          <div className={styles.skillBars}>
            {skills.technical.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercentage}>{skill.level}%</span>
                </div>
                <div className={styles.progressBar} role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100">
                  <div 
                    className={styles.progress} 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
        
        <AnimatedSection className={styles.skillCategory} delay={0.3}>
          <h3>Tools & Technologies</h3>
          <div className={styles.skillBars}>
            {skills.tools.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercentage}>{skill.level}%</span>
                </div>
                <div className={styles.progressBar} role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100">
                  <div 
                    className={styles.progress} 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
        
        <AnimatedSection className={styles.skillCategory} delay={0.5}>
          <h3>Soft Skills</h3>
          <div className={styles.softSkills}>
            {skills.soft.map((skill, index) => (
              <div key={index} className={styles.softSkillItem}>
                {skill}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Skills;