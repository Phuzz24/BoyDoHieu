import api from './api'; // Giả sử api.js có interceptor cho token

const adminService = {
  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Products
  getProducts: async (params = {}) => {
    try {
      const { page = 1, limit = 20, category, search, sortBy, order } = params;
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...(category && { category }),
        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      });

      const response = await api.get(`/admin/products?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post('/admin/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/admin/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/admin/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Orders
  getOrders: async (params = {}) => {
    try {
      const { page = 1, limit = 20, status } = params;
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...(status && { status }),
      });

      const response = await api.get(`/admin/orders?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getOrderDetail: async (id) => {
    try {
      const response = await api.get(`/admin/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order detail:', error);
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await api.put(`/admin/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

// Get users
getUsers: async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
},

  // Update user
  updateUser: async (id, data) => {
    try {
      const response = await api.put(`/admin/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

    // Notifications
  getNotifications: async (params = {}) => {
    try {
      const response = await api.get('/admin/notifications', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markRead: async (id) => {
    try {
      const response = await api.put(`/admin/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markAllRead: async () => {
    try {
      const response = await api.put('/admin/notifications/all/read');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendNotification: async (data) => {
    try {
      const response = await api.post('/admin/notifications', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload image (nếu cần, dùng multer ở server)
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
};



export default adminService;