import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/BlogSection.module.css';
import { blogPosts } from '../data/blogPosts';

const BlogSection = () => {
  // Display only the most recent 3 posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className={styles.blogSection}>
      <h2 className={styles.sectionTitle}>Recent Articles</h2>
      <p className={styles.sectionDescription}>
        Thoughts, insights, and tutorials on web development and design.
      </p>

      <div className={styles.postsGrid}>
        {recentPosts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.postImageContainer}>
              <div className={styles.imagePlaceholder}>
                <span>{post.title}</span>
              </div>
              {/* Uncomment when you have actual images */}
              {/* <Image
                src={post.coverImage}
                alt={post.title}
                width={400}
                height={225}
                className={styles.postImage}
              /> */}
            </div>
            
            <div className={styles.postMeta}>
              <span className={styles.postDate}>{post.date}</span>
              <span className={styles.postReadTime}>{post.readTime}</span>
            </div>
            
            <h3 className={styles.postTitle}>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h3>
            
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            
            <div className={styles.categories}>
              {post.categories.map((category, index) => (
                <span key={index} className={styles.category}>
                  {category}
                </span>
              ))}
            </div>
            
            <Link href={`/blog/${post.slug}`} className={styles.readMoreLink}>
              Read More
            </Link>
          </div>
        ))}
      </div>
      
      <div className={styles.viewAllContainer}>
        <Link href="/blog" className={styles.viewAllButton}>
          View All Articles
        </Link>
      </div>
    </div>
  );
};

export default BlogSection;