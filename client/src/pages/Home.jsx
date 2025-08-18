import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ProductCarousel from '../components/product/ProductCarousel';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import { getProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Cài react-icons nếu cần: npm install react-icons

// Dummy hero slides (thay bằng hình thật từ assets)
const heroSlides = [
  {
    image: 'https://ecommerce-uikit.netlify.app/images/banners/main-fashion.png',
    title: 'Bộ Sưu Tập Gucci Mới Nhất',
    subtitle: 'Khám phá sự sang trọng đỉnh cao',
    buttonText: 'Xem Ngay',
    link: '/products/gucci',
  },
  {
    image: 'https://th.bing.com/th/id/R.65a229ec207cf42838f3e9813f64ab8b?rik=xwkRqx3fh1UWGQ&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20118%2f609%2fw2048h961%2f20201115%2f5930-kcysmrv6605696.jpg&ehk=NaJ%2bKTgSBu6E95P7Xp%2b2GP4cN%2bVPAuJT91Yot6y3KuI%3d&risl=&pid=ImgRaw&r=0',
    title: 'Burberry - Biểu Tượng Thời Trang',
    subtitle: 'Áo khoác, túi xách cao cấp',
    buttonText: 'Khám Phá',
    link: '/products/burberry',
  },
  {
    image: 'https://media.wonderlandmagazine.com/uploads/2023/06/SS24_MENS_CAMPAIGN_Keiz_Kitajima_and_Martine_Syms_1-1-scaled.jpg',
    title: 'Giày Dép Hiệu Cao Cấp',
    subtitle: 'Thiết kế tinh tế, chất liệu premium',
    buttonText: 'Mua Ngay',
    link: '/products/giay-dep',
  },
];

// Dummy categories for Shop by Category
const categories = [
  {
    title: 'Nón',
    image: 'https://via.placeholder.com/300?text=Nón+Gucci',
    link: '/products/non',
  },
  {
    title: 'Áo',
    image: 'https://via.placeholder.com/300?text=Áo+Burberry',
    link: '/products/ao',
  },
  {
    title: 'Giày dép',
    image: 'https://via.placeholder.com/300?text=Giày+Gucci',
    link: '/products/giay-dep',
  },
  {
    title: 'Phụ kiện',
    image: 'https://via.placeholder.com/300?text=Phụ+kiện+Chanel',
    link: '/products/phu-kien',
  },
];

// Dummy reviews for customer feedback
const reviews = [
  {
    name: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Sản phẩm chất lượng cao, giao hàng nhanh chóng!',
  },
  {
    name: 'Trần Thị B',
    rating: 4,
    comment: 'Thiết kế đẹp, giá hợp lý, sẽ mua thêm.',
  },
  {
    name: 'Lê Văn C',
    rating: 5,
    comment: 'Dịch vụ chăm sóc khách hàng tuyệt vời.',
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    pauseOnHover: true,
  };

  if (loading) return <Loading />;

  // Featured products for grid (4 items)
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative mb-12">
        <Slider {...heroSettings}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative">
              <img src={slide.image} alt={slide.title} className="w-full h-[600px] object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-luxuryWhite bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-40">
                <h1 className="text-5xl font-elegant mb-4 animate-fadeIn">{slide.title}</h1>
                <p className="text-2xl mb-8 animate-fadeIn delay-300">{slide.subtitle}</p>
                <Button className="animate-fadeIn delay-500 bg-luxuryGold hover:bg-luxuryBlack text-luxuryBlack hover:text-luxuryWhite transition-all duration-300">
                  <Link to={slide.link}>{slide.buttonText}</Link>
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Shop by Category */}
      <section className="mb-12">
        <h2 className="text-3xl font-elegant text-luxuryBlack mb-6 text-center">Mua Theo Danh Mục</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group relative">
              <img src={category.image} alt={category.title} className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 rounded-lg transition-opacity duration-300 group-hover:bg-opacity-50">
                <Button className="bg-luxuryGold hover:bg-luxuryBlack text-luxuryBlack hover:text-luxuryWhite transition-all duration-300">
                  <Link to={category.link}>{category.title}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật - Carousel */}
      <section className="mb-12">
        <h2 className="text-3xl font-elegant text-luxuryBlack mb-6 text-center">Sản Phẩm Nổi Bật</h2>
        <ProductCarousel products={products.slice(0, 8)} /> {/* 8 sản phẩm cho carousel */}
        <div className="text-center mt-8">
          <Button className="bg-luxuryBlack text-luxuryWhite hover:bg-luxuryGold hover:text-luxuryBlack transition-all duration-300">
            <Link to="/products">Xem tất cả</Link>
          </Button>
        </div>
      </section>

      {/* Section thu hút người dùng - Featured Collection Grid + CTA */}
      <section className="mb-12">
        <h2 className="text-3xl font-elegant text-luxuryBlack mb-6 text-center">Bộ Sưu Tập Đặc Biệt</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="text-luxuryWhite bg-luxuryBlack hover:bg-luxuryGold hover:text-luxuryBlack transition-all duration-300">
            <Link to="/products">Khám Phá Thêm</Link>
          </Button>
          <p className="text-gray-600 mt-4">Hàng ngàn sản phẩm cao cấp chờ bạn khám phá!</p>
        </div>
      </section>

      {/* Giới thiệu về shop */}
      <section className="mb-12 bg-luxuryWhite p-8 rounded-lg shadow-luxury">
        <h2 className="text-3xl font-elegant text-luxuryBlack mb-6 text-center">Về Web Đồ Hiệu</h2>
        <p className="text-gray-600 text-center mb-4">Web Đồ Hiệu là cửa hàng trực tuyến chuyên cung cấp các sản phẩm thời trang cao cấp từ các thương hiệu nổi tiếng như Gucci, Burberry. Chúng tôi cam kết mang đến chất lượng tốt nhất, giá cả cạnh tranh và dịch vụ giao hàng nhanh chóng.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img src="https://via.placeholder.com/300?text=Chất+Lượng+Cao" alt="Chất lượng cao" className="mx-auto h-32 rounded-full transition-transform duration-300 hover:scale-105" />
            <h3 className="text-xl font-bold mt-4">Chất lượng cao</h3>
            <p className="text-gray-500">Sản phẩm chính hãng 100%</p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/300?text=Giá+Cạnh+Tranh" alt="Giá cạnh tranh" className="mx-auto h-32 rounded-full transition-transform duration-300 hover:scale-105" />
            <h3 className="text-xl font-bold mt-4">Giá cạnh tranh</h3>
            <p className="text-gray-500">Ưu đãi đặc biệt hàng tuần</p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/300?text=Giao+Hàng+Nhanh" alt="Giao hàng nhanh" className="mx-auto h-32 rounded-full transition-transform duration-300 hover:scale-105" />
            <h3 className="text-xl font-bold mt-4">Giao hàng nhanh</h3>
            <p className="text-gray-500">Giao hàng toàn quốc trong 3 ngày</p>
          </div>
        </div>
      </section>

      {/* Đánh giá khách hàng */}
      <section className="mb-12">
        <h2 className="text-3xl font-elegant text-luxuryBlack mb-6 text-center">Đánh Giá Từ Khách Hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="p-6 bg-luxuryWhite rounded-lg shadow-luxury transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <FaStar key={starIndex} className={starIndex < review.rating ? "text-luxuryGold" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <p className="text-right font-bold">{review.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="bg-luxuryBlack text-luxuryWhite hover:bg-luxuryGold hover:text-luxuryBlack transition-all duration-300">
            <Link to="/reviews">Xem thêm đánh giá</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;