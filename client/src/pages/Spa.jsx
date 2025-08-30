import React, { useState } from "react";
import SpaFilterBar from "../components/spa/SpaFilterBar";
import SpaServiceCard from "../components/spa/SpaServiceCard";
import BookingForm from "../components/spa/BookingForm";

const spaServices = [
  {
    id: 1,
    name: "Làm sạch túi xách",
    category: "Túi",
    price: 300000,
    description: "Làm sạch và khử mùi túi xách cao cấp.",
    image: "/images/spa-bag.jpg",
  },
  {
    id: 2,
    name: "Tân trang giày sneaker",
    category: "Giày",
    price: 250000,
    description: "Tân trang và làm mới giày sneaker, da, vải,...",
    image: "/images/spa-shoes.jpg",
  },
  {
    id: 3,
    name: "Sửa dây nón hiệu",
    category: "Nón",
    price: 150000,
    description: "Thay/sửa dây và làm sạch nón thời trang.",
    image: "/images/spa-hat.jpg",
  },
];

const Spa = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices =
    selectedCategory === "Tất cả"
      ? spaServices
      : spaServices.filter((s) => s.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-luxuryGold">Dịch vụ Spa sản phẩm</h1>
      <SpaFilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredServices.map((service) => (
          <SpaServiceCard
            key={service.id}
            service={service}
            onBook={() => setSelectedService(service)}
          />
        ))}
      </div>

      {selectedService && (
        <BookingForm service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
};

export default Spa;
