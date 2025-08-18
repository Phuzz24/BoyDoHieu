import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button onClick={onClick} className={`bg-luxuryGold text-luxuryBlack px-6 py-3 rounded-full font-bold hover:bg-luxuryWhite hover:text-luxuryGold transition-all duration-300 transform hover:scale-105 ${className}`}>
      {children}
    </button>
  );
};

export default Button;