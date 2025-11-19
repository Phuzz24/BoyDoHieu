// src/utils/cartUtils.js
import { toast } from 'react-toastify';

// src/utils/cartUtils.js
export const handleAddToCartLogic = (product, selectedSize, selectedColor, addToCart) => {
  if (!product?._id || !product.name || !product.price || !product.brand) {
    return { success: false, message: "Dữ liệu sản phẩm không hợp lệ!" };
  }

  // Gán mặc định nếu chưa chọn size hoặc màu
  const size = selectedSize || product.sizes?.[0] || null;
  const color = selectedColor || product.colors?.[0] || null;

  // Kiểm tra tồn kho
  if ((product.stock || 0) <= 0) {
    return { success: false, message: "Sản phẩm đã hết hàng!" };
  }

  const cartItem = {
    _id: product._id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    discountPrice: product.discountPrice || null,
    images: product.images || [],
    selectedSize: size,
    selectedColor: color,
    quantity: 1,
  };

  addToCart(cartItem);
  return { success: true, message: `${product.name} đã được thêm vào giỏ hàng!` };
};
