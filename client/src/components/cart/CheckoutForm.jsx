import React from 'react';
import Button from '../common/Button';

const CheckoutForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-2">Họ tên</label>
        <input type="text" className="w-full border rounded px-4 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Địa chỉ</label>
        <input type="text" className="w-full border rounded px-4 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Số thẻ (Test: 4242 4242 4242 4242)</label>
        <input type="text" className="w-full border rounded px-4 py-2" required />
      </div>
      <Button type="submit" className="w-full">Thanh toán</Button>
    </form>
  );
};

export default CheckoutForm;