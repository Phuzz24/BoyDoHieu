// src/components/admin/SpaManagement.jsx – ĐÃ FIX HOÀN HẢO, CHẠY NGON NGAY!!!
import React, { useEffect, useState } from 'react';
import { getSpaBookings, updateSpaBooking } from '../../services/spaService';
import { toast } from 'react-toastify';
import { Check, X, Clock, Package, DollarSign } from 'lucide-react';

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

const statusText = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  "in-progress": 'Đang làm',
  completed: 'Hoàn thành',
  rejected: 'Từ chối'
};

const SpaManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);

  // TÍNH SỐ LƯỢNG LỊCH CHỜ DUYỆT – ĐÃ FIX!!!
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  useEffect(() => {
    loadBookings();
    const interval = setInterval(loadBookings, 10000); // Tự động cập nhật mỗi 10s
    return () => clearInterval(interval);
  }, []);

  const loadBookings = async () => {
    try {
      const res = await getSpaBookings();
      setBookings(res.data || []);
    } catch (err) {
      console.error("Lỗi load bookings:", err);
      toast.error("Không tải được danh sách lịch spa");
    }
  };

  const updateStatus = async (id, status, price = null) => {
    try {
      await updateSpaBooking(id, { 
        status, 
        finalPrice: price || undefined,
        adminNote: status === 'rejected' ? 'Từ chối bởi admin' : undefined
      });
      toast.success("Cập nhật thành công!");
      loadBookings();
    } catch (err) {
      toast.error("Lỗi cập nhật trạng thái");
    }
  };

  return (
    <div className="space-y-8">
      {/* TIÊU ĐỀ + SỐ LƯỢNG MỚI – ĐÃ FIX pendingCount */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-luxuryGold flex items-center gap-4">
          Quản Lý Lịch Spa
          {pendingCount > 0 && (
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse">
              {pendingCount} lịch mới
            </span>
          )}
        </h2>
      </div>

      {/* DANH SÁCH LỊCH */}
      <div className="grid gap-6">
        {bookings.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-xl">
            Chưa có lịch spa nào
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-luxuryGold hover:shadow-2xl transition">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{booking.fullName}</h3>
                  <p className="text-lg text-gray-600">{booking.phone} • {booking.productName}</p>
                  <p className="text-gray-500">
                    {new Date(booking.date).toLocaleDateString('vi-VN')} • {booking.timeSlot} • {booking.service}
                  </p>
                </div>
                <span className={`px-6 py-3 rounded-full font-bold text-lg ${statusColors[booking.status]}`}>
                  {statusText[booking.status]}
                </span>
              </div>

              {booking.note && (
                <p className="text-gray-700 mb-6 italic bg-gray-50 p-4 rounded-xl">
                  Ghi chú: "{booking.note}"
                </p>
              )}

              {/* HIỂN THỊ GIÁ KHI HOÀN THÀNH */}
              {booking.status === 'completed' && booking.finalPrice && (
                <div className="bg-green-50 p-5 rounded-xl inline-flex items-center gap-3 mb-6">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">
                    {booking.finalPrice.toLocaleString()}₫
                  </span>
                </div>
              )}

              {/* NÚT HÀNH ĐỘNG */}
              <div className="flex flex-wrap gap-4 mt-8">
                {booking.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateStatus(booking._id, 'approved')}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-bold text-lg shadow-lg transition"
                    >
                      <Check className="w-6 h-6" /> Duyệt lịch
                    </button>
                    <button 
                      onClick={() => updateStatus(booking._id, 'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-bold text-lg shadow-lg transition"
                    >
                      <X className="w-6 h-6" /> Từ chối
                    </button>
                  </>
                )}
                {booking.status === 'approved' && (
                  <button 
                    onClick={() => updateStatus(booking._id, 'in-progress')}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-bold text-lg shadow-lg transition"
                  >
                    <Clock className="w-6 h-6" /> Bắt đầu làm
                  </button>
                )}
                {booking.status === 'in-progress' && (
                  <button 
                    onClick={() => {
                      const price = prompt("Nhập số tiền cuối cùng (VNĐ):", booking.finalPrice || "");
                      if (price && !isNaN(price)) {
                        updateStatus(booking._id, 'completed', Number(price));
                      }
                    }}
                    className="bg-luxuryGold hover:bg-amber-600 text-black px-10 py-5 rounded-xl flex items-center gap-4 font-bold text-xl shadow-xl transition transform hover:scale-105"
                  >
                    <Package className="w-7 h-7" /> Hoàn thành & Thu tiền
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SpaManagement;