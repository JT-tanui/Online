import React from 'react';
import styles from '../styles/Timeline.module.css';
import { personalInfo } from '../data/personalInfo';

const Timeline = () => {
  // Extract timeline events from personalInfo
  const timelineEvents = [
    ...(personalInfo?.education ? [
      {
        id: 'edu1',
        year: personalInfo.education.period,
        title: personalInfo.education.degree,
        institution: personalInfo.education.institution,
        type: 'education'
      }
    ] : []),
    ...(personalInfo?.experience ? [
      {
        id: 'exp1',
        year: personalInfo.experience.period,
        title: personalInfo.experience.position,
        institution: personalInfo.experience.company,
        type: 'experience'
      }
    ] : [])
  ];

  // Add additional education/experience items if they exist in personalInfo
  if (personalInfo?.additionalEducation) {
    personalInfo.additionalEducation.forEach((edu, index) => {
      timelineEvents.push({
        id: `edu${index + 2}`,
        year: edu.period,
        title: edu.degree,
        institution: edu.institution,
        type: 'education'
      });
    });
  }

  if (personalInfo?.additionalExperience) {
    personalInfo.additionalExperience.forEach((exp, index) => {
      timelineEvents.push({
        id: `exp${index + 2}`,
        year: exp.period,
        title: exp.position,
        institution: exp.company,
        type: 'experience'
      });
    });
  }

  // Sort by year (assuming years are in format "2020-2022")
  const sortedEvents = timelineEvents.sort((a, b) => {
    const yearA = a.year.split('-')[1] || a.year.split('-')[0];
    const yearB = b.year.split('-')[1] || b.year.split('-')[0];
    return parseInt(yearB) - parseInt(yearA);
  });

  return (
    <div className={styles.timeline}>
      <h3 className={styles.timelineTitle}>My Journey</h3>
      <div className={styles.timelineContent}>
        {sortedEvents.map((event) => (
          <div key={event.id} className={styles.timelineItem}>
            <div className={styles.timelineBadge}>{event.type === 'education' ? '🎓' : '💼'}</div>
            <div className={styles.timelinePanel}>
              <div className={styles.timelineBody}>
                <h4 className={styles.timelineHeading}>{event.title}</h4>
                <p className={styles.timelineSubheading}>{event.institution}</p>
                <p className={styles.timelineYear}>{event.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;