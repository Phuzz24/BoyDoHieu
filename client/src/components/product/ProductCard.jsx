import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="bg-luxuryWhite shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl relative">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-luxuryGold text-luxuryBlack text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-elegant text-luxuryBlack group-hover:text-luxuryGold transition-colors duration-300">
            {product.name} - {product.brand}
          </h3>
          <p className="text-luxuryGold font-bold">${product.price}</p>
          <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.description.slice(0, 50)}...
          </p>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-luxuryGold text-luxuryBlack px-4 py-2 rounded-full font-bold hover:bg-luxuryWhite hover:text-luxuryGold transition-all duration-300">
            Xem chi tiết
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;