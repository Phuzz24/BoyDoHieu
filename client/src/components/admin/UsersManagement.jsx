import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, User, Eye, Ban, Unlock, X } from 'lucide-react';
import Swal from 'sweetalert2'; // Nếu dùng cho block
import adminService from '../../services/adminService'; // FIX: Import adminService

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminService.getUsers(); // Giờ adminService defined
      setUsers(data.users || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Lỗi tải danh sách người dùng!');
      setLoading(false);
    }
  };

  const handleBlockUser = async (id) => {
    const result = await Swal.fire({
      title: 'Xác nhận block?',
      text: 'User này sẽ không thể đăng nhập.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Block',
      cancelButtonText: 'Hủy'
    });
    if (result.isConfirmed) {
      try {
        await adminService.updateUser(id, { status: 'blocked' });
        fetchUsers();
        Swal.fire('Blocked!', 'User đã bị block.', 'success');
      } catch (error) {
        Swal.fire('Lỗi!', 'Không thể block user.', 'error');
      }
    }
  };

  const handleUnblockUser = async (id) => {
    const result = await Swal.fire({
      title: 'Xác nhận unblock?',
      text: 'User sẽ có thể đăng nhập lại.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Unblock',
      cancelButtonText: 'Hủy'
    });
    if (result.isConfirmed) {
      try {
        await adminService.updateUser(id, { status: 'active' });
        fetchUsers();
        Swal.fire('Unblocked!', 'User đã được unblock.', 'success');
      } catch (error) {
        Swal.fire('Lỗi!', 'Không thể unblock user.', 'error');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo username/email..."
            className="bg-transparent outline-none w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Username</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Số đơn hàng</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Ngày tạo</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {user.status === 'blocked' ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">{user.orders || 0}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button onClick={() => setSelectedUser(user)} className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    {user.role !== 'admin' && (
                      <button 
                        onClick={() => user.status === 'active' ? handleBlockUser(user._id) : handleUnblockUser(user._id)}
                        className={`p-2 rounded-lg ${user.status === 'active' ? 'hover:bg-red-100 text-red-600' : 'hover:bg-green-100 text-green-600'}`}
                      >
                        {user.status === 'active' ? <Ban className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal chi tiết */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Chi tiết {selectedUser.username}</h3>
              <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={selectedUser.avatar} alt={selectedUser.username} className="w-16 h-16 rounded-full" />
                <div>
                  <p className="text-lg font-semibold">{selectedUser.username}</p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Họ tên:</strong> {selectedUser.fullName || 'Chưa cập nhật'}</p>
                  <p><strong>Giới tính:</strong> {selectedUser.gender || 'Chưa cập nhật'}</p>
                  <p><strong>SĐT:</strong> {selectedUser.phone || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${selectedUser.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{selectedUser.status || 'active'}</span></p>
                  <p><strong>Ngày tạo:</strong> {new Date(selectedUser.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedUser.orders || 0}</p>
                  <p className="text-sm text-gray-600">Đơn hàng</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedUser.favorites?.length || 0}</p>
                  <p className="text-sm text-gray-600">Yêu thích</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedUser.cart?.length || 0}</p>
                  <p className="text-sm text-gray-600">Giỏ hàng</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition">Đóng</button>
            </div>
          </div>
        </div>
      )}

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-20">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không tìm thấy người dùng</p>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;