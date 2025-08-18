import React from 'react';
import Button from '../common/Button';

const CartSummary = ({ total, onCheckout }) => {
  return (
    <div className="mt-8 p-4 bg-luxuryWhite rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Tổng kết</h3>
      <p className="text-lg">Tổng cộng: ${total}</p>
      <Button onClick={onCheckout} className="mt-4 w-full">Tiến hành thanh toán</Button>
    </div>
  );
};

export default CartSummary;