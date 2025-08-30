import React, { useState } from "react";

const BookingForm = ({ service, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Có thể gửi dữ liệu đến backend tại đây
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-luxuryBlack">
          Đặt lịch: {service.name}
        </h2>
        {submitted ? (
          <p className="text-green-600 text-center font-semibold">
            Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <textarea
              placeholder="Ghi chú thêm (nếu có)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-luxuryGold text-luxuryBlack py-2 rounded-full font-bold hover:bg-luxuryBlack hover:text-white transition"
            >
              Gửi yêu cầu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
