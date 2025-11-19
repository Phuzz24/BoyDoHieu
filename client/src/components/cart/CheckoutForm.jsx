import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutForm = ({ cart, total, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    province: '',
    district: '',
    email: '',
    phone: '',
    paymentMethod: 'cod', // Chỉ hỗ trợ COD
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Lấy danh sách tỉnh
    axios
      .get('https://provinces.open-api.vn/api/?depth=2')
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error('Error fetching provinces:', error));
  }, []);

  useEffect(() => {
    // Lấy danh sách huyện khi chọn tỉnh
    if (formData.province) {
      const province = provinces.find((p) => p.name === formData.province);
      if (province && province.districts) {
        setDistricts(province.districts);
        setFormData((prev) => ({ ...prev, district: '' }));
      }
    }
  }, [formData.province, provinces]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.province || !formData.district) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Số điện thoại phải có đúng 10 chữ số!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Email không hợp lệ!');
      return;
    }
    onSubmit({
      ...formData,
      address: { province: formData.province, district: formData.district },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-luxuryGold/20 dark:border-luxuryBlack/20"
    >
      <h2 className="text-2xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-6">Thông tin giao hàng</h2>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Họ và tên</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          placeholder="Nhập họ và tên"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Tỉnh/Thành phố</label>
        <select
          name="province"
          value={formData.province}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          required
        >
          <option value="">Chọn tỉnh/thành phố</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Quận/Huyện</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          required
          disabled={!formData.province}
        >
          <option value="">Chọn quận/huyện</option>
          {districts.map((district) => (
            <option key={district.code} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          placeholder="Nhập email"
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
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-luxuryBlack dark:text-luxuryWhite focus:outline-none focus:ring-2 focus:ring-luxuryGold transition-all duration-300"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-luxuryBlack dark:text-luxuryWhite mb-2">
          Phương thức thanh toán
        </label>
        <p className="text-sm text-gray-600 dark:text-gray-400">Thanh toán khi nhận hàng (COD)</p>
        <input
          type="hidden"
          name="paymentMethod"
          value="cod"
        />
      </div>
      <Button
        type="submit"
        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-xl hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 hover:shadow-lg transform hover:scale-105"
      >
        Đặt hàng
      </Button>
    </form>
  );
};

export default CheckoutForm;