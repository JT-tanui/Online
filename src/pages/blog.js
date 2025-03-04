import React from 'react';
import Header from '../components/Header';
import Blog from '../components/Blog';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const BlogPage = () => {
  return (
    <>
      <SEO 
        title="Blog | Your Name" 
        description="Read my thoughts and tutorials on web development, programming, and technology."
        keywords="blog, web development, coding tutorials, programming tips"
      />
      <Header />
      <main>
        <Blog />
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;