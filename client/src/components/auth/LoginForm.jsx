import React from 'react';
import Button from '../common/Button';

const LoginForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-2">Email</label>
        <input type="email" className="w-full border rounded px-4 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Mật khẩu</label>
        <input type="password" className="w-full border rounded px-4 py-2" required />
      </div>
      <Button type="submit" className="w-full">Đăng nhập</Button>
    </form>
  );
};

export default LoginForm;