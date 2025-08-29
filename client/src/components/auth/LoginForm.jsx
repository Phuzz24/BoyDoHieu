import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc'; // Import icon Google từ react-icons
import Button from '../common/Button';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    onSubmit(formData);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    toast.success('Đăng nhập Google thành công!');
    console.log('Google Credential:', credentialResponse);
    window.location.href = '/';
  };

  const handleGoogleError = () => {
    toast.error('Đăng nhập Google thất bại!');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Thay bằng Client ID thực */}
      <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-luxuryGold focus:border-luxuryGold w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-luxuryGold"
            placeholder="••••••••"
            required
          />
        </div>
       
        <Button type="submit" className="w-full">Đăng nhập</Button>
         <div className="flex items-start justify-between">
          <Link to="/forgot-password" className="text-sm font-medium text-luxuryGold hover:underline dark:text-luxuryGold">Quên mật khẩu?</Link>
        </div>
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-gray-500 dark:text-gray-400">Hoặc</span>
          <hr className="w-full border-gray-300 dark:border-gray-600" />
        </div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          width="full"
          
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="w-full font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 text-gray-900 dark:text-white rounded-full py-2.5 px-6 shadow-md hover:shadow-xl hover:from-luxuryGold hover:via-luxuryBlack hover:to-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 dark:hover:from-luxuryGold dark:hover:via-luxuryBlack dark:hover:to-gray-600"
            >
              <FcGoogle className="w-6 h-6" />
              Đăng nhập bằng Google
            </button>
          )}
        />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
          Chưa có tài khoản? <Link to="/register" className="font-bold text-luxuryGold hover:underline dark:text-luxuryGold">Đăng ký</Link>
        </p>
      </form>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;