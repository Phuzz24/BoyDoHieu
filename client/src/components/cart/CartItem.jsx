import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center border-b py-4 bg-luxuryWhite dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-bold text-luxuryBlack dark:text-luxuryWhite">{item.name} - {item.brand}</h3>
        <p className="text-gray-600 dark:text-gray-300">${item.price} x {item.quantity}</p>
        {item.selectedSize && <p className="text-sm text-gray-500 dark:text-gray-400">Kích thước: {item.selectedSize}</p>}
        {item.selectedColor && <p className="text-sm text-gray-500 dark:text-gray-400">Màu sắc: {item.selectedColor}</p>}
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, e.target.value)}
          className="w-16 border rounded-lg px-2 py-1 bg-luxuryWhite dark:bg-gray-700 dark:text-luxuryWhite focus:outline-none focus:border-luxuryGold transition-all duration-300"
          min="1"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;