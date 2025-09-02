import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword } from '../services/authService';
import { useAuth } from '../context/AuthContext'; // Named import

const ChangePassword = () => {
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('Mật khẩu mới không khớp!');
      return;
    }
    try {
      await changePassword({ currentPassword: formData.currentPassword, newPassword: formData.newPassword, token });
      toast.success('Đổi mật khẩu thành công! Bạn sẽ được đăng xuất.', {
        autoClose: 3000,
      });
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại!');
      console.error('Change password error:', error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đổi Mật Khẩu
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="w-full text-white bg-luxuryGold hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-luxuryGold font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-luxuryGold dark:hover:bg-yellow-600 dark:focus:ring-luxuryGold">
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;