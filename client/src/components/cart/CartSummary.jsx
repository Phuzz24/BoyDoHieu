import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ total }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-luxuryGold/20 dark:border-luxuryBlack/20">
      <h2 className="text-2xl font-semibold text-luxuryBlack dark:text-luxuryWhite mb-6">Tóm tắt đơn hàng</h2>
      <div className="space-y-5">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span className="font-medium">Tổng phụ</span>
          <span className="font-medium">{total.toLocaleString('vi-VN')}₫</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span className="font-medium">Phí vận chuyển</span>
          <span className="text-green-500 dark:text-green-400">Miễn phí</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-luxuryBlack dark:text-luxuryWhite border-t-2 border-luxuryGold/50 pt-5">
          <span>Tổng cộng</span>
          <span className="text-luxuryGold">{total.toLocaleString('vi-VN')}₫</span>
        </div>
      </div>
      <Link
        to="/checkout"
        className="w-full mt-6 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-xl hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 hover:shadow-lg transform hover:scale-105"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        Tiến hành thanh toán
      </Link>
    </div>
  );
};

export default CartSummary;