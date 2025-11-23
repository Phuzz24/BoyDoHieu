// src/pages/SpaBookingForm.jsx – PHIÊN BẢN HOÀN HẢO NHỎ GỌN, ĐẸP, CHUYÊN NGHIỆP
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { createSpaBooking } from '../services/spaService';
import { ArrowLeft, Upload, Calendar, Clock } from 'lucide-react';

const services = [
  "Spa Giày Sneaker",
  "Spa Túi Xách Da",
  "Spa Giày Da Cao Cấp",
  "Spa Nón & Phụ Kiện"
];

const timeSlots = ["09:00 - 11:00", "14:00 - 16:00", "16:30 - 18:30"];

const SpaBookingForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    productName: '',        // THÊM TRƯỜNG MỚI
    service: '',
    date: '',
    timeSlot: '',
    note: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.service || !formData.date || !formData.timeSlot) {
      toast.error("Vui lòng điền đầy đủ các trường có *");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      images.forEach(img => data.append('images', img));

      await createSpaBooking(data);
      toast.success("Đặt lịch thành công! Admin sẽ liên hệ trong 5 phút");
      setFormData({...formData, productName: '', service: '', date: '', timeSlot: '', note: ''});
      setImages([]);
    } catch (err) {
      toast.error("Lỗi đặt lịch, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <a href="/spa" className="inline-flex items-center gap-2 text-luxuryGold hover:underline text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Quay lại trang Spa
        </a>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-luxuryGold to-amber-600 text-black py-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">ĐẶT LỊCH SPA</h1>
            <p className="text-sm mt-1 opacity-90">Đội ngũ sẽ gọi xác nhận ngay</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Họ tên & SĐT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Họ và tên *"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-luxuryGold focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Số điện thoại *"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-luxuryGold focus:outline-none"
                required
              />
            </div>

            {/* TÊN SẢN PHẨM – MỚI THÊM */}
            <input
              type="text"
              placeholder="Tên sản phẩm (VD: Jordan 1, LV Neverfull...) *"
              value={formData.productName}
              onChange={e => setFormData({...formData, productName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-luxuryGold focus:outline-none"
              required
            />

            {/* Dịch vụ – không hiện giá */}
            <select
              value={formData.service}
              onChange={e => setFormData({...formData, service: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-luxuryGold"
              required
            >
              <option value="">Chọn dịch vụ spa *</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Ngày & Giờ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-luxuryGold" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-luxuryGold"
                  required
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-luxuryGold" />
                <select
                  value={formData.timeSlot}
                  onChange={e => setFormData({...formData, timeSlot: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-luxuryGold"
                  required
                >
                  <option value="">Chọn khung giờ *</option>
                  {timeSlots.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Ghi chú */}
            <textarea
              placeholder="Ghi chú thêm (tình trạng, yêu cầu đặc biệt...)"
              rows="3"
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-luxuryGold resize-none"
            />

            {/* Upload ảnh */}
            <div className="border-2 border-dashed border-luxuryGold/40 rounded-xl p-8 text-center hover:border-luxuryGold transition">
              <Upload className="w-12 h-12 mx-auto text-luxuryGold mb-3" />
              <p className="font-medium text-luxuryGold">Click hoặc kéo thả ảnh sản phẩm</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setImages([...e.target.files])}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload" className="cursor-pointer text-sm text-gray-600 mt-2 block">
                {images.length > 0 ? `${images.length} ảnh đã chọn` : "Chưa có ảnh"}
              </label>
            </div>

            {/* Nút gửi */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-luxuryGold hover:bg-amber-600 text-black font-bold text-lg py-4 rounded-xl shadow-lg transition disabled:opacity-70"
            >
              {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU ĐẶT LỊCH"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpaBookingForm;