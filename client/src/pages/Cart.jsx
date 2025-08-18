import React from 'react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import useCart from '../hooks/useCart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) return <p className="text-center text-xl">Giỏ hàng rỗng. <Link to="/" className="text-luxuryGold">Tiếp tục mua sắm</Link></p>;

  return (
    <div>
      <h1 className="text-3xl font-elegant text-luxuryBlack mb-8">Giỏ hàng của bạn</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
        ))}
      </div>
      <CartSummary total={total} onCheckout={() => window.location.href = '/checkout'} />
    </div>
  );
};

export default Cart;