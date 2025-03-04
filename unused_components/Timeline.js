import React from 'react';
import styles from '../styles/Timeline.module.css';
import { personalInfo } from '../data/personalInfo';

const Timeline = () => {
  const { timeline } = personalInfo;
  
  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <div className={styles.timelineSection}>
      <h2 className={styles.sectionTitle}>My Journey</h2>
      <div className={styles.timelineContainer}>
        {timeline.map((item) => (
          <div key={item.id} className={styles.timelineItem}>
            <div className={styles.timelineYear}>{item.year}</div>
            <div className={styles.timelineContent}>
              <h3>{item.title}</h3>
              <h4>{item.company}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;