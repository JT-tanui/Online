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
        description: personalInfo.education.description,
        type: 'education'
      }
    ] : []),
    ...(personalInfo?.experience ? [
      {
        id: 'exp1',
        year: personalInfo.experience.period,
        title: personalInfo.experience.position,
        institution: personalInfo.experience.company,
        description: personalInfo.experience.description,
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
        description: edu.description,
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
        description: exp.description,
        type: 'experience'
      });
    });
  }

  // Reverse-chronological by the end of each period. An ongoing role
  // ("Present") sorts to the top. Ties keep experience above education so a
  // job and a certificate from the same year read in the useful order.
  const endYear = (period = '') => {
    if (/present|current/i.test(period)) return 9999;
    const years = period.match(/\d{4}/g);
    return years ? parseInt(years[years.length - 1], 10) : 0;
  };

  const finalEvents = [...timelineEvents].sort((a, b) => {
    const diff = endYear(b.year) - endYear(a.year);
    if (diff !== 0) return diff;
    if (a.type === b.type) return 0;
    return a.type === 'experience' ? -1 : 1;
  });

  return (
    <div className={styles.timeline}>
      <h3 className={styles.timelineTitle}>My Journey</h3>
      <div className={styles.timelineContent}>
        {finalEvents.map((event) => (
          <div key={event.id} className={styles.timelineItem}>
            <div className={styles.timelineBadge}>{event.type === 'education' ? '🎓' : '💼'}</div>
            <div className={styles.timelinePanel}>
              <div className={styles.timelineBody}>
                <h4 className={styles.timelineHeading}>{event.title}</h4>
                <p className={styles.timelineSubheading}>{event.institution}</p>
                <p className={styles.timelineYear}>{event.year}</p>
                {event.description && (
                  <p className={styles.timelineDescription}>{event.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;