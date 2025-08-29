// src/components/Cart.jsx
import React from 'react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxuryWhite dark:bg-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <p className="text-2xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-4">Giỏ hàng rỗng.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-luxuryGold to-yellow-500 text-luxuryBlack rounded-full hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 hover:scale-105 shadow-md"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxuryWhite dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">Giỏ hàng của bạn</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={{ ...item, id: item._id, image: item.images[0] || '/placeholder.jpg' }}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary total={total} onCheckout={() => window.location.href = '/checkout'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;