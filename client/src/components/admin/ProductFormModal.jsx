import React, { useState, useEffect } from 'react';
import { X, Save, Image, Plus, Trash2, Check, Eye } from 'lucide-react';
import adminService from '../../services/adminService';

const ProductFormModal = ({ product, onClose, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '', brand: '', price: 0, discountPrice: null, description: '',
    category: '', isNew: false, sizes: [], colors: [], stock: 0, images: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  // FIX: Close button và ESC gọi onClose(false) - không success
  const handleClose = () => {
    onClose(false); // False để không toast success
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);
  
  useEffect(() => {
    if (product) {
      const discount = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : null;
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        price: Number(product.price) || 0, // FIX: Ensure number
        discountPrice: discount,
        description: product.description || '',
        category: product.category || '',
        isNew: product.isNew || false,
        sizes: product.sizes || [],
        colors: product.colors || [],
        stock: Number(product.stock) || 0, // FIX: Ensure number từ DB
        images: product.images || []
      });
      setImagePreviews(product.images ? product.images.map(url => ({ url })) : []);
    } else {
      setFormData({
        name: '', brand: '', price: 0, discountPrice: null, description: '',
        category: '', isNew: false, sizes: [], colors: [], stock: 0, images: []
      });
      setImagePreviews([]);
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
    if (!formData.brand.trim()) newErrors.brand = 'Thương hiệu là bắt buộc';
    if (formData.price <= 0) newErrors.price = 'Giá phải lớn hơn 0';
    if (formData.stock < 0) newErrors.stock = 'Tồn kho không được âm'; // FIX: Validation < 0
    if (!formData.description.trim()) newErrors.description = 'Mô tả là bắt buộc';
    if (!formData.category.trim()) newErrors.category = 'Danh mục là bắt buộc';
    if (formData.discountPrice !== null && formData.discountPrice >= formData.price) {
      newErrors.discountPrice = 'Giá giảm phải nhỏ hơn giá gốc';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type !== 'checkbox') {
      if (name === 'stock') {
        newValue = parseInt(value) || 0; // FIX: ParseInt cho stock, default 0 nếu empty
      } else if (name === 'price' || name === 'discountPrice') {
        newValue = parseFloat(value) || 0; // ParseFloat cho price/discount
        if (name === 'discountPrice' && newValue === 0) newValue = null; // Null nếu 0
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue
    }));
  };

  const addArrayItem = (key, value) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [key]: [...prev[key], value]
      }));
    }
  };

  const removeArrayItem = (key, index) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviews(prev => [...prev, { url: event.target.result, file }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImagePreview = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = { 
        ...formData, 
        images: imagePreviews.map(p => p.url).filter(url => url)
      };
      if (mode === 'edit') {
        await adminService.updateProduct(product._id, submitData);
        onClose(true); // Chỉ gọi true khi submit success
      } else {
        await adminService.createProduct(submitData);
        onClose(true);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ submit: 'Lỗi lưu sản phẩm: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const isViewMode = mode === 'view';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-xl font-bold text-gray-900">
            {isViewMode ? 'Xem sản phẩm' : (product ? 'Sửa sản phẩm' : 'Thêm sản phẩm')}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isViewMode}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập tên sản phẩm"
                required={!isViewMode}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thương hiệu *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                disabled={isViewMode}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập thương hiệu"
                required={!isViewMode}
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá gốc *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={isViewMode}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                step="0.01"
                required={!isViewMode}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá giảm (tùy chọn, &lt; giá gốc)</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice || ''} // Hiển thị empty nếu null
                onChange={handleChange}
                disabled={isViewMode}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.discountPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                step="0.01"
              />
              {errors.discountPrice && <p className="text-red-500 text-sm mt-1">{errors.discountPrice}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả sản phẩm *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isViewMode}
              rows={4}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Mô tả chi tiết sản phẩm..."
              required={!isViewMode}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isViewMode}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              required={!isViewMode}
            >
              <option value="">Chọn danh mục</option>
              <option value="men">Nam</option>
              <option value="women">Nữ</option>
              <option value="kids">Trẻ em</option>
              <option value="accessories">Phụ kiện</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Is New Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChange}
              disabled={isViewMode}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">Sản phẩm mới</label>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tồn kho *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              disabled={isViewMode}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
              min="0"
              required={!isViewMode}
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
            <div className="flex gap-2">
              <input
                id="sizeInput"
                type="text"
                placeholder="e.g., M, L, XL"
                className="flex-1 p-2 border border-gray-300 rounded"
                disabled={isViewMode}
              />
              <button
                type="button"
                onClick={() => addArrayItem('sizes', document.getElementById('sizeInput').value)}
                disabled={isViewMode}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                <Plus className="w-4 h-4 inline -ml-1 mr-1" />
                Thêm
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.sizes.map((size, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                  {size}
                  {!isViewMode && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('sizes', idx)}
                      className="ml-2 hover:bg-blue-200 rounded-full p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
            <div className="flex gap-2">
              <input
                id="colorInput"
                type="text"
                placeholder="e.g., red, blue, black"
                className="flex-1 p-2 border border-gray-300 rounded"
                disabled={isViewMode}
              />
              <button
                type="button"
                onClick={() => addArrayItem('colors', document.getElementById('colorInput').value)}
                disabled={isViewMode}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
              >
                <Plus className="w-4 h-4 inline -ml-1 mr-1" />
                Thêm
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.colors.map((color, idx) => (
                <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center">
                  {color}
                  {!isViewMode && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('colors', idx)}
                      className="ml-2 hover:bg-purple-200 rounded-full p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
            {!isViewMode ? (
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-1">Chọn nhiều file, preview sẽ hiển thị bên dưới</p>
              </div>
            ) : null}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {imagePreviews
                .filter(p => p && p.url) // Filter null
                .map((preview, idx) => (
                  <div key={idx} className="relative group">
                    <img src={preview.url} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                    {!isViewMode && (
                      <button
                        type="button"
                        onClick={() => removeImagePreview(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

          {/* Buttons */}
          {!isViewMode && (
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Hủy
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;