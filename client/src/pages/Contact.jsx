import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaFacebook, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const API_URL = 'http://localhost:5000/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setFormLoading(true);
    try {
      await axios.post(`${API_URL}/contact`, formData); // Giả sử backend có /api/contact
      toast.success('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Lỗi gửi tin nhắn, vui lòng thử lại!');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-16 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Bạn có câu hỏi nào? Chúng tôi luôn sẵn sàng hỗ trợ để mang đến trải nghiệm mua sắm tốt nhất.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {/* Facebook */}
          <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaFacebook className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Facebook</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">Nhắn tin ngay để được tư vấn</p>
            <Link
              to="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Gửi tin nhắn
            </Link>
          </div>

          {/* Zalo */}
          <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaPhoneAlt className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Zalo</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">Gọi ngay: +84 123 456 789</p>
            <Link
              to="https://zalo.me/yourzalonumber"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
            >
              Kết nối Zalo
            </Link>
          </div>

          {/* Email */}
          <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">contact@boydohieu.com</p>
            <a
              href="mailto:contact@boydohieu.com"
              className="block w-full text-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300 font-medium"
            >
              Gửi email
            </a>
          </div>

          {/* Giờ Làm Việc */}
          <div className="md:col-span-2 lg:col-span-1 group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <FaClock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Giờ Làm Việc</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-center">
              <li>Thứ 2 - Thứ 6: 8:00 - 17:00</li>
              <li>Thứ 7: 9:00 - 16:00</li>
              <li>Chủ Nhật: Nghỉ</li>
            </ul>
          </div>
        </div>

        {/* Địa Chỉ & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              Địa Chỉ Cửa Hàng
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p><strong>123 Đường ABC,</strong> Quận XYZ, TP. Hồ Chí Minh</p>
              <p><strong>SĐT:</strong> +84 123 456 789</p>
              <p><strong>Email:</strong> contact@boydohieu.com</p>
            </div>
          </div>

          {/* Map Placeholder (thay bằng Google Maps iframe nếu có API key) */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5!2d106.699!3d10.776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38!2zMTIzIEjGsCBow6Bow7ZuZyBBQkMsIFRow6BuaCBQaOG7kSDGsG5hLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1690000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Địa chỉ cửa hàng"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;