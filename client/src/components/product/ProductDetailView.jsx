import React from 'react';
import Button from '../common/Button';

const ProductDetailView = ({ product, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
      <div>
        <h1 className="text-3xl font-elegant text-luxuryBlack mb-4">{product.name} - {product.brand}</h1>
        <p className="text-luxuryGold font-bold text-2xl mb-4">${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description || 'Sản phẩm cao cấp từ thương hiệu nổi tiếng, chất liệu cao cấp, thiết kế tinh tế.'}</p>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Kích thước:</label>
          <select className="border rounded px-4 py-2">
            <option>{product.size || 'M'}</option>
            <option>S</option>
            <option>L</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Màu sắc:</label>
          <select className="border rounded px-4 py-2">
            <option>{product.color || 'Black'}</option>
            <option>White</option>
            <option>Gold</option>
          </select>
        </div>
        <Button onClick={onAddToCart}>Thêm vào giỏ hàng</Button>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Đánh giá</h2>
          <p className="text-sm text-gray-600">5 sao - "Sản phẩm tuyệt vời, chất lượng cao!" - Khách hàng A</p>
          <p className="text-sm text-gray-600">4 sao - "Thiết kế đẹp, giao hàng nhanh." - Khách hàng B</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;