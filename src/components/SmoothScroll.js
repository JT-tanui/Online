import React from 'react';

const SmoothScroll = ({ children }) => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70, // Adjust for header height
        behavior: 'smooth'
      });
    }
  };

  // Clone and add event handlers to children
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        onClick: (e) => {
          const href = child.props.href;
          if (href && href.startsWith('#')) {
            scrollToSection(e, href.substring(1));
          }
        }
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default SmoothScroll;