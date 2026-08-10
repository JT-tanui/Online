import React from 'react';
import styles from '../styles/Skills.module.css';
import { skills } from '../data/skills';
import AnimatedSection from './AnimatedSection';

const Skills = () => {
  const groups = skills?.groups || [];
  const practices = skills?.practices || [];

  return (
    <AnimatedSection className={styles.skills} id="skills">
      <h2 className={styles.sectionTitle}>Skills</h2>

      <p className={styles.skillsNote}>
        Ordered by how much of my shipped work actually uses each one. Hover or tap
        an item to see where.
      </p>

      <div className={styles.skillGroups}>
        {groups.map((group) => (
          <div key={group.title} className={styles.skillGroup}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <ul className={styles.skillList}>
              {group.items.map((item) => (
                <li key={item.name} className={styles.skillEntry} title={item.evidence}>
                  <span className={styles.skillLabel}>{item.name}</span>
                  <span className={styles.skillEvidence}>{item.evidence}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {practices.length > 0 && (
        <div className={styles.practicesBlock}>
          <h3 className={styles.groupTitle}>How I work</h3>
          <div className={styles.practices}>
            {practices.map((practice) => (
              <span key={practice} className={styles.practiceItem}>
                {practice}
              </span>
            ))}
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default Skills;
