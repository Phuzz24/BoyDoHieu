import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { FaStar, FaShareAlt, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useFavorite } from '../../context/FavoriteContext';
import { format } from 'date-fns';
import '../../styles/animation.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500 text-center">Có lỗi xảy ra, vui lòng thử lại.</div>;
    }
    return this.props.children;
  }
}

const ProductDetailView = ({ product, relatedProducts }) => {
  const [mainImage, setMainImage] = useState(product?.images?.[0] || '');
  const [zoomed, setZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [isFavoriteAnimating, setIsFavoriteAnimating] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite, favorites } = useFavorite();
  const [favorite, setFavorite] = useState(isFavorite(product?._id));
  const colorMap = {
  Black: '#000000',
  White: '#FFFFFF',
  Brown: '#8B4513',
  Silver: '#C0C0C0',
};

  useEffect(() => {
    setFavorite(isFavorite(product?._id)); // Sync với favorites
  }, [favorites, product?._id]);

  useEffect(() => {
    console.log('Product:', product);
    console.log('User:', user);
    console.log('Related Products:', relatedProducts);
  }, [product, user, relatedProducts]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!product?._id) throw new Error('Thiếu ID sản phẩm để lấy bình luận');
        const response = await axios.get(`${API_URL}/reviews/${product._id}`);
        console.log('Reviews response:', response.data);
        setReviews(
          response.data.map((r) => ({
            id: r._id,
            userId: r.userId,
            username: r.username || 'Khách hàng',
            avatar: r.avatar || 'https://tse3.mm.bing.net/th/id/OIP.ujXKE1mONB_xfL7vwJUR3QHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
            rating: r.rating,
            comment: r.comment,
            time: format(new Date(r.createdAt), 'dd/MM/yyyy HH:mm'),
          }))
        );
      } catch (error) {
        console.error('Lỗi khi lấy bình luận:', error);
        toast.error('Lỗi tải bình luận!', { position: 'top-right', autoClose: 3000 });
      }
    };
    if (product?._id) fetchReviews();
  }, [product?._id]);

  const handleAddComment = async (e) => {
  e.preventDefault();

  if (!user) {
    toast.error('Vui lòng đăng nhập để bình luận!', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }

  const commentTrimmed = newComment.trim();
  if (!commentTrimmed) {
    toast.error('Bình luận không được để trống!', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }

  if (!product || !product._id) {
    toast.error('Không tìm thấy sản phẩm để bình luận!', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }

  try {
    const newReview = {
      productId: product._id,
      comment: commentTrimmed,
      rating: newRating,
    };

    const response = await axios.post(`${API_URL}/reviews`, newReview, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log('Add review response:', response.data); // Debug API response

    const savedReview = response.data.review; // Lấy từ response
    if (!savedReview || !savedReview._id) {
      throw new Error('Dữ liệu bình luận trả về không hợp lệ');
    }

    // Thêm vào đầu danh sách để hiển thị ngay
    setReviews((prev) => [
      {
        id: savedReview._id,
        userId: savedReview.userId || user._id,
        username: savedReview.username || user.username || 'Khách hàng',
        avatar: savedReview.avatar || user.avatar || 'https://tse3.mm.bing.net/th/id/OIP.ujXKE1mONB_xfL7vwJUR3QHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        rating: savedReview.rating || newRating,
        comment: savedReview.comment || commentTrimmed,
        time: format(new Date(savedReview.createdAt || Date.now()), 'dd/MM/yyyy HH:mm'),
      },
      ...prev,
    ]);

    // Reset form
    setNewComment('');
    setNewRating(5);

    toast.success('Bình luận đã được gửi!', {
      position: 'top-right',
      autoClose: 3000,
    });
  } catch (error) {
    console.error('Lỗi khi gửi bình luận:', error);
    toast.error(`Gửi bình luận thất bại: ${error.message}`, {
      position: 'top-right',
      autoClose: 3000,
    });
  }
};

  const handleAddToCartClick = () => {
    if (!product?._id || !product?.name || !product?.brand || !product?.price) {
      toast.error('Dữ liệu sản phẩm không hợp lệ!', { position: 'top-right', autoClose: 3000 });
      return;
    }
    if (!selectedSize && product?.sizes?.length > 0) {
      toast.error('Vui lòng chọn kích thước!', { position: 'top-right', autoClose: 3000 });
      return;
    }
    if (!selectedColor && product?.colors?.length > 0) {
      toast.error('Vui lòng chọn màu sắc!', { position: 'top-right', autoClose: 3000 });
      return;
    }
    if ((product?.stock || 0) <= 0) {
      toast.error('Sản phẩm đã hết hàng!', { position: 'top-right', autoClose: 3000 });
      return;
    }
    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 400);
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
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`, { position: 'top-right', autoClose: 3000 });
  };

  const handleFavoriteClick = async () => {
  if (!user) {
    toast.error('Vui lòng đăng nhập để thêm vào yêu thích!', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }
  if (!product?._id) {
    toast.error('Không tìm thấy sản phẩm để thêm vào yêu thích!', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }
  setIsFavoriteAnimating(true);
  setTimeout(() => setIsFavoriteAnimating(false), 300);
  try {
    if (favorite) {
      await removeFromFavorites(product._id);
      setFavorite(false); // Update local state
    } else {
      await addToFavorites(product);
      setFavorite(true); // Update local state
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật yêu thích:', error);
    toast.error('Lỗi khi cập nhật yêu thích!', {
      position: 'top-right',
      autoClose: 3000,
    });
  }
};

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  if (!product) {
    return <div className="text-red-500 text-center">Không tìm thấy sản phẩm!</div>;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-luxuryGold">Trang chủ</Link> &gt;{' '}
          <Link to="/products" className="hover:text-luxuryGold">Sản phẩm</Link> &gt;{' '}
          <span className="text-gray-700 dark:text-gray-300 font-bold">{product.name || 'Sản phẩm'}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick();
                }}
                className={`absolute top-2 right-2 bg-white/80 dark:bg-gray-700/80 p-3 rounded-full text-gray-600 hover:text-red-500 transition-all duration-300 ${
                  isFavoriteAnimating ? 'heart-beat' : ''
                }`}
              >
                <FaHeart className={`text-xl ${favorite ? 'text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto py-4">
              {(product.images || []).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name || 'Sản phẩm'} ${index + 1}`}
                  className={`w-20 h-20 rounded-md cursor-pointer object-cover border-2 transition-all duration-300 transform ${
                    mainImage === img ? 'border-luxuryGold scale-105' : 'border-gray-200 hover:border-luxuryGold hover:scale-105'
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {zoomed && (
            <div
              onClick={() => setZoomed(false)}
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            >
              <img src={mainImage} className="max-h-[90vh] max-w-[90vw]" alt="Zoomed" />
            </div>
          )}

          <div className="flex flex-col bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md w-full md:w-3/4 h-auto md:h-[500px]">
            <h1 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-2">
              {product.name || 'Sản phẩm không tên'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Thương hiệu: {product.brand || 'Không rõ'}</p>
            <p className="text-luxuryGold font-bold text-2xl mb-4">
              {(product.discountPrice || product.price || 0).toLocaleString('vi-VN')}₫
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description || 'Không có mô tả'}</p>

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

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
              <Button
                onClick={handleAddToCartClick}
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-luxuryGold to-yellow-500 text-luxuryBlack hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 w-full sm:w-[220px] ${
                  isCartAnimating ? 'shake' : ''
                }`}
              >
                <FaShoppingCart />
                Thêm vào giỏ hàng
              </Button>

              <button
                onClick={handleFavoriteClick}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-luxuryGold text-luxuryGold hover:bg-luxuryGold hover:text-luxuryBlack transition-all duration-300 w-full sm:w-[180px] ${
                  isFavoriteAnimating ? 'heart-beat' : ''
                }`}
              >
                <FaHeart className={favorite ? 'text-red-500' : 'text-luxuryGold'} />
                {favorite ? 'Bỏ yêu thích' : 'Yêu thích'}
              </button>

              {navigator.share && (
                <button
                  onClick={() =>
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href,
                    })
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-luxuryGold text-luxuryGold hover:bg-luxuryGold hover:text-luxuryBlack transition-all duration-300 w-full sm:w-[180px]"
                >
                  <FaShareAlt />
                  Chia sẻ sản phẩm
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Thêm bình luận của bạn</h3>
          {user ? (
            <form onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4 bg-luxuryWhite dark:bg-gray-700 dark:text-luxuryWhite animate-fade-in"
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
                  <option key={r} value={r}>
                    {r} sao
                  </option>
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

        <div className="mt-8 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Đánh giá sản phẩm</h2>
          {reviews.length > 0 ? (
            <>
              {reviews.slice(0, visibleReviews).map((review) => (
                <div key={review.id} className="border-b py-4 flex gap-4 animate-fade-in">
                  <img
                    src={review.avatar || 'https://tse3.mm.bing.net/th/id/OIP.ujXKE1mONB_xfL7vwJUR3QHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3'}
                    alt={review.username || 'Khách hàng'}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-sm ${i < review.rating ? 'text-luxuryGold' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 font-bold text-luxuryBlack dark:text-luxuryWhite">
                        {review.username || 'Khách hàng'}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    <p className="text-sm text-gray-400">{review.time}</p>
                  </div>
                </div>
              ))}
              {visibleReviews < reviews.length && (
                <Button onClick={loadMoreReviews} className="mt-4">
                  Xem thêm
                </Button>
              )}
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Chưa có đánh giá nào.</p>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts?.length > 0 ? (
              relatedProducts.map((related) => (
                <ProductCard key={related._id} product={related} />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">Không có sản phẩm liên quan.</p>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetailView;