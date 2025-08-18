import React from 'react';
import CheckoutForm from '../components/cart/CheckOutForm';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';

const Checkout = () => {
  const { clearCart } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thanh toán thành công!');
    clearCart();
    window.location.href = '/';
  };

  return (
    <div>
      <h1 className="text-3xl font-elegant text-luxuryBlack mb-8">Thanh toán</h1>
      <CheckoutForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Checkout;