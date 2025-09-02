import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const ForgotPasswordForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert('Vui lòng nhập tài khoản!');
      return;
    }
    onSubmit({ username });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
          placeholder="Tên tài khoản"
          required
        />
      </div>
      <Button type="submit" className="w-full">Gửi yêu cầu</Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
        Nhớ mật khẩu? <Link to="/login" className="font-bold text-luxuryGold hover:underline dark:text-luxuryGold">Đăng nhập</Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;