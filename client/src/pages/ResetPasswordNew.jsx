// src/pages/auth/ResetPasswordNew.jsx – PHIÊN BẢN SIÊU ĐẸP, SIÊU MƯỢT
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyCodeAndReset } from '../services/authService';

const ResetPasswordNew = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1 = nhập mã, 2 = nhập mật khẩu mới
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Bước 1: Xác nhận mã
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (code.length !== 6 || !/^\d+$/.test(code)) {
      return toast.error('Mã xác nhận phải là 6 chữ số!');
    }

    setLoading(true);
    try {
      // Gọi API check mã (chỉ check, chưa đổi mật khẩu)
      await verifyCodeAndReset(email, code, 'TEMP'); // dùng 'TEMP' để check thôi
      toast.success('Mã chính xác! Vui lòng nhập mật khẩu mới');
      setStep(2); // → chuyển sang bước 2
    } catch (err) {
      toast.error(err.response?.data?.message || 'Mã sai hoặc đã hết hạn!');
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error('Mật khẩu không khớp!');
    if (newPassword.length < 6) return toast.error('Mật khẩu ít nhất 6 ký tự!');

    setLoading(true);
    try {
      await verifyCodeAndReset(email, code, newPassword);
      toast.success('Đặt lại mật khẩu thành công! Đang chuyển về đăng nhập...');
      setTimeout(() => { window.location.href = '/login'; }, 2000);
    } catch (err) {
      toast.error('Lỗi hệ thống, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-luxuryGold mb-8">
          Đặt Lại Mật Khẩu
        </h1>

        <div className="text-center text-gray-600 mb-6">
          Mã đã được gửi đến: <strong>{email || 'email của bạn'}</strong>
        </div>

        <form onSubmit={step === 1 ? handleVerifyCode : handleChangePassword} className="space-y-6">

          {/* BƯỚC 1: NHẬP MÃ XÁC NHẬN */}
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Nhập mã 6 số"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength="6"
                className="w-full px-5 py-6 text-center text-3xl font-bold tracking-widest border-2 border-gray-300 rounded-xl focus:border-luxuryGold focus:outline-none transition"
                required
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full bg-luxuryGold hover:bg-amber-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl text-lg transition"
              >
                {loading ? 'Đang kiểm tra...' : 'Xác nhận mã'}
              </button>
            </>
          )}

          {/* BƯỚC 2: NHẬP MẬT KHẨU MỚI – CHỈ HIỆN KHI MÃ ĐÚNG */}
          {step === 2 && (
            <>
              <div className="text-center mb-4">
                <span className="text-green-600 font-bold text-2xl">Mã chính xác!</span>
              </div>

              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-luxuryGold focus:outline-none"
                required
                autoFocus
              />

              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-luxuryGold focus:outline-none"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-luxuryGold hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-lg transition"
              >
                {loading ? 'Đang đổi mật khẩu...' : 'Hoàn tất đặt lại'}
              </button>
            </>
          )}
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          <Link to="/login" className="text-luxuryGold hover:underline font-medium">
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPasswordNew;