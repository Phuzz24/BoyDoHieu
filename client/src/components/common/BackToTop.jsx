import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-luxuryGold text-luxuryBlack p-3 rounded-full shadow-lg hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
};

export default BackToTop;