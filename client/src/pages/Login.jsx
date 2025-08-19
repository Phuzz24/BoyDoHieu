import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { toast } from 'react-toastify';
import { loginUser } from '../services/authService';

const Login = () => {
  const handleSubmit = async (formData) => {
    try {
      await loginUser(formData);
      toast.success('Đăng nhập thành công!');
      window.location.href = '/';
    } catch (error) {
      toast.error('Đăng nhập thất bại!');
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