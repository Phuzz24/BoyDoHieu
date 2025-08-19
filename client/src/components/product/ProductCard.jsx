import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-luxuryWhite dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Ảnh sản phẩm */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-luxuryGold text-luxuryBlack text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            New
          </span>
        )}
        {product.discountPrice && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </span>
        )}
        {/* Nút yêu thích ở góc */}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-luxuryGold transition-colors duration-300">
          <FaHeart className="text-xl" />
        </button>
      </div>

      {/* Nội dung sản phẩm (hiển thị luôn) */}
      <div className="p-4">
        {/* Tên sản phẩm */}
        <h3 className="text-lg font-elegant text-luxuryBlack dark:text-luxuryWhite truncate hover:text-luxuryGold transition-colors duration-300">
          {product.name} - {product.brand}
        </h3>

        {/* Đánh giá */}
        <div className="flex items-center my-1">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.floor(product.rating || 0)
                    ? 'text-luxuryGold text-sm'
                    : 'text-gray-300 text-sm'
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Giá */}
        <div className="flex items-center gap-2 my-1">
          <p className="text-luxuryGold font-bold text-xl">
            ${product.discountPrice || product.price}
          </p>
          {product.discountPrice && (
            <p className="text-gray-500 line-through text-sm">${product.price}</p>
          )}
        </div>

        {/* Mô tả ngắn */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 my-2">
          {product.description?.slice(0, 50) || 'Sản phẩm cao cấp, sang trọng'}...
        </p>

        {/* Nút hành động */}
        <div className="flex justify-between items-center mt-4">
          <button className="bg-luxuryGold text-luxuryBlack px-4 py-2 rounded-full font-bold hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 flex items-center gap-2 text-sm">
            <FaShoppingCart /> Thêm vào giỏ
          </button>
          <Link to={`/product/${product._id}`} className="text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300 text-sm">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;