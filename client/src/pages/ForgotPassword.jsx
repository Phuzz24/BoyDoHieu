import React from 'react';
import { Helmet } from 'react-helmet-async';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const handleSubmit = async (formData) => {
    try {
      toast.success('Yêu cầu reset mật khẩu đã gửi!');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Yêu cầu thất bại!');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Quên Mật Khẩu
            </h1>
            <ForgotPasswordForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;