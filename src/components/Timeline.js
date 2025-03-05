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

  // Custom ordering instead of relying solely on date sorting
  const orderedEvents = [...timelineEvents];
  // Sort first by category (education first, then experience)
  orderedEvents.sort((a, b) => {
    // If both are the same type, use year sorting
    if (a.type === b.type) {
      const yearA = a.year.split('-')[1] || a.year.split('-')[0];
      const yearB = b.year.split('-')[1] || b.year.split('-')[0];
      return parseInt(yearB) - parseInt(yearA);
    }
    // Otherwise, education comes before experience
    return a.type === 'education' ? -1 : 1;
  });

  // Custom order for specific items
  const finalEvents = orderedEvents.sort((a, b) => {
    // Diploma in Computer Programming always first
    if (a.title.includes("Diploma in Computer Programming")) return -1;
    if (b.title.includes("Diploma in Computer Programming")) return 1;
    
    // Google Developer Student Club comes next
    if (a.title.includes("Google Developer Student Club")) return -1;
    if (b.title.includes("Google Developer Student Club")) return 1;
    
    // ICT Internship comes next
    if (a.title.includes("ICT & Telecommunication Division Intern")) return -1;
    if (b.title.includes("ICT & Telecommunication Division Intern")) return 1;
    
    // Default to original sorting
    return 0;
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