import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import socket from '../services/socket';
import Modal from '../components/common/Modal';
import Swal from 'sweetalert2';

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);  // NEW: Filtered list
  const [productsMap, setProductsMap] = useState(new Map());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');  // NEW: Filter status
  const [minPrice, setMinPrice] = useState('');  // NEW: Min total
  const [maxPrice, setMaxPrice] = useState('');  // NEW: Max total
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (user === null) return;
    if (!user) {
      toast.error('Vui lòng đăng nhập để xem lịch sử đơn hàng!');
      navigate('/login');
      return;
    }
    loadData();
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      socket.on('orderStatusUpdate', (data) => {
        toast.info(data.message || 'Trạng thái đơn hàng đã thay đổi!');
        loadData();
      });
      return () => socket.off('orderStatusUpdate', loadData);
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`${API_URL}/orders/user`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setOrders(ordersRes.data);
      setFilteredOrders(ordersRes.data);  // Initial filtered = all
      const map = new Map();
      productsRes.data.forEach((p) => map.set(p._id.toString(), p));
      setProductsMap(map);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Lỗi khi tải dữ liệu đơn hàng hoặc sản phẩm!');
    } finally {
      setLoading(false);
    }
  };

  // NEW: Filter orders by status & price when change
  useEffect(() => {
    let filtered = orders;
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;
    filtered = filtered.filter(order => order.total >= min && order.total <= max);
    setFilteredOrders(filtered);
  }, [statusFilter, minPrice, maxPrice, orders]);

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
    if (!id) return '/placeholder-product.jpg';
    const full = map.get(id);
    return full?.images?.[0] || '/placeholder-product.jpg';
  };

  const handleImageError = (e) => {
    e.target.src = '/placeholder-product.jpg';
  };

  const fetchOrderDetails = async (orderId) => {
    setDetailLoading(true);
    try {
      const token = localStorage.getItem('token');
      const orderRes = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orderData = orderRes.data;

      const populatedProducts = orderData.products.map((item) => {
        const id = getProductId(item);
        const full = id ? productsMap.get(id) : null;
        const imageUrl = getProductImage(item, productsMap);
        return {
          ...item,
          images: [imageUrl],
          name: full?.name || item.name || 'Sản phẩm không xác định',
          brand: full?.brand || item.brand || 'Không rõ',
          description: full?.description || item.description || '',
        };
      });

      setSelectedOrder({
        ...orderData,
        products: populatedProducts,
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Lỗi khi lấy chi tiết đơn hàng!');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Xác nhận hủy đơn hàng?',
      text: 'Hành động này không thể hoàn tác. Bạn có chắc?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Hủy đơn hàng',
      cancelButtonText: 'Giữ nguyên'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/orders/${orderId}/cancel`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Hủy đơn hàng thành công!');
        loadData();
        setSelectedOrder(null);
      } catch (error) {
        console.error('Error cancelling order:', error);
        toast.error(error.response?.data?.message || 'Lỗi hủy đơn hàng!');
      }
    }
  };

  const getStatusSteps = (status) => {
  const statuses = [
    { name: 'Chờ xử lý', color: 'bg-yellow-500 text-yellow-600 border-yellow-400' },
    { name: 'Đang giao', color: 'bg-blue-500 text-blue-600 border-blue-400' },
    { name: 'Đã giao', color: 'bg-green-500 text-green-600 border-green-400' },
    { name: 'Đã hủy', color: 'bg-red-500 text-red-600 border-red-400' },
  ];
  return statuses.map((step, index) => ({
    ...step,
    completed: ['pending', 'shipping', 'completed', 'cancelled'].indexOf(status) >= index && index < 3,
    isCancelled: status === 'cancelled' && index === 3
  }));
};

 const getStatusText = (status) => {
  switch (status) {
    case 'pending':   return 'Chờ xử lý';
    case 'shipping':  return 'Đang giao';       // ĐÚNG KEY
    case 'completed': return 'Đã giao';         // ĐÚNG KEY
    case 'cancelled': return 'Đã hủy';          // ĐÚNG KEY (2 chữ 'l')
    default:          return 'Không xác định';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':   return 'text-yellow-600 bg-yellow-100';
    case 'shipping':  return 'text-blue-600 bg-blue-100';
    case 'completed': return 'text-green-600 bg-green-100';
    case 'cancelled': return 'text-red-600 bg-red-100';
    default:          return 'text-gray-600 bg-gray-100';
  }
};

const getStatusBadge = (status) => {
  const text = getStatusText(status);
  const colorClass = getStatusColor(status);
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}>
      {text}
    </span>
  );
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
        <p className="text-xl text-gray-600 dark:text-gray-400 animate-pulse">Đang tải lịch sử đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-luxuryBlack dark:text-luxuryWhite mb-12 text-center tracking-tight animate-fade-in">
          Lịch sử đơn hàng
        </h1>
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-luxuryGold/20 dark:border-luxuryBlack/20 transform transition-all duration-500 hover:shadow-3xl">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Bạn chưa có đơn hàng nào!</p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-xl hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-luxuryGold/20 dark:border-luxuryBlack/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <p className="text-lg font-semibold text-luxuryBlack dark:text-luxuryWhite mb-3">
                      Mã đơn hàng: <span className="text-luxuryGold">{order.orderCode || order._id.slice(-6)}</span>
                    </p>
                    {getStatusBadge(order.status)}
                    <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                      Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                      Địa chỉ: {order.address?.province}, {order.address?.district}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                      Tổng tiền: <span className="font-semibold text-luxuryGold">{order.total.toLocaleString('vi-VN')}₫</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-md font-semibold text-luxuryBlack dark:text-luxuryWhite mb-3">Trạng thái đơn hàng</p>
                    <div className="flex items-center space-x-4">
                      {getStatusSteps(order.status).map((step, index) => (
                        <div key={index} className="flex-1 text-center">
                          <div className={`h-2 rounded-full ${
                            step.isCancelled ? 'bg-red-500' : 
                            step.completed ? 'bg-luxuryGold' : 'bg-gray-300 dark:bg-gray-600'
                          }`}></div>
                          <p className={`text-sm mt-2 ${
                            step.isCancelled ? 'text-red-600 font-bold' :
                            step.completed ? 'text-luxuryGold font-semibold' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {step.name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => fetchOrderDetails(order._id)}
                      disabled={detailLoading}
                      className="mt-4 w-full px-6 py-2 bg-luxuryGold text-luxuryBlack rounded-xl hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {detailLoading ? 'Đang tải...' : 'Xem chi tiết'}
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-md font-semibold text-luxuryBlack dark:text-luxuryWhite mb-3">Sản phẩm:</p>
                  <div className="space-y-3">
                    {order.products.map((item, index) => {
                      const imageUrl = getProductImage(item, productsMap); // FIX: Function chung
                      return (
                        <div key={index} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-3">
                            <img
                              src={imageUrl}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md shadow-sm border border-gray-200 dark:border-gray-600"
                              onError={handleImageError}
                            />
                            <div>
                              <p>{item.name || 'Sản phẩm'} - {item.brand || 'Không rõ'} (x{item.quantity})</p>
                              {(item.selectedSize || item.selectedColor) && (
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                  {item.selectedSize && `Size: ${item.selectedSize}`}
                                  {item.selectedSize && item.selectedColor && ' | '}
                                  {item.selectedColor && `Màu: ${item.selectedColor}`}
                                </p>
                              )}
                              {item.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 italic">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <p>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Chi tiết đơn hàng"
        className="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
      >
        {detailLoading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-lg text-gray-600 dark:text-gray-400">Đang tải chi tiết...</p>
          </div>
        ) : selectedOrder ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-semibold text-luxuryBlack dark:text-luxuryWhite mb-3">
                  Mã đơn hàng: <span className="text-luxuryGold">{selectedOrder.orderCode || selectedOrder._id.slice(-6)}</span>
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                  Ngày đặt: {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                  Địa chỉ giao hàng: {selectedOrder.address.province}, {selectedOrder.address.district}
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  Phương thức thanh toán: Thanh toán khi nhận hàng (COD)
                </p>
              </div>
              <div>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                  Tổng tiền: <span className="font-semibold text-luxuryGold">{selectedOrder.total.toLocaleString('vi-VN')}₫</span>
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                    Trạng thái: {getStatusBadge(selectedOrder.status)}
                </p>
                {/* FIX: Hiển thị lý do hủy nếu có (thêm field canceledReason ở BE nếu chưa) */}
                {selectedOrder.status === 'canceled' && selectedOrder.canceledReason && (
                  <p className="text-sm text-red-500 dark:text-red-400">
                    Lý do hủy: {selectedOrder.canceledReason}
                  </p>
                )}
                <p className="text-md text-gray-600 dark:text-gray-400">Email xác nhận: {selectedOrder.email}</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-luxuryBlack dark:text-luxuryWhite mb-4">Sản phẩm trong đơn hàng</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {selectedOrder.products.map((item, index) => {
                  // FIX: Dùng getProductImage cho ảnh đúng trong modal
                  const imageUrl = getProductImage(item, productsMap);
                  return (
                    <div key={index} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                          onError={handleImageError}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-luxuryBlack dark:text-luxuryWhite break-words">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Số lượng: {item.quantity} | Giá: {item.price.toLocaleString('vi-VN')}₫
                          </p>
                          {(item.selectedSize || item.selectedColor) && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                              {item.selectedSize && item.selectedColor && ' | '}
                              {item.selectedColor && `Màu: ${item.selectedColor}`}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 italic break-words">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="font-medium text-luxuryBlack dark:text-luxuryWhite min-w-0">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* THÊM: Cancel button nếu pending */}
            {selectedOrder.status === 'pending' && (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleCancelOrder(selectedOrder._id)}
                  className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-700 transition-all duration-300"
                >
                  Hủy đơn hàng
                </button>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all duration-300"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default OrderHistory;