import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Testimonials.module.css';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change testimonial every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (!isClient) {
    return null; // Don't render server-side
  }

  return (
    <div className={styles.testimonials}>
      <h2 className={styles.sectionTitle}>What People Say</h2>
      
      <div className={styles.container}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={handlePrevious}
          aria-label="Previous testimonial"
        >
          &#8592;
        </button>
        
        <div className={styles.testimonialContainer}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className={styles.testimonialCard}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.testimonialText}>{testimonials[currentIndex].text}</p>
              </div>
              
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorImage}>
                  {/* Replace with actual image if available */}
                  <div className={styles.imagePlaceholder}>
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                </div>
                <div className={styles.authorInfo}>
                  <h4>{testimonials[currentIndex].name}</h4>
                  <p>{testimonials[currentIndex].position}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          &#8594;
        </button>
      </div>
      
      <div className={styles.dots}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;