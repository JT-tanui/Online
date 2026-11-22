import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { posts } from '../../data/posts';
import { personalInfo } from '../../data/personalInfo';
import styles from '../../styles/Blog.module.css';

export default function BlogIndex() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://busienei-portfolio.netlify.app';

  // A Blog graph alongside the page's own metadata, so an answer engine reading
  // raw HTML sees the list of posts without executing any JavaScript.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${baseUrl}/blog#blog`,
    name: `Writing — ${personalInfo.name}`,
    url: `${baseUrl}/blog`,
    inLanguage: 'en',
    author: { '@type': 'Person', name: personalInfo.name, url: baseUrl },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${baseUrl}/blog/${post.slug}`,
      keywords: (post.tags || []).join(', '),
      author: { '@type': 'Person', name: personalInfo.name, url: baseUrl },
    })),
  };

  return (
    <>
      <SEO
        title="Writing"
        description="Technical writing on offline-first systems, data integrity and the things that break in production."
        keywords="offline-first, idempotency, data integrity, Postgres, SQLite, software engineering, Nairobi"
      />

      <Header />

      <main>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h1 className={styles.sectionTitle}>Writing</h1>
            <p className={styles.bannerSubtitle}>
              Notes from systems I have actually shipped — what the design was, where it
              failed, and what I would do differently.
            </p>
          </div>
        </div>

        <div className={styles.listWrap}>
          {posts.length === 0 ? (
            <p className={styles.empty}>Nothing published yet.</p>
          ) : (
            <ul className={styles.cardGrid}>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className={styles.card}>
                    <div className={styles.cardMeta}>
                      <time dateTime={post.date}>{post.dateLabel}</time>
                      {post.readingTime && (
                        <>
                          <span className={styles.metaDot}>·</span>
                          <span>{post.readingTime}</span>
                        </>
                      )}
                    </div>

                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardSubtitle}>{post.subtitle}</p>

                    {post.tags?.length > 0 && (
                      <div className={styles.tagRow}>
                        {post.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className={styles.cardLink}>
                      Read <i className="fas fa-arrow-right"></i>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
