import Head from 'next/head';
import { useRouter } from 'next/router';
import { personalInfo } from '../data/personalInfo';

const SEO = ({ 
  title = `${personalInfo.name} | ${personalInfo.title}`,
  description = "Personal portfolio showcasing my web development projects and skills.",
  keywords = "web developer, software engineer, frontend developer, portfolio, projects",
  ogImage = "/images/og-image.jpg"  // Make sure this exists in your public folder
}) => {
  const router = useRouter();
  const canonicalUrl = `https://yourdomain.com${router.asPath}`; // Replace with your actual domain

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Additional SEO enhancers */}
      <meta name="author" content={personalInfo.name} />
      <meta name="theme-color" content="#0070f3" />
      
      {/* Structured data for improved Google search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": personalInfo.name,
            "url": "https://yourdomain.com",
            "jobTitle": personalInfo.title,
            "knowsAbout": ["Web Development", "JavaScript", "React", "Next.js"],
            "sameAs": [
              personalInfo.socials?.github,
              personalInfo.socials?.linkedin,
              personalInfo.socials?.twitter
            ].filter(Boolean)
          })
        }}
      />
    </Head>
  );
};

export default SEO;