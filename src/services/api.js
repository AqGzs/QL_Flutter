import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Authentication
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Shoes
export const getShoes = () => api.get('/shoes');
export const getShoe = (id) => api.get(`/shoes/${id}`);
export const createShoe = (data) => api.post('/shoes', data);
export const updateShoe = (id, data) => api.put(`/shoes/${id}`, data);
export const deleteShoe = (id) => api.delete(`/shoes/${id}`);

// Orders
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const createOrder = (data) => api.post('/orders', data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Users
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Payments
export const getPayments = () => api.get('/payments');
export const getPayment = (id) => api.get(`/payments/${id}`);
export const createPayment = (data) => api.post('/payments', data);
export const updatePayment = (id, data) => api.put(`/payments/${id}`, data);
export const deletePayment = (id) => api.delete(`/payments/${id}`);

export const createStock = (stock) => api.post('/stocks', stock);
export const getStock = (id) => api.get(`/stocks/${id}`);
export const updateStock = (id, stock) => api.put(`/stocks/${id}`, stock);

export const getStockStats = () => axios.get('/api/stats/stock/monthly');

export const getUserRegistrationStats = async () => {
  return await axios.get('/api/stats/user-registrations');
};