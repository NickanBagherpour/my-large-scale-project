import React, { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return null; // Empty JSX for reusability
};

export default ScrollToTop;
