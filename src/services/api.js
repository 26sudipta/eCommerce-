import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product APIs
export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  getCategories: () => API.get('/products/categories/all'),
  getByCategory: (category, params) => API.get(`/products/category/${category}`, { params }),
  search: (query) => API.get(`/products?search=${query}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getAll: (params) => API.get('/orders', { params }),
  getUserOrders: (userId) => API.get(`/orders/user/${userId}`),
  getById: (id) => API.get(`/orders/${id}`),
  update: (id, data) => API.put(`/orders/${id}`, data),
  cancel: (id) => API.delete(`/orders/${id}`),
  updateStatus: (id, status) => API.patch(`/orders/${id}/status`, { status }),
};

// Review APIs
export const reviewAPI = {
  getAll: (params) => API.get('/reviews', { params }),
  getProductReviews: (productId) => API.get(`/reviews/product/${productId}`),
  create: (data) => API.post('/reviews', data),
  update: (id, data) => API.put(`/reviews/${id}`, data),
  delete: (id) => API.delete(`/reviews/${id}`),
};

// Contact API
export const contactAPI = {
  submit: (data) => API.post('/contact', data),
  getAll: () => API.get('/contact'),
};

export default API;
