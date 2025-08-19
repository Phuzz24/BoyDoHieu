import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted || formData.password !== formData.confirmPassword) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
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
        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="flex items-start">
        <input
          id="terms"
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-luxuryGold dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-luxuryGold"
          required
        />
        <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
          Tôi chấp nhận <a href="#" className="font-medium text-luxuryGold hover:underline dark:text-luxuryGold">Điều khoản và Điều kiện</a>
        </label>
      </div>
      <Button type="submit" className="w-full">Tạo Tài Khoản</Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
        Đã có tài khoản? <Link to="/login" className="font-medium text-luxuryGold hover:underline dark:text-luxuryGold">Đăng nhập</Link>
      </p>
    </form>
  );
};

export default RegisterForm;