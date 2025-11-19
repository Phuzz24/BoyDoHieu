import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, loading: contextLoading, updateUser } = useAuth();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    gender: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    email: '',
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (contextLoading) return setLocalLoading(true);
    if (user === null) return setLocalLoading(true);
    if (!user) {
      toast.error('Vui lòng đăng nhập để xem thông tin tài khoản!');
      navigate('/login');
      return;
    }
    loadProfileData();
  }, [user, contextLoading, navigate]);

  const loadProfileData = async () => {
    setLocalLoading(true);
    try {
      setFormData({
        username: user.username || '',
        fullName: user.fullName || '',
        gender: user.gender || '',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        email: user.email || '',
        avatar: null,
      });
      setAvatarPreview(user.avatar || 'https://tse3.mm.bing.net/th/id/OIP.ujXKE1mONB_xfL7vwJUR3QHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3');
    } catch (error) {
      console.error('Error loading profile data:', error);
      toast.error('Lỗi khi tải thông tin tài khoản!');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn file ảnh!');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File ảnh quá lớn (tối đa 5MB)!');
        return;
      }
      setFormData((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      toast.error('Tên người dùng không được để trống!');
      return;
    }

    const submitData = new FormData();
    submitData.append('username', formData.username);
    submitData.append('fullName', formData.fullName);
    submitData.append('gender', formData.gender);
    submitData.append('phone', formData.phone);
    submitData.append('address', formData.address);
    submitData.append('dateOfBirth', formData.dateOfBirth);
    submitData.append('email', formData.email);
    if (formData.avatar instanceof File) {
      submitData.append('avatar', formData.avatar);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token hết hạn, vui lòng đăng nhập lại!');
        navigate('/login');
        return;
      }

      const response = await axios.put(
        `${API_URL}/auth/profile`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Cập nhật context user
      updateUser(response.data.user);
      toast.success('Cập nhật thông tin thành công!');
      
      // Reset: Đóng editing mode, reload data từ user mới, và force refresh UI
      setEditing(false);
      loadProfileData(); // Reload formData từ user mới (trigger useEffect nếu cần)
      
      // Soft reset UI (không hard reload trang để tránh mất state)
      // Nếu cần hard reset: window.location.reload(); nhưng tránh dùng
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error.message);
      if (error.response?.status >= 400) {
        toast.error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin tài khoản!');
      } else {
        toast.success('Cập nhật thành công!');
      }
    }
  };

  const handleCancel = () => {
    setEditing(false);
    loadProfileData(); // Reset form về data gốc
  };

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/60/60?blur=2&random=${Math.random()}`;
  };

  if (contextLoading || localLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    toast.error('Vui lòng đăng nhập!');
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header: Avatar & Welcome - Đơn giản */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 dark:border-gray-600 shadow-lg ring-4 ring-transparent"
              onError={handleImageError}
            />
            {editing && (
              <label className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-800 p-3 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-600">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5H3v-3.572L16.732 3.732z" />
                </svg>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Chào mừng, {formData.username}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Thành viên từ {new Date(user.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Chỉnh sửa thông tin
            </button>
          )}
        </div>

        {/* Personal Info - Icon, bold label, value thường */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            Thông tin cá nhân
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FaUser className="mt-1 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tên đầy đủ</label>
                {!editing ? (
                  <p className="text-gray-900 dark:text-white">{formData.fullName || 'Chưa cập nhật'}</p>
                ) : (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                    placeholder="Nhập tên đầy đủ"
                  />
                )}
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaVenusMars className="mt-1 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Giới tính</label>
                {!editing ? (
                  <p className="text-gray-900 dark:text-white capitalize">{formData.gender || 'Chưa cập nhật'}</p>
                ) : (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                )}
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaPhone className="mt-1 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Số điện thoại</label>
                {!editing ? (
                  <p className="text-gray-900 dark:text-white">{formData.phone || 'Chưa cập nhật'}</p>
                ) : (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                    placeholder="Nhập số điện thoại"
                  />
                )}
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaEnvelope className="mt-1 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                {!editing ? (
                  <p className="text-gray-900 dark:text-white">{formData.email || 'Chưa cập nhật'}</p>
                ) : (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                    placeholder="Nhập email"
                  />
                )}
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="mt-1 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Địa chỉ</label>
                {!editing ? (
                  <p className="text-gray-900 dark:text-white">{formData.address || 'Chưa cập nhật'}</p>
                ) : (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Nhập địa chỉ"
                  />
                )}
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaCalendarAlt className="mt-1 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Ngày sinh</label>
                {!editing ? (
                  <p className="text-gray-900 dark:text-white">
                    {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                  </p>
                ) : (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
            </div>
            {editing && (
              <div className="col-span-full">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Avatar (Upload mới)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hỗ trợ JPG, PNG (tối đa 5MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions - Đơn giản */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
          {!editing ? (
            <>
              <Link
                to="/order-history"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium text-center"
              >
                Lịch sử đơn hàng
              </Link>
              <button
                onClick={() => navigate('/change-password')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              >
                Đổi mật khẩu
              </button>
            </>
          ) : (
            <div className="flex justify-center space-x-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              >
                Lưu thay đổi
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium"
              >
                Hủy bỏ
              </button>
            </div>
          )}
        </div>

        {/* Admin Section - Giữ nếu cần */}
        {user.role === 'admin' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Quản trị viên</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Bạn có quyền truy cập bảng điều khiển.</p>
            <Link
              to="/admin-dashboard"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium text-center"
            >
              Truy cập Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;