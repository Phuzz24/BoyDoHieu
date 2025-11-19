import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/cart/CheckoutForm';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
  const { cart, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api';
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    if (cart !== undefined && cart !== null) {
      setIsCartLoaded(true);
    }
  }, [cart]);

  useEffect(() => {
    if (isCartLoaded && !cart?.length && !isOrderPlaced) {
      toast.error('Giỏ hàng trống! Vui lòng thêm sản phẩm.');
      navigate('/cart');
    }
  }, [isCartLoaded, cart, navigate, isOrderPlaced]);

  const handleSubmit = async (formData) => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để đặt hàng!');
      navigate('/login');
      return;
    }
    if (!cart?.length) {
      toast.error('Giỏ hàng trống!');
      return;
    }

    try {
      const orderData = {
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
          price: item.discountPrice || item.price || 0,
          name: item.name || 'Sản phẩm không tên',
          brand: item.brand || 'Không rõ',
          selectedSize: item.selectedSize || null,
          selectedColor: item.selectedColor || null,
          images: item.images ? [item.images[0]] : [],
        })),
        total,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        paymentMethod: 'cod',
      };
      console.log('Order data before sending:', orderData);

      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      console.log('Order response:', response.data);

      setIsOrderPlaced(true); // Set trước để ngăn useEffect trigger
      toast.success('Đặt hàng thành công!');
      clearCart();
      navigate(`/order-success/${response.data.order._id}`); // Thay đổi: dùng param thay vì state
    } catch (error) {
      console.error('Error creating order:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : null,
      });
      toast.error(error.response?.data?.message || 'Đặt hàng thất bại!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-extrabold text-luxuryBlack dark:text-luxuryWhite mb-10 text-center tracking-wide animate-fade-in">
          Đặt hàng
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-luxuryGold/20 dark:border-luxuryBlack/20">
              <h2 className="text-2xl font-semibold text-luxuryBlack dark:text-luxuryWhite mb-6">Sản phẩm trong giỏ</h2>
              {isCartLoaded && !cart?.length ? (
                <p className="text-center text-gray-600 dark:text-gray-400">Giỏ hàng trống!</p>
              ) : (
                cart?.map((item, index) => (
                  <div
                    key={`${item._id || index}-${item.selectedSize || 'no-size'}-${item.selectedColor || 'no-color'}`}
                    className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-700 rounded-xl mb-5 last:mb-0 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.images?.[0] || 'https://via.placeholder.com/100?text=No+Image'}
                        alt={item.name || 'Sản phẩm'}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                      <div>
                        <p className="text-lg font-medium text-luxuryBlack dark:text-luxuryWhite">
                          {item.name || 'Sản phẩm không tên'} - {item.brand || 'Không rõ'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {(item.discountPrice || item.price || 0).toLocaleString('vi-VN')}₫ x {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-luxuryBlack dark:text-luxuryWhite">
                      {((item.discountPrice || item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-luxuryGold/20 dark:border-luxuryBlack/20">
              <h2 className="text-2xl font-semibold text-luxuryBlack dark:text-luxuryWhite mb-6">Tóm tắt đơn hàng</h2>
              <div className="space-y-5">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Tổng phụ</span>
                  <span className="font-medium">{total.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Phí vận chuyển</span>
                  <span className="text-green-500 dark:text-green-400">Miễn phí</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-luxuryBlack dark:text-luxuryWhite border-t-2 border-luxuryGold/50 pt-5">
                  <span>Tổng cộng</span>
                  <span className="text-luxuryGold">{total.toLocaleString('vi-VN')}₫</span>
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