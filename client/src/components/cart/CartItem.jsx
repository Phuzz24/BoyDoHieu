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
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-luxuryGold/10 dark:border-luxuryBlack/10">
      <img
        src={item.images[0] || '/placeholder.jpg'}
        alt={item.name || 'Sản phẩm'}
        className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
      />
      <div className="flex-1 ml-4">
        <Link
          to={`/product/${item._id}`}
          className="text-lg font-semibold text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300"
        >
          {item.name || 'Sản phẩm không tên'} - {item.brand || 'Không rõ thương hiệu'}
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {(item.discountPrice || item.price || 0).toLocaleString('vi-VN')}₫
        </p>
        {item.selectedSize && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Size: {item.selectedSize}</p>
        )}
        {item.selectedColor && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Color: {item.selectedColor}</p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
          <button
            onClick={handleDecrease}
            className="text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300 hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14"
              />
            </svg>
          </button>
          <span className="text-sm font-medium text-luxuryBlack dark:text-luxuryWhite">
            {item.quantity || 1}
          </span>
          <button
            onClick={handleIncrease}
            className="text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300 hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v14M5 12h14"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;