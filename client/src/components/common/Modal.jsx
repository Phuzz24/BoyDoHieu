import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-luxuryWhite p-8 rounded-lg shadow-xl max-w-md w-full relative transform scale-100 transition-transform duration-300">
        <button onClick={onClose} className="absolute top-2 right-2 text-luxuryBlack hover:text-luxuryGold">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;