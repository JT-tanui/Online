import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import styles from '../styles/Blog.module.css';

const BlogPage = () => {
  // Topic icons
  const topics = [
    { name: "Modern Frontend Development", icon: "💻", count: 4 },
    { name: "React Best Practices", icon: "⚛️", count: 3 },
    { name: "Performance Optimization", icon: "⚡", count: 2 },
    { name: "Responsive Design", icon: "📱", count: 5 },
    { name: "Web Accessibility", icon: "♿", count: 3 },
    { name: "UI/UX Design", icon: "🎨", count: 4 }
  ];

  // Featured posts
  const featuredPosts = [
    {
      id: 1,
      title: 'Modern Frontend Development Trends in 2025',
      excerpt: 'Exploring the latest frameworks and tools that are shaping the future of web development.',
      image: '/images/blog-1.jpg',
      date: 'March 1, 2025',
      category: 'Development',
      slug: 'modern-frontend-development-trends'
    },
    {
      id: 2,
      title: 'Optimizing React Applications for Performance',
      excerpt: 'Learn how to identify and fix performance bottlenecks in your React applications.',
      image: '/images/blog-2.jpg',
      date: 'February 15, 2025',
      category: 'React',
      slug: 'optimizing-react-applications'
    },
    {
      id: 3,
      title: 'Building Accessible Web Applications',
      excerpt: 'Techniques and best practices for creating inclusive web experiences for all users.',
      image: '/images/blog-3.jpg',
      date: 'February 1, 2025',
      category: 'Accessibility',
      slug: 'building-accessible-web-applications'
    }
  ];

  return (
    <>
      <SEO 
        title="Blog | Developer Portfolio" 
        description="Read my latest articles and thoughts on web development, programming tips, and technology trends."
      />
      
      <Header />
      
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.description}>
            Insights, tutorials, and thoughts on web development and technology.
          </p>
        </section>
        
        <div className={styles.featuredPost}>
          <div className={styles.featuredImage}>
            <Image 
              src={featuredPosts[0].image} 
              alt={featuredPosts[0].title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className={styles.featuredOverlay}>
              <span className={styles.featuredTag}>{featuredPosts[0].category}</span>
              <h2>{featuredPosts[0].title}</h2>
              <p>{featuredPosts[0].excerpt}</p>
              <Link href={`/blog/${featuredPosts[0].slug}`} className={styles.readMoreBtn}>
                Read Article
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.blogGallery}>
          <h2 className={styles.sectionTitle}>Recent Articles</h2>
          
          <div className={styles.blogGrid}>
            {featuredPosts.slice(0, 3).map(post => (
              <div key={post.id} className={styles.blogCard}>
                <div className={styles.blogImageContainer}>
                  <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <span className={styles.category}>{post.category}</span>
                </div>
                <div className={styles.blogContent}>
                  <span className={styles.date}>{post.date}</span>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.pagination}>
            <span className={`${styles.pageNumber} ${styles.active}`}>1</span>
            <span className={styles.pageNumber}>2</span>
            <span className={styles.pageNumber}>3</span>
            <span className={styles.pageNumber}>→</span>
          </div>
        </div>
        
        <section className={styles.topicsSection}>
          <h2 className={styles.sectionTitle}>Explore Topics</h2>
          <div className={styles.topicsGrid}>
            {topics.map((topic, index) => (
              <div key={index} className={styles.topicCard}>
                <span className={styles.topicIcon}>{topic.icon}</span>
                <h3 className={styles.topicTitle}>{topic.name}</h3>
                <span className={styles.postCount}>{topic.count} posts</span>
              </div>
            ))}
          </div>
        </section>
        
        <section className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h2>Subscribe to my newsletter</h2>
            <p>Get the latest articles and news delivered to your inbox</p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPage;