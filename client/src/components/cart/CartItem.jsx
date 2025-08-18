import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center border-b py-4">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-bold">{item.name} - {item.brand}</h3>
        <p className="text-gray-600">${item.price} x {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-4">
        <input type="number" value={item.quantity} onChange={(e) => onUpdateQuantity(item.id, e.target.value)} className="w-16 border rounded px-2 py-1" min="1" />
        <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;