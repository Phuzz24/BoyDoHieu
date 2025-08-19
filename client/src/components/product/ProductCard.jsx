import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl relative border border-gray-100 dark:border-gray-700">
        {/* Ảnh sản phẩm */}
        <div className="relative overflow-hidden h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-luxuryGold text-luxuryBlack text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.discountPrice && (
            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </span>
          )}
          {/* Overlay nút yêu thích */}
          <button className="absolute top-2 right-2 text-gray-400 hover:text-luxuryGold transition-colors duration-300 opacity-0 group-hover:opacity-100">
            <FaHeart className="text-xl" />
          </button>
        </div>

        {/* Nội dung sản phẩm */}
        <div className="p-4">
          {/* Tên và brand */}
          <h3 className="text-lg font-elegant text-luxuryBlack dark:text-luxuryWhite group-hover:text-luxuryGold transition-colors duration-300 truncate">
            {product.name} - {product.brand}
          </h3>

          {/* Đánh giá */}
          <div className="flex items-center my-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < Math.floor(product.rating || 0)
                      ? 'text-luxuryGold'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ({product.numReviews || 0})
            </span>
          </div>

          {/* Giá */}
          <div className="flex items-center gap-2">
            <p className="text-luxuryGold font-bold text-lg">
              ${product.discountPrice || product.price}
            </p>
            {product.discountPrice && (
              <p className="text-gray-500 line-through text-sm">${product.price}</p>
            )}
          </div>

          {/* Mô tả ngắn */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.description?.slice(0, 50) || 'Sản phẩm cao cấp, sang trọng'}...
          </p>
        </div>

        {/* Nút CTA */}
        <div className="p-4 pt-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-luxuryGold text-luxuryBlack px-4 py-2 rounded-full font-bold hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 flex items-center gap-2">
            <FaShoppingCart /> Thêm vào giỏ
          </button>
          <button className="text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300">
            Xem chi tiết
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;