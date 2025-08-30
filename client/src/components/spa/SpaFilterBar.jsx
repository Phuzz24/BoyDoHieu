import React from "react";

const SpaFilterBar = ({ selectedCategory, onCategoryChange }) => {
  const categories = ["Tất cả", "Túi", "Giày", "Nón"];

  return (
    <div className="flex justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === category
              ? "bg-luxuryGold text-luxuryBlack"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } transition`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SpaFilterBar;
