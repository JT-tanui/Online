import React from 'react';
import styles from '../styles/Timeline.module.css';
import { personalInfo } from '../data/personalInfo';
import { motion } from 'framer-motion';

const Timeline = () => {
  const timeline = personalInfo?.timeline || [];
  
  return (
    <div className={styles.timelineContainer}>
      <h3 className={styles.timelineTitle}>My Journey</h3>
      <div className={styles.timeline}>
        {timeline.map((item, index) => (
          <motion.div
            key={item.id}
            className={styles.timelineItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className={styles.timelineMarker}>
              <div className={styles.timelinePoint}></div>
            </div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineYear}>{item.year}</div>
              <h4 className={styles.timelineItemTitle}>{item.title}</h4>
              <div className={styles.timelineCompany}>{item.company}</div>
              <p className={styles.timelineDescription}>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;