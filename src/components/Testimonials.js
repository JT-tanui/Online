import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Testimonials.module.css';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Auto-rotate testimonials
    if (testimonials && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000); // Change testimonial every 8 seconds
      
      return () => clearInterval(interval);
    }
  }, []);

  const handlePrevious = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };
  
  const handleNext = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={styles.testimonials}>
      <h2 className={styles.sectionTitle}>Client Testimonials</h2>
      
      <div className={styles.testimonialsContainer}>
        <button 
          className={styles.navButton} 
          onClick={handlePrevious}
          aria-label="Previous testimonial"
        >
          &lt;
        </button>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className={styles.testimonialCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {isClient && testimonials[currentIndex] && (
              <>
                <div className={styles.quoteIcon}>&ldquo;</div>
                <p className={styles.testimonialText}>{testimonials[currentIndex].text}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorImage}>
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div className={styles.authorInfo}>
                    <h3>{testimonials[currentIndex].name}</h3>
                    <p>{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        
        <button 
          className={styles.navButton} 
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          &gt;
        </button>
      </div>
      
      <div className={styles.dots}>
        {testimonials.map((_, index) => (
          <button 
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;