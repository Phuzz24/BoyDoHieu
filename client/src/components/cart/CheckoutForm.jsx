import React from 'react';
import Button from '../common/Button';

const CheckoutForm = ({ cart, total, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    cardNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.email || !formData.phone || !formData.cardNumber) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-luxuryGold/10 dark:border-luxuryBlack/10">
      <h2 className="text-2xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-6">Thông tin thanh toán</h2>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Họ và tên</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Địa chỉ</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Số điện thoại</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Số thẻ (Test: 4242 4242 4242 4242)</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-xl hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 hover:shadow-xl transform hover:scale-105"
      >
        Xác nhận thanh toán
      </Button>
    </form>
  );
};

export default CheckoutForm;