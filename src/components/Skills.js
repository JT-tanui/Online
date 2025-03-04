import React, { useState, useEffect } from 'react';
import styles from '../styles/Skills.module.css';
import { skills } from '../data/skills';

const Skills = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.skills}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      
      <div className={styles.container}>
        {/* Skills Graph */}
        <div className={styles.skillsVisual}>
          <div className={styles.skillsChart}>
            {mounted && skills?.technical?.slice(0, 6).map((skill, index) => (
              <div key={index} className={styles.skillBar}>
                <div className={styles.skillBarFill} style={{ 
                  height: `${skill.level}%`,
                  backgroundColor: getColor(index)
                }}>
                  <span className={styles.skillValue}>{skill.level}%</span>
                </div>
                <p className={styles.skillLabel}>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>

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
            <div className={styles.skillsGallery}>
              {skills?.tools?.map((skill, index) => (
                <div key={index} className={styles.skillCard}>
                  <div className={styles.skillCardIcon}>
                    <i className={`fas ${getIconForSkill(skill.name)}`}></i>
                  </div>
                  <h4>{skill.name}</h4>
                  <div className={styles.skillRating}>
                    {Array(5).fill(0).map((_, i) => (
                      <span 
                        key={i} 
                        className={i < Math.round(skill.level / 20) ? styles.filled : ''}
                      >★</span>
                    ))}
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

// Helper function to get colors for the chart
function getColor(index) {
  const colors = [
    '#0066CC', // Primary color
    '#4D94DB',
    '#74AEE6',
    '#9BC8F0',
    '#C2E0FA',
    '#E5F3FF'
  ];
  return colors[index % colors.length];
}

// Helper function to assign icons
function getIconForSkill(skill) {
  const icons = {
    'Git & GitHub': 'fa-code-branch',
    'Webpack': 'fa-cube',
    'Docker': 'fa-docker',
    'AWS': 'fa-cloud',
    'Figma': 'fa-pencil-ruler',
    'Jest': 'fa-vial',
    // Add more mappings as needed
  };
  
  return icons[skill] || 'fa-wrench'; // Default icon
}

export default Skills;