import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import styles from '../../styles/BlogPost.module.css';

// Sample blog post data - This would normally come from a CMS or API
const blogPosts = {
  'modern-frontend-development-trends': {
    id: 1,
    title: 'Modern Frontend Development Trends in 2025',
    excerpt: 'Exploring the latest frameworks and tools that are shaping the future of web development.',
    image: '/images/blog-1.jpg',
    date: 'March 1, 2025',
    category: 'Development',
    readTime: 8,
    author: 'Your Name',
    content: [
      {
        type: 'paragraph',
        text: 'The frontend development landscape continues to evolve at a rapid pace. As we move further into 2025, new frameworks, tools, and methodologies are emerging to address the growing complexity of modern web applications.'
      },
      {
        type: 'paragraph',
        text: 'In this article, we\'ll explore the most significant trends shaping frontend development this year and how they\'re changing the way we build web applications.'
      },
      {
        type: 'heading',
        text: 'The Rise of WebAssembly'
      },
      {
        type: 'paragraph',
        text: 'WebAssembly (Wasm) has gained significant traction as developers look for ways to run high-performance code in browsers. Originally designed as a compilation target for languages like C++ and Rust, WebAssembly is now being used with a wide range of languages.'
      },
      {
        type: 'paragraph',
        text: 'This cross-platform, low-level bytecode format enables near-native performance for web applications, opening new possibilities for running complex applications in the browser.'
      }
    ]
  },
  'optimizing-react-applications': {
    id: 2,
    title: 'Optimizing React Applications for Performance',
    excerpt: 'Learn how to identify and fix performance bottlenecks in your React applications.',
    image: '/images/blog-2.jpg',
    date: 'February 15, 2025',
    category: 'React',
    readTime: 10,
    author: 'Your Name',
    content: [
      {
        type: 'paragraph',
        text: 'Performance optimization is crucial for providing a smooth user experience in React applications.'
      }
    ]
  },
  'building-accessible-web-applications': {
    id: 3,
    title: 'Building Accessible Web Applications',
    excerpt: 'Techniques and best practices for creating inclusive web experiences for all users.',
    image: '/images/blog-3.jpg',
    date: 'February 1, 2025',
    category: 'Accessibility',
    readTime: 7,
    author: 'Your Name',
    content: [
      {
        type: 'paragraph',
        text: 'Web accessibility ensures that people with disabilities can use websites effectively.'
      }
    ]
  }
};

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  // While the page is loading and router.query isn't available yet
  if (router.isFallback || !slug) {
    return (
      <>
        <Header />
        <div style={{ 
          height: '60vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '1.2rem'
        }}>
          Loading post...
        </div>
        <Footer />
      </>
    );
  }
  
  const post = blogPosts[slug];
  
  // Handle 404 if post not found
  if (!post) {
    return (
      <>
        <Header />
        <div style={{ 
          height: '60vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          fontSize: '1.2rem' 
        }}>
          <h1>Post Not Found</h1>
          <p>We couldn&apos;t find the article you&apos;re looking for.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | Blog`}
        description={post.excerpt}
        image={post.image}
      />
      
      <Header />
      
      <main className={styles.blogPostMain}>
        <article className={styles.blogPost}>
          <div className={styles.postHeader}>
            <div className={styles.postMeta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.readTime}>{post.readTime} min read</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.author}>By {post.author}</div>
          </div>
          
          <div className={styles.featuredImage}>
            <Image 
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          
          <div className={styles.content}>
            {post.content.map((item, index) => {
              if (item.type === 'heading') {
                return <h2 key={index}>{item.text}</h2>;
              } else if (item.type === 'paragraph') {
                return <p key={index}>{item.text}</p>;
              }
              return null;
            })}
          </div>
          
          <div className={styles.postFooter}>
            <div className={styles.tags}>
              <span className={styles.tagLabel}>Tags:</span>
              <Link href={`/blog/category/${post.category.toLowerCase()}`} className={styles.tag}>
                {post.category}
              </Link>
            </div>
            
            <div className={styles.shareSection}>
              <span>Share this article:</span>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon} aria-label="Share on Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Share on Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Share on LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </article>
        
        <div className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            {Object.values(blogPosts)
              .filter(relatedPost => relatedPost.id !== post.id)
              .slice(0, 2)
              .map(relatedPost => (
                <Link 
                  href={`/blog/${Object.keys(blogPosts).find(key => blogPosts[key].id === relatedPost.id)}`}
                  key={relatedPost.id}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <Image 
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{relatedPost.category}</span>
                    <h4>{relatedPost.title}</h4>
                    <span className={styles.relatedDate}>{relatedPost.date}</span>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostPage;