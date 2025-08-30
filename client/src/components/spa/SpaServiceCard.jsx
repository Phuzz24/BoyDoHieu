import React from "react";

const SpaServiceCard = ({ service, onBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
        <p className="text-gray-500 mb-2">{service.description}</p>
        <p className="text-luxuryGold font-semibold mb-4">
          {service.price.toLocaleString("vi-VN")}₫
        </p>
        <button
          onClick={onBook}
          className="w-full bg-luxuryGold text-luxuryBlack py-2 px-4 rounded-full font-semibold hover:bg-luxuryBlack hover:text-white transition"
        >
          Đặt lịch ngay
        </button>
      </div>
    </div>
  );
};

export default SpaServiceCard;
