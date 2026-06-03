export const API_ENDPOINTS = {
  HEALTH: '/health',
  PRODUCTS: '/products',
  PRODUCT: (id) => `/products/${id}`,
  CART: '/cart',
  CART_ITEMS: '/cart/items',
  CART_ITEM: (id) => `/cart/items/${id}`,
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_ME: '/auth/me',
}
