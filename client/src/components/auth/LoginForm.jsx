import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Vui lòng nhập tài khoản và mật khẩu!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
          placeholder="Tên tài khoản"
          required
          autoComplete="username"
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
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" className="w-full">Đăng nhập</Button>
      <div className="flex items-start justify-between">
        <Link to="/forgot-password" className="text-sm font-medium text-luxuryGold hover:underline dark:text-luxuryGold">Quên mật khẩu?</Link>
      </div>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
        Chưa có tài khoản? <Link to="/register" className="font-bold text-luxuryGold hover:underline dark:text-luxuryGold">Đăng ký</Link>
      </p>
    </form>
  );
};

export default LoginForm;