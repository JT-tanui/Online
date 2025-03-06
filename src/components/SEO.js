import Head from 'next/head';
import { useRouter } from 'next/router';
import { personalInfo } from '../data/personalInfo';

const SEO = ({ 
  title,
  description,
  keywords,
  ogImage,
  article = false,
  publishedTime,
  modifiedTime,
  author = personalInfo.name,
}) => {
  const router = useRouter();
  
  // Get base URL dynamically (important for production vs development)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'; // Set your default or use env
  const canonicalUrl = `${baseUrl}${router.asPath === '/' ? '' : router.asPath}`;
  
  // Set default values with fallbacks
  const siteTitle = title 
    ? `${title} | ${personalInfo.name}`
    : `${personalInfo.name} | ${personalInfo.title}`;
  const siteDescription = description || personalInfo.introduction?.substring(0, 160) || 'Professional portfolio showcasing web development projects and skills';
  const siteImage = ogImage || `${baseUrl}/images/og-image.jpg`;
  const siteKeywords = keywords || 'web development, software engineering, frontend, portfolio, projects';
  
  // Parse skills from personalInfo for structured data
  const skills = personalInfo.skills 
    ? personalInfo.skills.map(skillCategory => skillCategory.skills).flat()
    : ["Web Development", "JavaScript", "React", "Next.js"];

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="author" content={author} />
      <meta name="theme-color" content={personalInfo.themeColor || "#0070f3"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={`${personalInfo.name}'s Portfolio`} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Additional Article Meta Tags */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      {personalInfo?.socials?.twitter && (
        <meta name="twitter:creator" content={`@${personalInfo.socials.twitter.split('/').pop()}`} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots & Indexing Control */}
      <meta name="robots" content="index, follow" />
      
      {/* Apple Web App Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={personalInfo.name} />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Verification Tags - Add your own values in env variables */}
      {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
      )}
      {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
      )}
      {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
        <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} />
      )}
      
      {/* Structured data for improved Google search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": article ? "Article" : "Person",
            ...(article ? {
              "headline": title,
              "image": [siteImage],
              "datePublished": publishedTime,
              "dateModified": modifiedTime || publishedTime,
              "author": {
                "@type": "Person",
                "name": author
              }
            } : {
              "name": personalInfo.name,
              "url": baseUrl,
              "image": personalInfo.avatarUrl || siteImage,
              "jobTitle": personalInfo.title,
              "worksFor": {
                "@type": "Organization",
                "name": personalInfo.currentCompany || ""
              },
              "description": personalInfo.introduction,
              "knowsAbout": skills.slice(0, 10),
              "sameAs": [
                personalInfo.socials?.github,
                personalInfo.socials?.linkedin, 
                personalInfo.socials?.twitter,
                personalInfo.socials?.instagram,
                personalInfo.socials?.credly
              ].filter(Boolean)
            })
          })
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": baseUrl,
            "name": `${personalInfo.name} - Portfolio`,
            "description": siteDescription,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  );
};

export default SEO;