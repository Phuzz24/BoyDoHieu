// src/utils/cartUtils.js
import { toast } from 'react-toastify';

export const handleAddToCartLogic = (product, selectedSize, selectedColor, addToCart) => {
  if (!product?._id || !product.name || !product.price || !product.brand) {
    toast.error("Dữ liệu sản phẩm không hợp lệ!");
    return;
  }

  // Gán mặc định nếu chưa chọn size hoặc màu
  const size = selectedSize || product.sizes?.[0] || null;
  const color = selectedColor || product.colors?.[0] || null;

  // Kiểm tra tồn kho
  if ((product.stock || 0) <= 0) {
    toast.error("Sản phẩm đã hết hàng!");
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
    quantity: 1,
  };

  addToCart(cartItem);
  toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
};
