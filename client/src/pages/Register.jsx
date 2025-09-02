// src/pages/Register.jsx (Cập nhật để sử dụng setUser từ context)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { toast } from 'react-toastify';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      return;
    }
    try {
      const response = await registerUser({ username: formData.username, password: formData.password });
      toast.success(response.message || 'Đăng ký thành công!', {
        autoClose: 3000,
      });
      setUser(response.user); // Cập nhật user ngay lập tức
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại!');
      console.error('Register error:', error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Tạo Tài Khoản Mới
            </h1>
            <RegisterForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;