// src/components/admin/SettingsManagement.jsx
import React, { useState, useEffect } from 'react';
import { Save, Upload, Bell, Shield, Palette, Globe, Mail, Lock, Store } from 'lucide-react';
import { toast } from 'react-toastify';
import adminService from '../../services/adminService';

const SettingsManagement = () => {
  const [shopName, setShopName] = useState('Fashion Store');
  const [shopEmail, setShopEmail] = useState('admin@fashionstore.com');
  const [shopPhone, setShopPhone] = useState('0123 456 789');
  const [shopAddress, setShopAddress] = useState('Quận 1, TP.HCM');
  const [logo, setLogo] = useState('/logo.png');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [notifications, setNotifications] = useState(true);
  const [orderAlert, setOrderAlert] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load settings từ API (sau này sẽ có)
    const saved = localStorage.getItem('adminSettings');
    if (saved) {
      const settings = JSON.parse(saved);
      setShopName(settings.shopName || shopName);
      setShopEmail(settings.shopEmail || shopEmail);
      setShopPhone(settings.shopPhone || shopPhone);
      setShopAddress(settings.shopAddress || shopAddress);
      setPrimaryColor(settings.primaryColor || primaryColor);
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    const settings = {
      shopName,
      shopEmail,
      shopPhone,
      shopAddress,
      primaryColor,
      notifications,
      orderAlert
    };

    // Save to localStorage (sau này sẽ gọi API)
    localStorage.setItem('adminSettings', JSON.stringify(settings));

    setTimeout(() => {
      setLoading(false);
      toast.success('Cài đặt đã được lưu thành công!');
      
      // Apply theme color
      document.documentElement.style.setProperty('--primary-color', primaryColor);
    }, 800);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        toast.success('Logo đã được cập nhật!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cài đặt hệ thống</h2>
        <p className="text-gray-600">Quản lý thông tin cửa hàng, giao diện và thông báo</p>
      </div>

      {/* Thông tin cửa hàng */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Store className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold">Thông tin cửa hàng</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên cửa hàng</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Nhập tên cửa hàng"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email liên hệ</label>
            <input
              type="email"
              value={shopEmail}
              onChange={(e) => setShopEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="admin@shop.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
            <input
              type="text"
              value={shopPhone}
              onChange={(e) => setShopPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="0123 456 789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
            <input
              type="text"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Quận 1, TP.HCM"
            />
          </div>
        </div>
      </div>

      {/* Logo & Màu sắc */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold">Logo cửa hàng</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <label className="cursor-pointer">
              <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              <div className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Chọn ảnh mới
              </div>
            </label>
            <p className="text-sm text-gray-500 mt-2">Định dạng: PNG, JPG (tối đa 2MB)</p>
          </div>
        </div>

        {/* Màu chủ đạo */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-pink-600" />
            <h3 className="text-xl font-bold">Màu chủ đạo</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-20 h-20 rounded-lg cursor-pointer border-4 border-white shadow-lg"
              />
              <div>
                <p className="font-medium">Màu hiện tại</p>
                <p className="text-2xl font-bold">{primaryColor}</p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mt-6">
              {['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'].map(color => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className="w-full h-12 rounded-lg border-4 border-white shadow-md hover:scale-110 transition"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thông báo */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold">Cài đặt thông báo</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Thông báo tổng quát</p>
              <p className="text-sm text-gray-600">Nhận thông báo khi có sự kiện quan trọng</p>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Thông báo đơn hàng mới</p>
              <p className="text-sm text-gray-600">Ping khi có đơn hàng mới</p>
            </div>
            <input
              type="checkbox"
              checked={orderAlert}
              onChange={(e) => setOrderAlert(e.target.checked)}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Nút lưu */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition disabled:opacity-70"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}
        </button>
      </div>
    </div>
  );
};

export default SettingsManagement;