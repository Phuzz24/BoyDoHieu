// src/pages/Login.jsx (Cập nhật để sử dụng setUser từ context)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { toast } from 'react-toastify';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (formData) => {
    try {
      const response = await loginUser({ username: formData.username, password: formData.password });
      toast.success(response.message || 'Đăng nhập thành công!', {
        autoClose: 3000,
      });
      setUser(response.user); // Cập nhật user ngay lập tức
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại!');
      console.error('Login error:', error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng Nhập
            </h1>
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;