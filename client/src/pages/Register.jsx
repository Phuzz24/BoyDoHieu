import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { toast } from 'react-toastify';
import { registerUser } from '../services/authService';
import ErrorBoundary from '../components/common/ErrorBoundary';

const Register = () => {
  const handleSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      return;
    }
    try {
      await registerUser({ email: formData.email, password: formData.password });
      toast.success('Đăng ký thành công!');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Đăng ký thất bại!');
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