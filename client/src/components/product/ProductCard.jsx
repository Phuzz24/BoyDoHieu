import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleAddToCartLogic } from '../../utils/cartUtils';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorite();
  const favorite = isFavorite(product._id);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const convertedProduct = {
      ...product,
      images: product.images || [product.image],
    };
    handleAddToCartLogic(convertedProduct, product.sizes?.[0], product.colors?.[0], addToCart);
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  const discountPercent =
    product.discountPrice &&
    Math.round(((product.price - product.discountPrice) / product.price) * 100);

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-luxuryWhite dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-luxuryGold text-luxuryBlack text-xs font-semibold px-3 py-1 rounded-full shadow">
            Mới
          </span>
        )}

        {discountPercent > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            -{discountPercent}%
          </span>
        )}

        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-2 right-2 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full text-gray-600 hover:text-red-500 transition-all duration-300"
        >
          <FaHeart className={`text-lg ${favorite ? 'text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-base font-medium text-gray-800 dark:text-white line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.brand}</p>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold text-red-600 dark:text-red-400">
            {(product.discountPrice || product.price || 0).toLocaleString('vi-VN')}₫
          </span>

          {product.discountPrice && product.price && (
            <span className="text-sm line-through text-gray-400 dark:text-gray-500">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
          {product.description?.slice(0, 80) || 'Sản phẩm cao cấp, sang trọng'}...
        </p>

        <div className="flex justify-between items-center">
          {isOutOfStock ? (
            <span className="text-red-600 font-semibold text-sm">Hết hàng</span>
          ) : (
            <button
              onClick={handleClick}
              className="bg-luxuryGold text-luxuryBlack px-4 py-2 rounded-full font-bold hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <FaShoppingCart /> Thêm vào giỏ
            </button>
          )}
          <Link
            to={`/product/${product._id}`}
            className="text-sm text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;