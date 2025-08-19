import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCarousel from "../components/product/ProductCarousel";
import ProductCard from "../components/product/ProductCard";
import Loading from "../components/common/Loading";
import Button from "../components/common/Button";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";
import { FaStar, FaCheckCircle, FaDollarSign, FaShippingFast } from "react-icons/fa";

// Dummy hero slides
const heroSlides = [
  {
    image: "https://ecommerce-uikit.netlify.app/images/banners/main-fashion.png",
    title: "Bộ Sưu Tập Gucci Mới Nhất",
    subtitle: "Khám phá sự sang trọng đỉnh cao",
    buttonText: "Xem Ngay",
    link: "/products/gucci",
  },
  {
    image:
      "https://th.bing.com/th/id/R.65a229ec207cf42838f3e9813f64ab8b?rik=xwkRqx3fh1UWGQ&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20118%2f609%2fw2048h961%2f20201115%2f5930-kcysmrv6605696.jpg&ehk=NaJ%2bKTgSBu6E95P7Xp%2b2GP4cN%2bVPAuJT91Yot6y3KuI%3d&risl=&pid=ImgRaw&r=0",
    title: "Burberry - Biểu Tượng Thời Trang",
    subtitle: "Áo khoác, túi xách cao cấp",
    buttonText: "Khám Phá",
    link: "/products/burberry",
  },
  {
    image:
      "https://media.wonderlandmagazine.com/uploads/2023/06/SS24_MENS_CAMPAIGN_Keiz_Kitajima_and_Martine_Syms_1-1-scaled.jpg",
    title: "Giày Dép Hiệu Cao Cấp",
    subtitle: "Thiết kế tinh tế, chất liệu premium",
    buttonText: "Mua Ngay",
    link: "/products/giay-dep",
  },
];

// Dummy categories
const categories = [
  {
    title: "Nón",
    image: "https://picsum.photos/300/200?random=4",
    link: "/products/non",
  },
  {
    title: "Áo",
    image: "https://picsum.photos/300/200?random=5",
    link: "/products/ao",
  },
  {
    title: "Giày dép",
    image: "https://picsum.photos/300/200?random=6",
    link: "/products/giay-dep",
  },
  {
    title: "Phụ kiện",
    image: "https://picsum.photos/300/200?random=7",
    link: "/products/phu-kien",
  },
];

const dummyFeaturedProducts = [
  {
    _id: "1",
    name: "Nón Gucci Classic",
    brand: "Gucci",
    price: 200,
    image: "https://picsum.photos/300/200?random=8",
    description: "Sản phẩm được tạo từ da cao cấp, thiết kế tinh tế, phù hợp cho mọi lứa tuổi và phong cách.",
    rating: 4.5,
    numReviews: 120,
    discountPrice: 180,
    isNew: true,
  },
  {
    _id: "2",
    name: "Áo Burberry Trench",
    brand: "Burberry",
    price: 300,
    image: "https://picsum.photos/300/200?random=9",
    description: "Áo khoác cao cấp với chất liệu cotton premium, chống nước và giữ ấm tốt.",
    rating: 4.0,
    numReviews: 50,
  },
  {
    _id: "3",
    name: "Giày Gucci Ace",
    brand: "Gucci",
    price: 500,
    image: "https://picsum.photos/300/200?random=10",
    description: "Giày sneaker da thật, thiết kế hiện đại, thoải mái cho hoạt động hàng ngày.",
    rating: 4.8,
    numReviews: 80,
    discountPrice: 450,
  },
  {
    _id: "4",
    name: "Túi Burberry Tote",
    brand: "Burberry",
    price: 450,
    image: "https://picsum.photos/300/200?random=11",
    description: "Túi xách rộng rãi, chất liệu canvas bền bỉ, phù hợp cho công việc và du lịch.",
    rating: 4.7,
    numReviews: 90,
  },
];

