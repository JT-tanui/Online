index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/Blog.module.css';

export default function Blog() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a newsletter service
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
  }
  
  return (
    <>
      <Head>
        <title>Blog | Your Name</title>
        <meta name="description" content="Blog posts about web development, programming tips, and tech insights." />
      </Head>
      
      <Header />
      
      <main className={styles.blogMain}>
        <div className={styles.container}>
          <h1 className={styles.blogTitle}>Blog</h1>
          
          <p className={styles.comingSoon}>
            Exciting content is on the way! I'm currently working on blog posts about web development, 
            programming tips, and my journey in tech. Subscribe below to be notified when new articles are published.
          </p>
          
          <div className={styles.subscribeContainer}>
            <h2 className={styles.subscribeTitle}>Stay Updated</h2>
            
            {subscribed ? (
              <div className={styles.successMessage}>
                <p>Thank you for subscribing! You'll be notified when new articles are published.</p>
              </div>
            ) : (
              <form className={styles.subscribeForm} onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.subscribeInput}
                />
                <button type="submit" className={styles.subscribeButton}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
          
          <div className={styles.upcomingTopics}>
            <h2>Upcoming Topics</h2>
            <ul className={styles.topicsList}>
              <li>Building Responsive Websites with Modern CSS</li>
              <li>React Hooks Deep Dive</li>
              <li>Optimizing Web Performance</li>
              <li>Getting Started with Next.js</li>
              <li>Creating Accessible Web Applications</li>
            </ul>
          </div>
          
          <div className={styles.backToHome}>
            <Link href="/">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}