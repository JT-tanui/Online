import React, { useEffect } from 'react';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Simple analytics tracking
    const handleRouteChange = (url) => {
      window.gtag?.('config', 'G-XXXXXXXXXX', {
        page_path: url,
      });
    };

    // Add analytics script if needed
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      console.log('Page view tracked');
    }
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;