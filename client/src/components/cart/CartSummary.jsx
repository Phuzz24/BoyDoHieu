import React from 'react';
import Button from '../common/Button';

const CartSummary = ({ total, onCheckout }) => {
  return (
    <div className="mt-8 p-6 bg-luxuryWhite dark:bg-gray-800 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Tổng kết</h3>
      <p className="text-lg text-luxuryBlack dark:text-luxuryWhite">Tổng cộng: ${total.toFixed(2)}</p>
      <Button
        onClick={onCheckout}
        className="mt-4 w-full bg-gradient-to-r from-luxuryGold to-yellow-500 text-luxuryBlack hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300"
      >
        Tiến hành thanh toán
      </Button>
    </div>
  );
};

export default CartSummary;