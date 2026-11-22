import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import PostBody from '../../components/PostBody';
import { posts, getPostBySlug } from '../../data/posts';
import { personalInfo } from '../../data/personalInfo';
import styles from '../../styles/Blog.module.css';

// `output: 'export'` in next.config.js means every post URL has to be known at
// build time. fallback: false keeps an unknown slug a hard 404 rather than a
// blank page.
export function getStaticPaths() {
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { notFound: true };
  }

  return { props: { post } };
}

export default function BlogPost({ post }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://busienei-portfolio.netlify.app';
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#post`,
    headline: post.title,
    alternativeHeadline: post.subtitle,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: postUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    inLanguage: 'en',
    keywords: (post.tags || []).join(', '),
    author: {
      '@type': 'Person',
      name: personalInfo.name,
      url: baseUrl,
      jobTitle: 'Software Engineer',
    },
    publisher: { '@type': 'Person', name: personalInfo.name, url: baseUrl },
    isPartOf: { '@type': 'Blog', '@id': `${baseUrl}/blog#blog` },
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        keywords={(post.tags || []).join(', ')}
        article
        publishedTime={post.date}
        modifiedTime={post.date}
      />

      <Header />

      <main>
        <article className={styles.article}>
          <Link href="/blog" className={styles.backLink}>
            <i className="fas fa-arrow-left"></i> Writing
          </Link>

          <header className={styles.articleHeader}>
            <div className={styles.cardMeta}>
              <time dateTime={post.date}>{post.dateLabel}</time>
              {post.readingTime && (
                <>
                  <span className={styles.metaDot}>·</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>

            <h1 className={styles.articleTitle}>{post.title}</h1>
            <p className={styles.articleSubtitle}>{post.subtitle}</p>

            {post.tags?.length > 0 && (
              <div className={styles.tagRow}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <PostBody content={post.content} />

          <footer className={styles.articleFooter}>
            <p className={styles.footerNote}>
              Written by {personalInfo.name}. If you are solving the same problem and want
              to compare notes, <Link href="/#contact">get in touch</Link>.
            </p>
          </footer>
        </article>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
