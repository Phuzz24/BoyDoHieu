import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import ProductDetailView from '../components/product/ProductDetailView';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Dữ liệu giả lập với URL ảnh thực tế
        const dummyProducts = [
          {
            _id: "1",
            name: "Áo sơ mi cao cấp",
            brand: "Gucci",
            images: [
              "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1691428505/440103_X3F05_1508_001_100_0000_Light-Oversize-washed-T-shirt-with-Gucci-logo.jpg",
              "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1691428510/440103_X3F05_1508_002_100_0000_Light-Oversize-washed-T-shirt-with-Gucci-logo.jpg",
              "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1691428515/440103_X3F05_1508_003_100_0000_Light-Oversize-washed-T-shirt-with-Gucci-logo.jpg"
            ],
            price: 1500,
            discountPrice: 1200,
            description: "Áo sơ mi sang trọng từ Gucci, chất liệu cao cấp, thiết kế tinh tế.",
            category: "Áo",
            isNew: true,
            sizes: ["S", "M", "L"],
            colors: ["Black", "White"],
            stock: 10,
            reviews: [
              { id: 1, user: "Khách hàng A", avatar: "https://ui-avatars.com/api/?name=Khách+hàng+A", rating: 5, comment: "Sản phẩm tuyệt vời, chất lượng cao!", time: "2023-10-01 10:00" },
              { id: 2, user: "Khách hàng B", avatar: "https://ui-avatars.com/api/?name=Khách+hàng+B", rating: 4, comment: "Thiết kế đẹp, giao hàng nhanh.", time: "2023-10-02 14:30" },
            ],
          },
          {
            _id: "2",
            name: "Túi xách da thật",
            brand: "Louis Vuitton",
            images: [
              "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-empreinte-handbags--M45653_PM2_Front%20view.jpg",
              "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-empreinte-handbags--M45653_PM1_Side%20view.jpg",
              "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-empreinte-handbags--M45653_PM1_Interior%20view.jpg"
            ],
            price: 2500,
            description: "Túi xách cao cấp da thật, phù hợp mọi dịp.",
            category: "Túi xách",
            sizes: [],
            colors: ["Brown"],
            stock: 5,
            reviews: [
              { id: 1, user: "Khách hàng C", avatar: "https://ui-avatars.com/api/?name=Khách+hàng+C", rating: 5, comment: "Rất bền và đẹp!", time: "2023-10-03 09:15" },
            ],
          },
          {
            _id: "3",
            name: "Giày sneaker",
            brand: "Nike",
            images: [
              "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08a0-414a-830d-ecb9bd2f66f3/air-force-1-07-mens-shoes-j3Rnwd.png",
              "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/00336a0c-bd77-4f38-973d-6ee7d8cf7c00/air-force-1-07-mens-shoes-j3Rnwd.png",
              "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/9d2a5d3c-5a1a-49c2-a749-4ddc336d8e61/air-force-1-07-mens-shoes-j3Rnwd.png"
            ],
            price: 800,
            discountPrice: 600,
            description: "Giày sneaker thoải mái, phong cách trẻ trung.",
            category: "Giày",
            sizes: ["39", "40", "41"],
            colors: ["White", "Black"],
            stock: 15,
            reviews: [
              { id: 1, user: "Khách hàng D", avatar: "https://ui-avatars.com/api/?name=Khách+hàng+D", rating: 4, comment: "Thoải mái, giá tốt.", time: "2023-10-04 11:45" },
              { id: 2, user: "Khách hàng E", avatar: "https://ui-avatars.com/api/?name=Khách+hàng+E", rating: 3, comment: "Cần cải thiện độ bền.", time: "2023-10-05 16:20" },
            ],
          },
          {
            _id: "4",
            name: "Đồng hồ Rolex",
            brand: "Rolex",
            images: [
              "https://content.rolex.com/is/image/Rolex/?$content$&$dynamicUrl=m126200-0001,ar_3:4,c_fill,g_auto,w_480&$imgParams$",
              "https://content.rolex.com/is/image/Rolex/?$content$&$dynamicUrl=m126200-0001,ar_3:4,c_fill,g_auto,w_480&$imgParams$&op_sharpen=1&resmode=sharp2&wid=480&hei=480",
              "https://content.rolex.com/is/image/Rolex/?$content$&$dynamicUrl=m126200-0001,ar_3:4,c_fill,g_auto,w_480&$imgParams$&op_sharpen=1&resmode=sharp2&wid=480&hei=480&fmt=webp"
            ],
            price: 5000,
            description: "Đồng hồ cao cấp Rolex, biểu tượng của sự sang trọng.",
            category: "Phụ kiện",
            sizes: [],
            colors: ["Silver"],
            stock: 3,
            reviews: [
              { id: 1, user: "Khách hàng F", avatar: "https://ui-avatars.com/api/?name=Khách+hàng+F", rating: 5, comment: "Hoàn hảo!", time: "2023-10-06 13:00" },
            ],
          },
        ];

        const foundProduct = dummyProducts.find((p) => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          const related = dummyProducts.filter(
            (p) => p.category === foundProduct.category && p._id !== id
          ).slice(0, 3);
          setRelatedProducts(related);
        } else {
          throw new Error("Sản phẩm không tồn tại");
        }
      } catch (error) {
        console.error('Lỗi lấy chi tiết sản phẩm:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Đã thêm vào giỏ hàng!');
    }
  };

  if (loading) return <Loading />;
  if (!product) return <p className="text-center text-red-500">Sản phẩm không tồn tại.</p>;

  return <ProductDetailView product={product} relatedProducts={relatedProducts} onAddToCart={handleAddToCart} />;
};

export default ProductDetail;