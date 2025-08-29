import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Giả lập hook kiểm tra đăng nhập
const useAuth = () => {
  // Thay bằng hook đăng nhập thực tế của bạn
  return { isAuthenticated: false, user: null }; // false để test, thay true nếu đã đăng nhập
};

const ProductDetailView = ({ product, relatedProducts, onAddToCart }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [reviews, setReviews] = useState(product.reviews);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const { isAuthenticated, user } = useAuth();

  const colorMap = {
    Black: '#000000',
    White: '#FFFFFF',
    Brown: '#8B4513',
    Silver: '#C0C0C0',
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để bình luận!');
      return;
    }
    if (newComment.trim()) {
      const newReview = {
        id: reviews.length + 1,
        user: user?.name || 'Khách hàng',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Khách hàng')}`,
        rating: newRating,
        comment: newComment,
        time: new Date().toLocaleString('vi-VN'),
      };
      setReviews([...reviews, newReview]);
      setNewComment('');
      setNewRating(5);
      toast.success('Bình luận đã được gửi!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gallery ảnh */}
        <div>
          <div className="relative mb-4 overflow-hidden rounded-lg shadow-lg group">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ maxHeight: '500px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex gap-2 overflow-x-auto py-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} - ${index + 1}`}
                className={`w-20 h-20 rounded-md cursor-pointer object-cover border-2 transition-all duration-300 ${
                  mainImage === img ? 'border-luxuryGold scale-105' : 'border-gray-200 hover:border-luxuryGold hover:scale-105'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-4">{product.name} - {product.brand}</h1>
          <p className="text-luxuryGold font-bold text-2xl mb-4">${product.discountPrice || product.price}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>

          {/* Chọn kích thước */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-luxuryBlack dark:text-luxuryWhite">Kích thước:</label>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
                    selectedSize === size
                      ? 'bg-luxuryGold text-luxuryBlack border-luxuryGold'
                      : 'bg-luxuryWhite text-luxuryBlack border-gray-300 dark:bg-gray-700 dark:text-luxuryWhite dark:border-gray-600 hover:bg-luxuryGold hover:text-luxuryBlack hover:border-luxuryGold'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn màu sắc */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-luxuryBlack dark:text-luxuryWhite">Màu sắc:</label>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                    selectedColor === color ? 'border-luxuryGold scale-110' : 'border-gray-200 hover:border-luxuryGold hover:scale-110'
                  }`}
                  style={{ backgroundColor: colorMap[color] || '#000000' }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Còn lại: {product.stock} sản phẩm</p>
          <Button
            onClick={onAddToCart}
            className="bg-gradient-gold text-luxuryBlack hover:bg-luxuryBlack hover:text-luxuryWhite"
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>

      {/* Phần đánh giá */}
      <div className="mt-12 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Đánh giá sản phẩm</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b py-4 flex gap-4">
              <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full shadow-sm" />
              <div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-sm ${i < review.rating ? 'text-luxuryGold' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-bold text-luxuryBlack dark:text-luxuryWhite">{review.user}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{review.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">Chưa có đánh giá nào.</p>
        )}
      </div>

      {/* Form thêm bình luận */}
      <div className="mt-8 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Thêm bình luận của bạn</h3>
        {isAuthenticated ? (
          <form onSubmit={handleAddComment}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-luxuryBlack dark:text-luxuryWhite">Bình luận:</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-luxuryGold bg-luxuryWhite dark:bg-gray-700 dark:text-luxuryWhite transition-all duration-300"
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-luxuryBlack dark:text-luxuryWhite">Đánh giá:</label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(parseInt(e.target.value))}
                className="border rounded-lg px-4 py-2 bg-luxuryWhite dark:bg-gray-700 dark:text-luxuryWhite focus:outline-none focus:border-luxuryGold"
              >
                <option value={5}>5 sao</option>
                <option value={4}>4 sao</option>
                <option value={3}>3 sao</option>
                <option value={2}>2 sao</option>
                <option value={1}>1 sao</option>
              </select>
            </div>
            <Button type="submit" className="bg-gradient-gold text-luxuryBlack hover:bg-luxuryBlack hover:text-luxuryWhite">
              Gửi bình luận
            </Button>
          </form>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Vui lòng <Link to="/login" className="text-luxuryGold hover:underline">đăng nhập</Link> để bình luận.
          </p>
        )}
      </div>

      {/* Sản phẩm liên quan */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((related) => (
              <ProductCard key={related._id} product={related} />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Không có sản phẩm liên quan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;