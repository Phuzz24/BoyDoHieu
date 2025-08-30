import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxuryWhite to-gray-100 dark:from-luxuryBlack dark:to-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="flex justify-center mb-6">
            <svg
              className="w-24 h-24 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Hãy thêm sản phẩm để tiếp tục mua sắm!</p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-xl hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            <svg
              className="w-5 h-5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxuryWhite to-gray-100 dark:from-luxuryBlack dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">Giỏ hàng của bạn</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary total={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;