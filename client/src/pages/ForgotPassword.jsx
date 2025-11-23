// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendResetCode } from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return toast.error('Email không hợp lệ!');

    setLoading(true);
    try {
      await sendResetCode(email);
      toast.success('Đã gửi mã 6 số đến email của bạn! Hãy kiểm tra hộp thư (và spam nhé)');
      setTimeout(() => {
        window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email không tồn tại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-luxuryGold">Quên Mật Khẩu</h1>
          <p className="text-gray-600 mt-3">Nhập email để nhận mã xác nhận</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-luxuryGold focus:outline-none text-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxuryGold hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-lg transition"
          >
            {loading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Nhớ mật khẩu rồi?{' '}
          <Link to="/login" className="font-bold text-luxuryGold hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;