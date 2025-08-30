import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import useAuth from '../../hooks/useAuth';
import { FaShareAlt } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';



const ProductDetailView = ({ product, relatedProducts }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0] || '');
  const [zoomed, setZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [reviews, setReviews] = useState(product.reviews || []);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const colorMap = {
    Black: '#000000',
    White: '#FFFFFF',
    Brown: '#8B4513',
    Silver: '#C0C0C0',
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) {
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

  const handleAddToCartClick = () => {
    if (!product._id || !product.name || !product.brand || !product.price) {
      toast.error('Dữ liệu sản phẩm không hợp lệ!');
      return;
    }
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error('Vui lòng chọn kích thước!');
      return;
    }
    if (!selectedColor && product.colors?.length > 0) {
      toast.error('Vui lòng chọn màu sắc!');
      return;
    }
    if ((product.stock || 0) <= 0) {
      toast.error('Sản phẩm đã hết hàng!');
      return;
    }
    const cartItem = {
      _id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      discountPrice: product.discountPrice || null,
      images: product.images || [],
      selectedSize: selectedSize || null,
      selectedColor: selectedColor || null,
    };
    addToCart(cartItem);
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-luxuryGold">Trang chủ</Link> &gt;{" "}
        <Link to="/products" className="hover:text-luxuryGold">Sản phẩm</Link> &gt;{" "}
        <span className="text-gray-700 dark:text-gray-300 font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col">
          <div
            className="relative overflow-hidden rounded-lg shadow-lg group cursor-zoom-in"
            onClick={() => setZoomed(true)}
          >
            <img
              src={mainImage}
              alt={product.name || 'Sản phẩm'}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-4">
            {(product.images || []).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`w-20 h-20 rounded-md cursor-pointer object-cover border-2 transition-all duration-300 transform ${
                  mainImage === img ? 'border-luxuryGold scale-105' : 'border-gray-200 hover:border-luxuryGold hover:scale-105'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Zoom ảnh toàn màn hình */}
        {zoomed && (
          <div
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          >
            <img src={mainImage} className="max-h-[90vh] max-w-[90vw]" alt="Zoomed" />
          </div>
        )}

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md w-3/4 h-[500px]">
          <h1 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-2">
            {product.name || 'Sản phẩm không tên'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Thương hiệu: {product.brand || 'Không rõ'}</p>
          <p className="text-luxuryGold font-bold text-2xl mb-4">
            {(product.discountPrice || product.price || 0).toLocaleString('vi-VN')}₫
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description || 'Không có mô tả'}</p>

          {/* Kích thước */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-luxuryBlack dark:text-luxuryWhite">Kích thước:</label>
            <div className="flex gap-2 flex-wrap">
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedSize === size
                      ? 'bg-luxuryGold text-luxuryBlack border-luxuryGold'
                      : 'bg-luxuryWhite text-luxuryBlack border-gray-300 dark:bg-gray-700 dark:text-luxuryWhite'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Màu sắc */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-luxuryBlack dark:text-luxuryWhite">Màu sắc:</label>
            <div className="flex gap-2">
              {(product.colors || []).map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-300 transform hover:scale-110 ${
                    selectedColor === color ? 'border-luxuryGold scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: colorMap[color] || color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Còn lại: {product.stock || 0} sản phẩm</p>

          <Button
              onClick={handleAddToCartClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-luxuryGold to-yellow-500 text-luxuryBlack hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 w-[220px]"
            >
              <FaShoppingCart />
              Thêm vào giỏ hàng
            </Button>



          {/* Nút chia sẻ */}
         {navigator.share && (
          <button
            onClick={() =>
              navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
              })
            }
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-luxuryGold text-luxuryGold hover:bg-luxuryGold hover:text-white transition-all duration-300 w-[180px]"
          >
            <FaShareAlt />
            Chia sẻ sản phẩm
          </button>
        )}

        </div>
      </div>

      {/* Form bình luận */}
      <div className="mt-12 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Thêm bình luận của bạn</h3>
        {user ? (
          <form onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 bg-luxuryWhite dark:bg-gray-700 dark:text-luxuryWhite"
              rows={4}
              placeholder="Viết bình luận..."
              required
            />
            <select
              value={newRating}
              onChange={(e) => setNewRating(parseInt(e.target.value))}
              className="border rounded-lg px-4 py-2 mb-4 bg-luxuryWhite dark:bg-gray-700 dark:text-luxuryWhite"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} sao</option>
              ))}
            </select>
            <Button type="submit">Gửi bình luận</Button>
          </form>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Vui lòng <Link to="/login" className="text-luxuryGold underline">đăng nhập</Link> để bình luận.
          </p>
        )}
      </div>

      {/* Đánh giá hiện có */}
      <div className="mt-8 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Đánh giá sản phẩm</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b py-4 flex gap-4">
              <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full" />
              <div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-sm ${i < review.rating ? 'text-luxuryGold' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-bold text-luxuryBlack dark:text-luxuryWhite">{review.user}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                <p className="text-sm text-gray-400">{review.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">Chưa có đánh giá nào.</p>
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
