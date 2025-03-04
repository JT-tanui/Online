import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { motion } from 'framer-motion';
import styles from '../styles/BlogPost.module.css';

const BlogPost = ({ post }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Open image in lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };
  
  // Navigate through images in lightbox
  const navigateGallery = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % post.gallery.length
      : (currentImageIndex - 1 + post.gallery.length) % post.gallery.length;
    
    setCurrentImageIndex(newIndex);
  };

  return (
    <article className={styles.blogPost}>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderContent}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.postMeta}>
            <span className={styles.date}>
              <i className="far fa-calendar"></i> {post.date}
            </span>
            <span className={styles.readTime}>
              <i className="far fa-clock"></i> {post.readTime} min read
            </span>
            {post.author && (
              <span className={styles.author}>
                <i className="far fa-user"></i> {post.author}
              </span>
            )}
          </div>
          <div className={styles.postTags}>
            {post.tags && post.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        </div>
        <div className={styles.featuredImageWrapper}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
      
      {/* Content sections */}
      <div className={styles.postContent}>
        <div className={styles.shareButtons}>
          <button aria-label="Share on Twitter">
            <i className="fab fa-twitter"></i>
          </button>
          <button aria-label="Share on LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </button>
          <button aria-label="Share on Facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button aria-label="Copy link">
            <i className="fas fa-link"></i>
          </button>
        </div>
        
        <div className={styles.contentBody}>
          {post.sections && post.sections.map((section, index) => (
            <div key={index} className={styles.section}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.content && section.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              {section.code && (
                <div className={styles.codeBlock}>
                  <pre><code>{section.code}</code></pre>
                </div>
              )}
            </div>
          ))}
          
          {/* Image Gallery */}
          {post.gallery && post.gallery.length > 0 && (
            <div className={styles.gallerySection}>
              <h2>Gallery</h2>
              <div className={styles.imageGallery}>
                {post.gallery.map((image, index) => (
                  <div 
                    key={index} 
                    className={styles.galleryItem}
                    onClick={() => openLightbox(index)}
                  >
                    <div className={styles.galleryImageWrapper}>
                      <Image
                        src={image.src}
                        alt={image.caption || `Gallery image ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    {image.caption && (
                      <span className={styles.imageCaption}>{image.caption}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Related Content */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className={styles.relatedPosts}>
              <h3>Related Posts</h3>
              <div className={styles.relatedGrid}>
                {post.relatedPosts.map(related => (
                  <Link href={`/blog/${related.slug}`} key={related.id} className={styles.relatedCard}>
                    <div className={styles.relatedImageWrapper}>
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.relatedContent}>
                      <span className={styles.relatedCategory}>{related.category}</span>
                      <h4>{related.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Image Lightbox */}
      {lightboxOpen && post.gallery && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeLightbox} onClick={closeLightbox}>×</button>
          <button 
            className={`${styles.lightboxNav} ${styles.prevBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery('prev');
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div 
            className={styles.lightboxContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={post.gallery[currentImageIndex].src}
                alt={post.gallery[currentImageIndex].caption || ''}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            {post.gallery[currentImageIndex].caption && (
              <div className={styles.lightboxCaption}>
                {post.gallery[currentImageIndex].caption}
              </div>
            )}
          </div>
          <button 
            className={`${styles.lightboxNav} ${styles.nextBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery('next');
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </article>
  );
};

export default BlogPost;