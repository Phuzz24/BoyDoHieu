import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const ResetPasswordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
          placeholder="••••••••"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
          placeholder="••••••••"
          required
        />
      </div>
      <Button type="submit" className="w-full">Đặt lại mật khẩu</Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
        Nhớ mật khẩu? <Link to="/login" className="font-bold text-luxuryGold hover:underline dark:text-luxuryGold">Đăng nhập</Link>
      </p>
    </form>
  );
};

export default ResetPasswordForm;