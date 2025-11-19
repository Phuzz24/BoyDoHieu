import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Filter, Package } from 'lucide-react';
import { toast } from 'react-toastify'; // Đảm bảo import toast
import adminService from '../../services/adminService';
import ProductFormModal from './ProductFormModal';
import Swal from 'sweetalert2';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false); // Thêm loading cho refresh sau submit
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const data = await adminService.getProducts({ 
        category: selectedCategory, 
        search: searchTerm 
      });
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Lỗi tải sản phẩm!');
    } finally {
      setLoading(false);
      setRefreshLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: 'Sản phẩm sẽ bị xóa vĩnh viễn.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  });
  if (result.isConfirmed) {
    try {
      await adminService.deleteProduct(id);
      await fetchProducts();
      Swal.fire('Xóa thành công!', 'Sản phẩm đã bị xóa.', 'success');
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể xóa sản phẩm.', 'error');
      console.error('Error deleting product:', error);
    }
  }
};

  const handleOpenModal = (product = null, mode = 'add') => {
    setEditingProduct(product);
    setModalMode(mode);
    setShowModal(true);
  };

  const handleCloseModal = async (success = false) => {
    setShowModal(false);
    setEditingProduct(null);
    setModalMode('add');
    if (success) {
      setRefreshLoading(true); // Set loading cho refresh
      await fetchProducts(); // AWAIT: Đợi refresh hoàn thành trước khi toast
      // Infer mode từ editingProduct (nếu có = edit, else add)
      const inferredMode = editingProduct ? 'edit' : 'add';
      toast.success(inferredMode === 'edit' ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
        <button 
          onClick={() => handleOpenModal(null, 'add')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, thương hiệu..."
              className="bg-transparent flex-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="bg-transparent flex-1 outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img
                src={product.images[0] || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  MỚI
                </span>
              )}
              {product.discountPrice && product.discountPrice > 0 && ( // FIX: Check > 0 để ẩn nếu 0/null
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-lg font-bold text-blue-600">
                    {(product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price).toLocaleString()}đ
                  </p>
                  {product.discountPrice && product.discountPrice > 0 && ( // FIX: Chỉ line-through nếu > 0
                    <p className="text-sm text-gray-400 line-through">
                      {product.price.toLocaleString()}đ
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Tồn kho</p>
                  <p className={`text-sm font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock}
                  </p>
                </div>
              </div>

              {/* Category & Colors */}
              <div className="mb-3 pb-3 border-b">
                <p className="text-xs text-gray-500 mb-1">Danh mục: <span className="text-gray-700 font-medium">{product.category}</span></p>
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      ></div>
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleOpenModal(product, 'view')}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Xem</span>
                </button>
                <button 
                  onClick={() => handleOpenModal(product, 'edit')}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Sửa</span>
                </button>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <ProductFormModal 
          product={editingProduct} 
          mode={modalMode}
          onClose={handleCloseModal}
        />
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;