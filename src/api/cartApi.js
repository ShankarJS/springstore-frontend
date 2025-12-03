import api from './axios';
export const getCart = () => api.get('/api/cart').then(r => r.data);
export const addToCart = (productId, qty) => api.post('/api/cart/add?productId=' + productId + '&quantity=' + qty).then(r => r.data);
export const placeOrder = () => api.post('/api/orders/place').then(r => r.data);