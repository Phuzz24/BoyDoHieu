import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import ProductDetailView from '../components/product/ProductDetailView';
import { getProductById } from '../services/productService';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi lấy chi tiết sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  if (loading) return <Loading />;

  if (!product) return <p>Sản phẩm không tồn tại.</p>;

  return <ProductDetailView product={product} onAddToCart={handleAddToCart} />;
};

export default ProductDetail;