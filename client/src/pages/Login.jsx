import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { toast } from 'react-toastify';
import { loginUser } from '../services/authService';

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await loginUser({ email, password });
      toast.success('Đăng nhập thành công!');
      window.location.href = '/';
    } catch (error) {
      toast.error('Đăng nhập thất bại!');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-elegant text-luxuryBlack mb-8 text-center">Đăng nhập</h1>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;