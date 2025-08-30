import React from 'react';
import CheckoutForm from '../components/cart/CheckoutForm';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';

const Checkout = () => {
  const { cart, clearCart, total } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thanh toán thành công!');
    clearCart();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxuryWhite to-gray-100 dark:from-luxuryBlack dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">Thanh toán</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-luxuryGold/10 dark:border-luxuryBlack/10">
              <h2 className="text-2xl font-bold text-luxuryBlack dark:text-luxuryWhite mb-4">Sản phẩm trong giỏ hàng</h2>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4 last:mb-0 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0] || '/placeholder.jpg'}
                      alt={item.name || 'Sản phẩm'}
                      className="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-luxuryBlack dark:text-luxuryWhite">
                        {item.name || 'Sản phẩm không tên'} - {item.brand || 'Không rõ thương hiệu'}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        ${(item.discountPrice || item.price || 0).toFixed(2)} x {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-luxuryBlack dark:text-luxuryWhite">
                    ${(item.discountPrice || item.price || 0) * (item.quantity || 1)}.00
                  </p>
                </div>
              ))}
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-luxuryGold/10 dark:border-luxuryBlack/10">
              <h2 className="text-2xl font-bold text-luxuryBlack dark:text-luxuryWhite mb-4">Tóm tắt đơn hàng</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tổng phụ</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-500 dark:text-green-400">Miễn phí</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-luxuryBlack dark:text-luxuryWhite border-t border-gray-200 dark:border-gray-700 pt-4">
                  <span>Tổng cộng</span>
                  <span className="text-luxuryGold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <CheckoutForm cart={cart} total={total} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;