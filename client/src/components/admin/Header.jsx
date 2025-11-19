import React, { useState, useEffect } from 'react';
import { Bell, Search, X } from 'lucide-react';
import adminService from '../../services/adminService';
import Swal from 'sweetalert2';

const Header = ({ title, subtitle }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll 30s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await adminService.getNotifications();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
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

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <Search className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Tìm kiếm..." className="bg-transparent outline-none w-64" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b flex justify-between">
                  <h4 className="font-semibold">Thông báo ({unreadCount})</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-sm text-blue-600 hover:underline">
                      Đánh dấu tất cả đã đọc
                    </button>
                  )}
                </div>
                <div className="space-y-2 p-4">
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 text-center">Không có thông báo mới</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className="flex items-start gap-3 p-3 border-b last:border-b-0 hover:bg-gray-50 rounded cursor-pointer" onClick={() => markRead(notif._id)}>
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{notif.title}</p>
                          <p className="text-sm text-gray-600">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                        {!notif.read && <span className="text-xs text-blue-600">Mới</span>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">admin@fashion.com</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;