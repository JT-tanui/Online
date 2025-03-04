import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Skills.module.css';
import { skills } from '../data/skills';

// Import SkillRadarChart with no SSR
const SkillRadarChart = dynamic(() => import('./SkillRadarChart'), {
  ssr: false,
  loading: () => <div className={styles.loadingChart}>Loading chart...</div>
});

const Skills = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Selected skills for radar chart
  const radarChartSkills = [
    { name: 'JavaScript', level: skills?.technical?.find(s => s.name === 'JavaScript')?.level || 0 },
    { name: 'React', level: skills?.technical?.find(s => s.name === 'React')?.level || 0 },
    { name: 'Next.js', level: skills?.technical?.find(s => s.name === 'Next.js')?.level || 0 },
    { name: 'Node.js', level: skills?.technical?.find(s => s.name === 'Node.js')?.level || 0 },
    { name: 'HTML/CSS', level: skills?.technical?.find(s => s.name === 'HTML5 & CSS3')?.level || 0 },
    { name: 'TypeScript', level: skills?.technical?.find(s => s.name === 'TypeScript')?.level || 0 }
  ];

  return (
    <div className={styles.skills}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      
      <div className={styles.container}>
        {isClient && radarChartSkills.length > 0 && (
          <div className={styles.radarChartWrapper}>
            <SkillRadarChart skills={radarChartSkills} />
          </div>
        )}
        
        <div className={styles.skillsGrid}>
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
    </div>
  );
};

export default Skills;