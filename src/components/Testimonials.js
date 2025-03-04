import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Testimonials.module.css';
import { testimonials } from '../data/testimonials';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Auto-scroll testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <div className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What People Say</h2>
        <div className={styles.placeholder}>Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className={styles.testimonials}>
      <h2 className={styles.sectionTitle}>What People Say</h2>
      
      <div className={styles.testimonialsContainer}>
        <div 
          className={styles.testimonialsTrack}
          style={{ transform: `translateX(${-activeTestimonial * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className={styles.testimonialCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.testimonialContent}>
                <div className={styles.quote}>"</div>
                <p className={styles.testimonialText}>{testimonial.text}</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorImage}>
                  {testimonial.image ? (
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      width={60} 
                      height={60}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.authorInfo}>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.controls}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeTestimonial ? styles.active : ''}`}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;