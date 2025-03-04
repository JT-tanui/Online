import React, { useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';

function MyApp({ Component, pageProps }) {
  // Fix for server-side rendering of theme
  useEffect(() => {
    // On initial load, check if a theme is stored
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Apply the saved theme
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Apply dark theme if user prefers dark mode
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;