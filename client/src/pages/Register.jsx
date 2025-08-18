import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { toast } from 'react-toastify';
import { registerUser } from '../services/authService';

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await registerUser({ name, email, password });
      toast.success('Đăng ký thành công!');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Đăng ký thất bại!');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-elegant text-luxuryBlack mb-8 text-center">Đăng ký</h1>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;