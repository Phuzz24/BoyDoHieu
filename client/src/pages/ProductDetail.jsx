import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductById } from "../services/productService";
import ProductDetailView from "../components/product/ProductDetailView";
import Loading from "../components/common/Loading";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy _id từ URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Lấy chi tiết sản phẩm
        const response = await getProductById(id);
        console.log('Product detail response:', response.data);
        setProduct(response.data);

        // Lấy sản phẩm liên quan
        const allProductsResponse = await getProducts();
        const related = allProductsResponse.data
          .filter((p) => p.category === response.data.category && p._id !== id)
          .slice(0, 3); // Lấy tối đa 3 sản phẩm liên quan
        setRelatedProducts(related);
      } catch (error) {
        setError("Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.");
        console.error('Lỗi lấy chi tiết sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-gray-500">Sản phẩm không tồn tại</p>;

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
};

export default ProductDetail;