import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    // Logic thêm sản phẩm (modal hoặc form)
    toast.info('Chức năng thêm sản phẩm đang phát triển');
  };

  return (
    <div>
      <h1 className="text-3xl font-elegant text-luxuryBlack mb-8">Admin Dashboard</h1>
      <Button onClick={handleAddProduct} className="mb-4">Thêm sản phẩm mới</Button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-luxuryBlack text-luxuryWhite">
            <th className="p-2">Tên</th>
            <th className="p-2">Giá</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="p-2">{product.name}</td>
              <td className="p-2">${product.price}</td>
              <td className="p-2">
                <Button className="bg-red-500 hover:bg-red-600 text-white mr-2">Xóa</Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Sửa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;