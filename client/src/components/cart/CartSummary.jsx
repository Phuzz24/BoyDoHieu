import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ total }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-luxuryGold/10 dark:border-luxuryBlack/10">
      <h2 className="text-2xl font-bold text-luxuryBlack dark:text-luxuryWhite mb-4">Tóm tắt đơn hàng</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tổng phụ</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Phí vận chuyển</span>
          <span className="text-green-500 dark:text-green-400">Miễn phí</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-luxuryBlack dark:text-luxuryWhite border-t border-gray-200 dark:border-gray-700 pt-4">
          <span>Tổng cộng</span>
          <span className="text-luxuryGold">${total.toFixed(2)}</span>
        </div>
      </div>
      <Link
        to="/checkout"
        className="w-full mt-6 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-xl hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 hover:shadow-xl transform hover:scale-105"
      >
        <svg
          className="w-5 h-5 mr-2"
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
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
        Tiến hành thanh toán
      </Link>
    </div>
  );
};

export default CartSummary;