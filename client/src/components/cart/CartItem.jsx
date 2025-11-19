import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleIncrease = () => onUpdateQuantity((item.quantity || 1) + 1);
  const handleDecrease = () => {
    if ((item.quantity || 1) > 1) onUpdateQuantity((item.quantity || 1) - 1);
  };

  const handleRemove = () => {
    onRemove();
    toast.success(`Đã xóa ${item.name} khỏi giỏ hàng!`, { autoClose: 3000 });
  };

  return (
    <div className="flex items-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-luxuryGold/10 dark:border-luxuryBlack/10">
      <img
        src={item.images[0] || 'https://via.placeholder.com/100?text=No+Image'}
        alt={item.name || 'Sản phẩm'}
        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
      />
      <div className="flex-1 ml-6">
        <Link
          to={`/product/${item._id}`}
          className="text-lg font-semibold text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300"
        >
          {item.name || 'Sản phẩm không tên'} - {item.brand || 'Không rõ'}
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {item.discountPrice ? `${item.discountPrice.toLocaleString('vi-VN')}₫` : `${item.price.toLocaleString('vi-VN')}₫`}
        </p>
        {item.selectedSize && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Size: {item.selectedSize}</p>
        )}
        {item.selectedColor && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Color: {item.selectedColor}</p>
        )}
      </div>
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
          <button
            onClick={handleDecrease}
            className="text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
            </svg>
          </button>
          <span className="text-lg font-medium text-luxuryBlack dark:text-luxuryWhite">
            {item.quantity || 1}
          </span>
          <button
            onClick={handleIncrease}
            className="text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;