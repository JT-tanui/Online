import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';
import { personalInfo } from '../data/personalInfo';
import AnimatedSection from './AnimatedSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit the form to your backend or a form service
      console.log('Form submitted:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection className={styles.contact}>
      <h2 className={styles.sectionTitle}>Get In Touch</h2>
      
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h3>Contact Information</h3>
          <p className={styles.contactDescription}>
            Feel free to reach out to me for any inquiries, opportunities, or just to say hello!
          </p>
          
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📧</div>
              <div className={styles.contactText}>
                <h4>Email</h4>
                <a href={`mailto:${personalInfo.socials.email}`}>{personalInfo.socials.email}</a>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>💼</div>
              <div className={styles.contactText}>
                <h4>Connect</h4>
                <div className={styles.socialLinks}>
                  <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href={personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? styles.inputError : ''}
              ></textarea>
              {errors.message && <p className={styles.errorText}>{errors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitMessage && (
              <div className={`${styles.formMessage} ${styles[submitStatus]}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;