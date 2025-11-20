import React, { useState, useEffect } from 'react';
import { Eye, Filter, Calendar, Package, User, Phone, MapPin } from 'lucide-react';
import adminService from '../../services/adminService';
import socket from '../../services/socket'; // Đảm bảo import đúng
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // LẤY DANH SÁCH ĐƠN HÀNG
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminService.getOrders({ 
        status: statusFilter === 'all' ? null : statusFilter 
      });
      setOrders(data.orders || []);
    } catch (error) {
      toast.error('Lỗi tải đơn hàng');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  // REALTIME: Admin nhận cập nhật ngay khi có người đổi status
  useEffect(() => {
    socket.emit('joinAdminRoom'); // Join room admin

    socket.on('orderUpdated', ({ orderId, status }) => {
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
      toast.info(`Đơn hàng #${orderId.slice(-6)} đã chuyển sang: ${getStatusText(status)}`);
    });

    return () => {
      socket.off('orderUpdated');
    };
  }, []);

  // CẬP NHẬT TRẠNG THÁI
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      // Không cần fetch lại vì socket sẽ tự cập nhật
      toast.success('Cập nhật trạng thái thành công!');
    } catch (error) {
      toast.error('Cập nhật thất bại');
      console.error(error);
    }
  };

  // HIỂN THỊ TRẠNG THÁI
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      shipping: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Chờ xử lý',
      shipping: 'Đang giao',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Quản lý đơn hàng</h2>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="outline-none font-medium"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xử lý</option>
              <option value="shipping">Đang giao</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Mã đơn</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Khách hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày đặt</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Sản phẩm</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Tổng tiền</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 font-bold text-indigo-600">
                    {order.orderCode || 'ORD' + order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.fullName || order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.email || 'Không có email'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                      <Package className="w-4 h-4" />
                      {order.items || order.products?.length}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    {order.total.toLocaleString('vi-VN')}₫
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className={`px-4 py-2 rounded-full text-xs font-bold outline-none cursor-pointer transition-all ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="shipping">Đang giao</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2.5 hover:bg-indigo-100 rounded-lg transition-all text-indigo-600 hover:scale-110"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Chi Tiết Đơn Hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Chi tiết đơn hàng</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >&times;</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Mã đơn hàng</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {selectedOrder.orderCode || 'ORD' + selectedOrder._id.slice(-6).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <span className={`inline-block px-4 py-2 rounded-full font-bold ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">{selectedOrder.fullName}</p>
                      <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <p>{selectedOrder.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <p>{selectedOrder.address?.province}, {selectedOrder.address?.district}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Tổng thanh toán</p>
                  <p className="text-3xl font-bold text-green-600">
                    {selectedOrder.total.toLocaleString('vi-VN')}₫
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Sản phẩm</h4>
                <div className="space-y-3">
                  {selectedOrder.products?.map((item, idx) => {
                    const imageUrl = item.images?.[0] || '/placeholder-product.jpg'; // FIX: thêm fallback

                    return (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={imageUrl}
                            alt={item.name || 'Sản phẩm'}
                            className="w-16 h-16 object-cover rounded-lg border"
                            onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
                          />
                          <div>
                            <p className="font-medium">{item.name || 'Sản phẩm không tên'}</p>
                            <p className="text-sm text-gray-600">
                              x{item.quantity} | {item.price?.toLocaleString()}₫
                            </p>
                            {(item.selectedSize || item.selectedColor) && (
                              <p className="text-xs text-gray-500">
                                {item.selectedSize && `Size: ${item.selectedSize}`}
                                {item.selectedSize && item.selectedColor && ' | '}
                                {item.selectedColor && `Màu: ${item.selectedColor}`}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="font-bold text-green-600">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;