const reviews = [
  {
    name: "Nguyễn Văn A",
    avatar: "https://picsum.photos/50/50?random=12",
    rating: 5,
    comment: "Sản phẩm chất lượng cao, giao hàng nhanh chóng!",
    date: "18/08/2025 10:00 AM",
  },
  {
    name: "Trần Thị B",
    avatar: "https://picsum.photos/50/50?random=13",
    rating: 4,
    comment: "Thiết kế đẹp, giá hợp lý, sẽ mua thêm.",
    date: "17/08/2025 03:30 PM",
  },
  {
    name: "Lê Văn C",
    avatar: "https://picsum.photos/50/50?random=14",
    rating: 5,
    comment: "Dịch vụ chăm sóc khách hàng tuyệt vời.",
    date: "16/08/2025 09:15 AM",
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
      console.error("Lỗi lấy sản phẩm:", error);
      setProducts(dummyFeaturedProducts); // Dùng dữ liệu cứng
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
  const featuredProducts = products.slice(0, 4) || dummyFeaturedProducts; // Sử dụng dummy nếu API rỗng

  return (
    <div className="min-h-screen bg-luxuryWhite dark:bg-luxuryBlack transition-colors duration-300">
      {/* Hero Slider */}
      <section className="relative mb-12">
        <Slider {...heroSettings}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-luxuryWhite bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity duration-500">
                <h1 className="text-5xl font-elegant mb-4 animate-fadeIn text-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-2xl mb-8 animate-fadeIn delay-300 text-shadow-md">
                  {slide.subtitle}
                </p>
                <Button className="animate-fadeIn delay-500 bg-luxuryGold hover:bg-luxuryBlack text-luxuryBlack hover:text-luxuryWhite px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <Link to={slide.link}>{slide.buttonText}</Link>
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Shop by Category */}
      <section className="mb-12 px-4">
        <h2 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">
          Mua Theo Danh Mục
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button className="bg-luxuryGold hover:bg-luxuryBlack text-luxuryBlack hover:text-luxuryWhite px-6 py-2 rounded-full transition-all duration-300">
                  <Link to={category.link}>{category.title}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật - Carousel */}
     <section className="mb-12 px-4">
  <h2 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">
    Sản Phẩm Nổi Bật
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {featuredProducts.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
  <div className="text-center mt-8">
    <Button className="bg-luxuryBlack text-luxuryWhite hover:bg-luxuryGold hover:text-luxuryBlack px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
      <Link to="/products">Xem tất cả</Link>
    </Button>
  </div>
</section>

      {/* Section thu hút người dùng - Featured Collection Grid + CTA */}
      <section className="mb-12 px-4">
        <h2 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">
          Bộ Sưu Tập Đặc Biệt
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="text-luxuryWhite bg-luxuryBlack hover:bg-luxuryGold hover:text-luxuryBlack px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <Link to="/products">Khám Phá Thêm</Link>
          </Button>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-center max-w-2xl mx-auto">
            Hàng ngàn sản phẩm cao cấp từ các thương hiệu hàng đầu đang chờ bạn khám phá!
          </p>
        </div>
      </section>

      {/* Giới thiệu về shop */}
      <section className="mb-12 px-4">
        <h2 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">
          Về Boy Đồ Hiệu
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
            <FaCheckCircle className="text-luxuryGold text-5xl mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-bold text-luxuryBlack dark:text-luxuryWhite mt-4">
              Chất lượng cao
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sản phẩm chính hãng 100% từ các thương hiệu hàng đầu.
            </p>
          </div>
          <div className="bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
            <FaDollarSign className="text-luxuryGold text-5xl mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-bold text-luxuryBlack dark:text-luxuryWhite mt-4">
              Giá cả hợp lý
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Ưu đãi đặc biệt và chương trình giảm giá thường xuyên.
            </p>
          </div>
          <div className="bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
            <FaShippingFast className="text-luxuryGold text-5xl mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-bold text-luxuryBlack dark:text-luxuryWhite mt-4">
              Giao hàng nhanh
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Giao hàng toàn quốc trong vòng 3-5 ngày làm việc.
            </p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-6 text-center max-w-3xl mx-auto font-medium">
          Boy Đồ Hiệu tự hào là điểm đến hàng đầu cho các sản phẩm thời trang cao cấp từ Gucci, Burberry và nhiều thương hiệu khác. Với sứ mệnh mang đến trải nghiệm mua sắm đẳng cấp, chúng tôi cam kết chất lượng, dịch vụ và sự hài lòng của khách hàng.
        </p>
      </section>

      {/* Đánh giá khách hàng */}
      <section className="mb-12 px-4">
        <h2 className="text-3xl font-elegant text-luxuryBlack dark:text-luxuryWhite mb-8 text-center">
          Đánh Giá Từ Khách Hàng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-hover-luxury transition-all duration-300 border border-luxuryGold/20"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-luxuryGold transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <p className="font-bold text-luxuryBlack dark:text-luxuryWhite">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {review.date}
                  </p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className={starIndex < review.rating ? "text-luxuryGold" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="bg-luxuryBlack text-luxuryWhite hover:bg-luxuryGold hover:text-luxuryBlack px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <Link to="/reviews">Xem thêm đánh giá</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;