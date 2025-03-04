import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/Hero.module.css';
import { personalInfo } from '../data/personalInfo';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>
            Hi, I'm <span className={styles.name}>{personalInfo.name}</span>
          </h1>
          <motion.h2 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {personalInfo.title}
          </motion.h2>
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {personalInfo.introduction}
          </motion.p>
          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link href="#projects" className={styles.primaryButton}>
              View My Work
            </Link>
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
              Download Resume
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.imagePlaceholder}>
            <p>Your Image</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;