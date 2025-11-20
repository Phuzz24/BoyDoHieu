// ChangePassword.jsx – ĐÃ FIX HOÀN CHỈNH
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.newPassword !== formData.confirmNewPassword) {
    toast.error('Mật khẩu mới không khớp!');
    return;
  }
  if (formData.newPassword.length < 6) {
    toast.error('Mật khẩu mới phải ít nhất 6 ký tự!');
    return;
  }

  try {
    await changePassword(formData.currentPassword, formData.newPassword);
    
    toast.success('Đổi mật khẩu thành công! Đang đăng xuất...', {
      autoClose: 3000,
      pauseOnHover: true,
    });

    // ĐỪNG GỌI logout() ở đây nữa!
    // Chỉ xóa token + redirect → để AuthContext tự xử lý
    localStorage.removeItem('token');  // XÓA TOKEN CŨ
    setTimeout(() => {
      navigate('/login', { replace: true }); // replace để không back lại được
    }, 2000); // Đợi toast hiện xong

  } catch (error) {
    toast.error(error?.message || 'Mật khẩu hiện tại không đúng!');
  }
};

  // ... phần return giữ nguyên, chỉ thêm class đẹp hơn
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Đổi Mật Khẩu
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
                minLength="6"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              Cập nhật mật khẩu
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            <a href="/account" className="text-blue-600 hover:underline">Quay lại hồ sơ</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;