import Head from 'next/head';
import { useRouter } from 'next/router';
import { personalInfo } from '../data/personalInfo';
import { projects } from '../data/projects';
import { moreWork } from '../data/moreWork';

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

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://busienei-portfolio.netlify.app';
  const canonicalUrl = `${baseUrl}${router.asPath === '/' ? '' : router.asPath}`;

  const siteTitle = title
    ? `${title} | ${personalInfo.name}`
    : personalInfo.seoTitle || `${personalInfo.name} — ${personalInfo.title}`;
  const siteDescription =
    description ||
    personalInfo.introduction ||
    'Software engineer building help desk software and Windows desktop tools.';
  const siteImage = ogImage || `${baseUrl}${personalInfo.avatarUrl || '/images/profile.jpg'}`;
  const siteKeywords =
    keywords ||
    'software engineer, technical support engineer, solutions engineer, help desk software, ticketing system, Django, React, TypeScript, C#, WPF, .NET, Nairobi, Kenya, remote';

  // Flat skill list for `knowsAbout` — pulled from the same source the page
  // renders, so structured data can never drift from what a reader sees.
  const knowsAbout = (personalInfo.skills || [])
    .flatMap((group) => group.skills)
    .filter(Boolean);

  const allProjects = [
    ...(projects?.completed || []),
    ...(projects?.inProgress || []),
  ];

  // The long tail counts too — an answer engine asked "what has he built?"
  // should see the full body of work, not just the ten headline entries.
  const moreWorkItems = (moreWork?.groups || []).flatMap((group) =>
    group.items.map((item) => ({
      title: item.name,
      description: item.note,
      technologies: item.stack ? item.stack.split(' · ') : [],
      liveUrl: item.link || '',
    }))
  );

  const sameAs = [
    personalInfo.socials?.github,
    personalInfo.socials?.linkedin,
    personalInfo.socials?.credly,
  ].filter(Boolean);

  const personId = `${baseUrl}/#person`;
  const siteId = `${baseUrl}/#website`;

  const credentials = [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Diploma in Computer Programming',
      credentialCategory: 'Diploma',
      educationalLevel: 'Diploma',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'The Co-operative University of Kenya',
      },
      description:
        'Assessed as equivalent to a United States Associate of Science in Computer Programming — 60 semester credits, 3.10 GPA — by SpanTran / The Evaluation Company, a NACES member, in June 2026.',
    },
    ...(personalInfo.additionalEducation || []).map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.degree,
      credentialCategory: 'Certificate',
      recognizedBy: { '@type': 'Organization', name: item.institution },
      description: item.description,
    })),
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${baseUrl}/#profilepage`,
        url: baseUrl,
        name: siteTitle,
        description: siteDescription,
        inLanguage: 'en',
        isPartOf: { '@id': siteId },
        mainEntity: { '@id': personId },
        about: { '@id': personId },
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: baseUrl,
        name: `${personalInfo.name} — Portfolio`,
        description: siteDescription,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: personalInfo.name,
        givenName: 'Job',
        familyName: 'Busienei',
        url: baseUrl,
        image: siteImage,
        email: personalInfo.email,
        telephone: personalInfo.phone,
        jobTitle: 'Software Engineer',
        description: siteDescription,
        knowsAbout,
        knowsLanguage: ['en', 'sw'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nairobi',
          addressCountry: 'KE',
        },
        worksFor: {
          '@type': 'Organization',
          name: personalInfo.currentCompany,
          description:
            'Help desk and ticketing SaaS — shared inbox, SLA controls, email-to-ticket intake, knowledge base and customer portal.',
          url: 'https://safaridesk.io',
        },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Engineer',
          occupationLocation: { '@type': 'City', name: 'Nairobi' },
          skills: knowsAbout.join(', '),
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'The Co-operative University of Kenya',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nairobi',
            addressCountry: 'KE',
          },
        },
        hasCredential: credentials,
        seeks: {
          '@type': 'Demand',
          name: 'Remote Technical Support Engineer, Solutions Engineer or Software Engineer roles',
        },
        sameAs,
      },
      {
        '@type': 'ItemList',
        '@id': `${baseUrl}/#projects`,
        name: `Projects by ${personalInfo.name}`,
        numberOfItems: allProjects.length + moreWorkItems.length,
        itemListElement: [...allProjects, ...moreWorkItems].map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: project.title,
            description: project.description,
            applicationCategory: 'BusinessApplication',
            ...(project.liveUrl ? { url: project.liveUrl } : {}),
            author: { '@id': personId },
            ...(project.technologies?.length
              ? { keywords: project.technologies.join(', ') }
              : {}),
          },
        })),
      },
    ],
  };

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="author" content={author} />
      <meta name="theme-color" content={personalInfo.themeColor || '#0070f3'} />

      {/* Geography — helps "engineer in Nairobi / Kenya" style queries */}
      <meta name="geo.region" content="KE-30" />
      <meta name="geo.placename" content="Nairobi" />

      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'profile'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={`${personalInfo.name} — Portfolio`} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:alt" content={`${personalInfo.name}, software engineer`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {!article && <meta property="profile:first_name" content="Job" />}
      {!article && <meta property="profile:last_name" content="Busienei" />}

      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && <meta property="article:author" content={author} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:image:alt" content={`${personalInfo.name}, software engineer`} />

      <link rel="canonical" href={canonicalUrl} />

      {/* Crawling. `max-snippet:-1` lets search and AI answer engines quote the
          page in full rather than truncating it to a stub. */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large"
      />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={personalInfo.name} />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
        />
      )}
      {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default SEO;
