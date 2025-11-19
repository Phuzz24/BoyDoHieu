import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để xem chi tiết đơn hàng!');
      navigate('/login');
      return;
    }
    if (orderId) {
      loadData();
    } else {
      toast.error('Không tìm thấy thông tin đơn hàng!');
      navigate('/order-history');
    }
  }, [orderId, navigate, user]);

  const getProductId = (item) => {
    if (item.productId) return item.productId;
    if (item.product) {
      if (typeof item.product === 'string') return item.product;
      if (item.product._id) return item.product._id.toString();
    }
    if (item._id) return item._id.toString();
    return null;
  };

  const getProductImage = (item, map) => {
    if (item.images && item.images.length > 0) return item.images[0];
    if (item.product && typeof item.product === 'object' && item.product.images && item.product.images.length > 0) {
      return item.product.images[0];
    }
    const id = getProductId(item);
    if (!id) return null;
    const full = map.get(id);
    return full?.images?.[0] || null;
  };

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/80/80?blur=2&random=${Math.random()}`;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [orderRes, productsRes] = await Promise.all([
        axios.get(`${API_URL}/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const orderData = orderRes.data;
      const map = new Map();
      productsRes.data.forEach((p) => map.set(p._id.toString(), p));

      const populatedProducts = orderData.products.map((item) => {
        const id = getProductId(item);
        const full = id ? map.get(id) : null;
        return {
          ...item,
          images: full?.images || item.images || [],
          name: full?.name || item.name || 'Sản phẩm không xác định',
          brand: full?.brand || item.brand || 'Không rõ',
          description: full?.description || item.description || '',
        };
      });

      setOrder({
        ...orderData,
        products: populatedProducts,
      });
    } catch (error) {
      console.error('Error loading order details:', error);
      toast.error('Lỗi khi lấy chi tiết đơn hàng!');
      navigate('/order-history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center text-gray-600 dark:text-gray-400 text-lg animate-pulse">Đang tải đơn hàng...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">Không tìm thấy đơn hàng!</p>
          <button
            onClick={() => navigate('/order-history')}
            className="mt-4 px-6 py-2 bg-luxuryGold text-luxuryBlack rounded-xl hover:bg-luxuryBlack hover:text-luxuryWhite"
          >
            Quay lại lịch sử đơn hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <svg className="w-20 h-20 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-luxuryBlack dark:text-luxuryWhite tracking-tight animate-fade-in">
            Đặt hàng thành công!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">Cảm ơn bạn đã mua sắm tại Web Đồ Hiệu!</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-luxuryGold/20 dark:border-luxuryBlack/20 transform transition-all duration-500 hover:shadow-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-semibold text-luxuryBlack dark:text-luxuryWhite mb-3">
                Mã đơn hàng: <span className="text-luxuryGold">{order._id}</span>
              </p>
              <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}
              </p>
              <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                Địa chỉ giao hàng: {order.address.province}, {order.address.district}
              </p>
              <p className="text-md text-gray-600 dark:text-gray-400">
                Phương thức thanh toán: Thanh toán khi nhận hàng (COD)
              </p>
            </div>
            <div>
              <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                Tổng tiền: <span className="font-semibold text-luxuryGold">{order.total.toLocaleString('vi-VN')}₫</span>
              </p>
              <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                Trạng thái:{' '}
                <span
                  className={`font-semibold ${
                    order.status === 'pending'
                      ? 'text-yellow-500'
                      : order.status === 'shipped'
                      ? 'text-blue-500'
                      : order.status === 'delivered'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {order.status === 'pending'
                    ? 'Chờ xử lý'
                    : order.status === 'shipped'
                    ? 'Đang giao'
                    : order.status === 'delivered'
                    ? 'Đã giao'
                    : 'Đã hủy'}
                </span>
              </p>
              <p className="text-md text-gray-600 dark:text-gray-400">Email xác nhận: {order.email}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-luxuryBlack dark:text-luxuryWhite mb-4">Sản phẩm trong đơn hàng</h2>
            <div className="space-y-4">
              {order.products.map((item, index) => {
                const imageUrl = item.images[0] || `https://picsum.photos/80/80?blur=2&random=${index}`;
                return (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        onError={handleImageError}
                      />
                      <div>
                        <p className="font-medium text-luxuryBlack dark:text-luxuryWhite">{item.name} - {item.brand}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Số lượng: {item.quantity} | Giá: {item.price.toLocaleString('vi-VN')}₫
                        </p>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedSize && item.selectedColor && ' | '}
                            {item.selectedColor && `Màu: ${item.selectedColor}`}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 italic">
                            {item.description.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="font-medium text-luxuryBlack dark:text-luxuryWhite">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            <button
              onClick={() => navigate('/order-history')}
              className="px-8 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-xl hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Xem lịch sử đơn hàng
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;