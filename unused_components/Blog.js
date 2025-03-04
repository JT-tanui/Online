import React, { useState } from 'react';
import styles from '../styles/Blog.module.css';

const Blog = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real implementation, you'd send this to a newsletter service
    console.log('Subscribed with email:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  const upcomingTopics = [
    'Building Accessible Web Applications',
    'Advanced React Patterns',
    'Performance Optimization Techniques',
    'Getting Started with TypeScript',
    'Mastering CSS Grid and Flexbox'
  ];

  return (
    <div className={styles.blogMain}>
      <h1 className={styles.blogTitle}>Blog</h1>
      <p className={styles.comingSoon}>
        My blog is coming soon! I'll be sharing insights, tutorials, and thoughts on modern web development.
        Subscribe below to get notified when new articles are published.
      </p>

      <div className={styles.subscribeContainer}>
        {!isSubscribed ? (
          <>
            <h2 className={styles.subscribeTitle}>Subscribe to My Newsletter</h2>
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.subscribeInput}
                aria-label="Email address for newsletter"
              />
              <button type="submit" className={styles.subscribeButton}>Subscribe</button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <p>Thank you for subscribing! You'll receive updates when new articles are published.</p>
          </div>
        )}
      </div>

      <div className={styles.upcomingTopics}>
        <h2>Upcoming Topics</h2>
        <ul>
          {upcomingTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;