// src/pages/SpaLanding.jsx – PHIÊN BẢN ĐÃ CHỈNH SIZE CHUẨN 100%
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Camera, Package, Clock, ShieldCheck, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

const SpaLanding = () => {
  const steps = [
    { icon: Camera, title: "Tiếp nhận & chụp ảnh", desc: "Kiểm tra kỹ tình trạng sản phẩm" },
    { icon: Sparkles, title: "Làm sạch & phục hồi", desc: "Tẩy ố, dưỡng da, khử mùi, đánh bóng" },
    { icon: Package, title: "Đóng gói cao cấp", desc: "Đóng gói như mới + giấy bảo hành" },
    { icon: Clock, title: "Thông báo hoàn thành", desc: "Gọi điện + tin nhắn khi xong" },
    { icon: ShieldCheck, title: "Bàn giao & thu phí", desc: "Chỉ thu tiền khi khách ưng ý 100%" }
  ];

  return (
    <>
      {/* HERO – ĐÃ GIẢM SIZE */}
      <section className="relative min-h-screen bg-black text-white flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/50 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('/images/spa-hero.jpg')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-luxuryGold via-amber-300 to-luxuryGold bg-clip-text text-transparent">
              SPA GIÀY & TÚI XÁCH
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-amber-100 max-w-3xl mx-auto">
              Mang sản phẩm yêu thích của bạn trở lại thời hoàng kim
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["Thủ công 100%", "Nguyên liệu nhập khẩu", "Bảo hành 6 tháng", "Thu tiền sau khi ưng ý"].map((item) => (
                <span key={item} className="bg-luxuryGold/20 border border-luxuryGold/50 px-4 py-2 rounded-full text-sm flex items-center gap-2 backdrop-blur">
                  <CheckCircle2 className="w-4 h-4" />
                  {item}
                </span>
              ))}
            </div>

            <Link to="/spa-booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-luxuryGold hover:bg-amber-500 text-black font-bold text-lg sm:text-xl px-10 sm:px-14 py-4 sm:py-5 rounded-xl shadow-xl flex items-center gap-3 mx-auto"
              >
                <Calendar className="w-6 h-6" />
                ĐẶT LỊCH SPA NGAY
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* QUY TRÌNH 5 BƯỚC – ĐÃ GIẢM SIZE */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
            Quy trình Spa tiêu chuẩn 7 sao
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-luxuryGold transition-all">
                  <step.icon className="w-10 h-10 text-luxuryGold hover:text-white transition-all" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 px-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA CUỐI – ĐÃ GIẢM SIZE */}
      <section className="py-16 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Sẵn sàng để sản phẩm của bạn tỏa sáng?
          </h2>
          <p className="text-lg sm:text-xl text-amber-200 mb-10 max-w-2xl mx-auto">
            Hơn 5000+ khách hàng đã tin tưởng – Đến lượt bạn!
          </p>
          <Link to="/spa-booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-luxuryGold hover:bg-amber-400 text-black font-bold text-xl sm:text-2xl px-12 sm:px-16 py-5 sm:py-6 rounded-xl shadow-2xl"
            >
              ĐẶT LỊCH MIỄN PHÍ TƯ VẤN
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SpaLanding;