import React, { useState, useEffect } from 'react';
import { Bell, Plus, Check, Mail } from 'lucide-react';
import adminService from '../../services/adminService';
import Swal from 'sweetalert2';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSendForm, setShowSendForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '', type: 'system' });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await adminService.getNotifications();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await adminService.markRead(id);
      fetchNotifications();
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể đánh dấu đã đọc.', 'error');
    }
  };

  const markAllRead = async () => {
    try {
      await adminService.markAllRead();
      fetchNotifications();
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể đánh dấu tất cả.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.sendNotification(formData);
      Swal.fire('Thành công!', 'Thông báo đã được gửi.', 'success');
      setFormData({ title: '', message: '', type: 'system' });
      setShowSendForm(false);
      fetchNotifications();
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể gửi thông báo.', 'error');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Thông báo</h2>
        <button onClick={() => setShowSendForm(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Gửi mới
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Chưa đọc: {unreadCount}</p>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm text-blue-600 hover:underline">
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-y-auto max-h-96">
          {notifications.map((notif) => (
            <div key={notif._id} className={`flex items-start gap-3 p-4 border-b hover:bg-gray-50 ${notif.read ? 'opacity-60' : ''}`}>
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notif.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{notif.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(notif.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              {!notif.read && (
                <button onClick={() => markRead(notif._id)} className="text-sm text-blue-600 hover:underline">
                  Đánh dấu đã đọc
                </button>
              )}
            </div>
          ))}
        </div>
        {notifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Không có thông báo</p>
          </div>
        )}
      </div>

      {/* Send Form (modal) */}
      {showSendForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Gửi thông báo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tiêu đề"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <textarea
                placeholder="Nội dung"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full p-3 border rounded-lg"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="system">Hệ thống</option>
                <option value="order">Đơn hàng</option>
                <option value="stock">Tồn kho</option>
                <option value="user">Người dùng</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Gửi
                </button>
                <button type="button" onClick={() => setShowSendForm(false)} className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;