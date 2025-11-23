// src/components/admin/ProductFormModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import adminService from '../../services/adminService';

const ProductFormModal = ({ product, onClose, mode = 'add' }) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    discountPrice: null,
    description: '',
    category: '',
    isNew: false,
    colors: [],
    sizes: []
  });

  const [newSize, setNewSize] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newColor, setNewColor] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        price: product.price || 0,
        discountPrice: product.discountPrice || null,
        description: product.description || '',
        category: product.category || '',
        isNew: product.isNew || false,
        colors: product.colors || [],
        sizes: product.sizes?.map(s => ({
          size: s.size,
          quantity: s.quantity || 0,
          sold: s.sold || 0
        })) || []
      });

      setImagePreviews(
        product.images?.map(url => ({ url, isFromServer: true })) || []
      );
    } else {
      setFormData({
        name: '', brand: '', price: 0, discountPrice: null, description: '',
        category: '', isNew: false, colors: [], sizes: []
      });
      setImagePreviews([]);
    }
  }, [product]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > 10) {
      toast.warn('Tối đa 10 ảnh!');
      return;
    }
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, { url: reader.result, file }]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSize = () => {
    if (!newSize.trim()) return toast.warn('Nhập size!');
    if (!newQuantity || Number(newQuantity) < 0) return toast.warn('Số lượng không hợp lệ!');
    const exists = formData.sizes.some(s => s.size.toUpperCase() === newSize.trim().toUpperCase());
    if (exists) return toast.warn('Size đã tồn tại!');
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: newSize.trim(), quantity: Number(newQuantity), sold: 0 }]
    }));
    setNewSize('');
    setNewQuantity('');
  };

  const handleRemoveSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  // ✅ SỬA: Đảm bảo cập nhật đúng state
  const handleSizeChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.sizes];
      if (field === 'quantity' || field === 'sold') {
        updated[index][field] = Number(value) || 0;
      } else {
        updated[index][field] = value;
      }
      return { ...prev, sizes: updated };
    });
  };

  const handleAddColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, newColor.trim()] }));
      setNewColor('');
    }
  };

  const handleRemoveColor = (index) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION TOÀN DIỆN
    const trimmedName = formData.name.trim();
    
    if (!trimmedName) {
      return toast.error('Tên sản phẩm bắt buộc');
    }
    
    if (trimmedName.length < 3) {
      return toast.error('Tên sản phẩm phải có ít nhất 3 ký tự');
    }
    
    if (trimmedName.length > 200) {
      return toast.error('Tên sản phẩm không được quá 200 ký tự');
    }
    
    if (!formData.brand.trim()) {
      return toast.error('Thương hiệu bắt buộc');
    }
    
    if (formData.price <= 0) {
      return toast.error('Giá phải > 0');
    }
    
    if (formData.discountPrice && formData.discountPrice >= formData.price) {
      return toast.error('Giá khuyến mãi phải nhỏ hơn giá gốc');
    }
    
    if (!formData.description.trim()) {
      return toast.error('Mô tả bắt buộc');
    }
    
    if (!formData.category.trim()) {
      return toast.error('Danh mục bắt buộc');
    }
    
    if (formData.sizes.length === 0) {
      return toast.error('Phải có ít nhất 1 size');
    }
    
    // ✅ Validate sizes không trùng
    const sizeNames = formData.sizes.map(s => s.size.toUpperCase());
    const uniqueSizes = new Set(sizeNames);
    if (sizeNames.length !== uniqueSizes.size) {
      return toast.error('Có size bị trùng! Vui lòng kiểm tra lại.');
    }
    
    if (imagePreviews.length === 0) {
      return toast.error('Phải có ít nhất 1 ảnh');
    }

    const submitData = new FormData();

    // Basic info
    submitData.append('name', trimmedName);  // ✅ Dùng trimmed name
    submitData.append('brand', formData.brand);
    submitData.append('price', formData.price);
    if (formData.discountPrice) submitData.append('discountPrice', formData.discountPrice);
    submitData.append('description', formData.description);
    submitData.append('category', formData.category);
    submitData.append('isNew', formData.isNew);

    // ✅ CRITICAL FIX: GỬI ĐÚNG FORMAT CHO MULTER
    console.log('📦 Preparing sizes for submission:', formData.sizes);
    
    // ❌ KHÔNG GỬI NHƯ NÀY:
    // submitData.append('sizes', JSON.stringify(formData.sizes));
    
    // ✅ PHẢI GỬI TỪNG FIELD RIÊNG LẺ:
    formData.sizes.forEach((s, i) => {
      const sizeKey = `sizes[${i}][size]`;
      const quantityKey = `sizes[${i}][quantity]`;
      const soldKey = `sizes[${i}][sold]`;
      
      submitData.append(sizeKey, s.size);
      submitData.append(quantityKey, Number(s.quantity));
      submitData.append(soldKey, Number(s.sold) || 0);
      
      console.log(`  ${sizeKey}: ${s.size}`);
      console.log(`  ${quantityKey}: ${s.quantity}`);
      console.log(`  ${soldKey}: ${s.sold || 0}`);
    });
    
    console.log('✅ Sizes added to FormData');

    // Colors - ✅ SỬA: Gửi đúng format
    if (formData.colors && formData.colors.length > 0) {
      formData.colors.forEach((color, idx) => {
        submitData.append('colors', color);
        console.log(`  colors[${idx}]: ${color}`);
      });
    }

    // New images
    const newImages = imagePreviews.filter(img => img.file);
    newImages.forEach(img => submitData.append('images', img.file));

    // Existing images (for edit mode)
    if (isEditMode) {
      const oldImages = imagePreviews
        .filter(img => img.isFromServer)
        .map(img => img.url);
      oldImages.forEach(url => submitData.append('existingImages', url));
    }

    // Debug log
    console.log('📦 Submitting form data:');
    console.log('Sizes:', formData.sizes);
    for (let pair of submitData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    setLoading(true);
    try {
      let response;
      if (isEditMode) {
        response = await adminService.updateProduct(product._id, submitData);
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        response = await adminService.createProduct(submitData);
        toast.success('Thêm sản phẩm thành công!');
      }
      console.log('✅ Server response:', response);
      
      // ✅ Trả về product data để parent component cập nhật ngay
      onClose(true, response);  // Truyền thêm response
    } catch (error) {
      console.error('❌ Submit error:', error);
      toast.error(error.response?.data?.message || 'Lỗi hệ thống!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-8 py-5 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {isViewMode ? 'Xem chi tiết sản phẩm' : isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={() => onClose(false)} className="p-3 hover:bg-gray-100 rounded-full transition">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Tên + Thương hiệu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Tên sản phẩm *</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                disabled={isViewMode} 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Thương hiệu *</label>
              <input 
                type="text" 
                value={formData.brand} 
                onChange={e => setFormData({ ...formData, brand: e.target.value })} 
                disabled={isViewMode} 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
          </div>

          {/* Giá + Giá giảm + Danh mục */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Giá gốc (VNĐ) *</label>
              <input 
                type="number" 
                value={formData.price} 
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) || 0 })} 
                disabled={isViewMode} 
                className="w-full px-4 py-3 border rounded-lg" 
                min="1" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Giá khuyến mãi</label>
              <input 
                type="number" 
                value={formData.discountPrice || ''} 
                onChange={e => setFormData({ ...formData, discountPrice: e.target.value ? Number(e.target.value) : null })} 
                disabled={isViewMode} 
                className="w-full px-4 py-3 border rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Danh mục *</label>
              <input 
                type="text" 
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })} 
                disabled={isViewMode} 
                className="w-full px-4 py-3 border rounded-lg" 
                required 
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold mb-2">Mô tả sản phẩm *</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })} 
              disabled={isViewMode} 
              rows={5} 
              className="w-full px-4 py-3 border rounded-lg" 
              required 
            />
          </div>

          {/* Màu sắc */}
          <div>
            <label className="block text-sm font-semibold mb-3">Màu sắc</label>
            <div className="flex gap-3 mb-4">
              <input 
                type="text" 
                value={newColor} 
                onChange={e => setNewColor(e.target.value)} 
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddColor())} 
                disabled={isViewMode} 
                placeholder="Nhập màu..." 
                className="flex-1 px-4 py-3 border rounded-lg" 
              />
              <button 
                type="button" 
                onClick={handleAddColor} 
                disabled={isViewMode} 
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {formData.colors.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
                  {c}
                  {!isViewMode && (
                    <button type="button" onClick={() => handleRemoveColor(i)} className="hover:text-purple-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Size & tồn kho */}
          <div className="bg-blue-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Quản lý kích thước & tồn kho</h3>
            <div className="space-y-4 mb-6">
              {formData.sizes.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Size</label>
                    <input 
                      type="text" 
                      value={item.size} 
                      onChange={e => handleSizeChange(i, 'size', e.target.value)} 
                      disabled={isViewMode} 
                      className="w-full px-4 py-2 border rounded text-center font-bold disabled:bg-gray-100" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Số lượng</label>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={e => handleSizeChange(i, 'quantity', e.target.value)} 
                      disabled={isViewMode} 
                      className="w-full px-4 py-2 border rounded text-center disabled:bg-gray-100" 
                      min="0"
                    />
                  </div>
                  {!isViewMode && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSize(i)} 
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {!isViewMode && (
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={newSize} 
                  onChange={e => setNewSize(e.target.value)} 
                  placeholder="Size (VD: M)" 
                  className="flex-1 px-4 py-3 border rounded-lg" 
                />
                <input 
                  type="number" 
                  value={newQuantity} 
                  onChange={e => setNewQuantity(e.target.value)} 
                  placeholder="Số lượng" 
                  className="w-40 px-4 py-3 border rounded-lg text-center" 
                  min="0"
                />
                <button 
                  type="button" 
                  onClick={handleAddSize} 
                  className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
                >
                  <Plus className="w-5 h-5" /> Thêm size
                </button>
              </div>
            )}
          </div>

          {/* Ảnh */}
          <div>
            <label className="block text-sm font-semibold mb-3">Hình ảnh sản phẩm *</label>
            {!isViewMode && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  id="image-upload" 
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-6xl text-gray-400 mb-4">📤</div>
                  <p className="text-font-medium">Click để upload ảnh (tối đa 10)</p>
                </label>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {imagePreviews.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img.url} alt="" className="w-full h-40 object-cover rounded-xl shadow" />
                  {!isViewMode && (
                    <button 
                      type="button" 
                      onClick={() => removeImage(i)} 
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={formData.isNew} 
              onChange={e => setFormData({ ...formData, isNew: e.target.checked })} 
              disabled={isViewMode} 
              className="w-5 h-5" 
            />
            <label className="text-lg font-medium">Đánh dấu là sản phẩm mới</label>
          </div>

          <div className="flex justify-end gap-4 pt-8 border-t">
            <button 
              type="button" 
              onClick={() => onClose(false)} 
              className="px-8 py-4 border border-gray-300 rounded-xl text-lg font-medium hover:bg-gray-50"
            >
              Hủy
            </button>
            {!isViewMode && (
              <button 
                type="submit" 
                disabled={loading} 
                className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-lg font-bold flex items-center gap-3 disabled:opacity-50"
              >
                <Save className="w-6 h-6" />
                {loading ? 'Đang lưu...' : (isEditMode ? 'Cập nhật' : 'Thêm sản phẩm')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;