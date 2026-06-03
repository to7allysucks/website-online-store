import { api } from "../../../shared/api/instanse.js";
import { API_ENDPOINTS } from "../../../shared/api/endpoints.js";

export const cartApi = {
  getCart: async () => {
    const res = await api.get(API_ENDPOINTS.CART)
    return res.data
  },

  addToCart: async (variantId, quantity = 1) => {
    const res = await api.post(API_ENDPOINTS.CART_ITEMS, {
      variant_id: variantId,
      quantity
    })
    return res.data
  },

  updateQuantity: async (itemId, quantity) => {
    const res = await api.patch(API_ENDPOINTS.CART_ITEM(itemId), { quantity })
    return res.data
  },

  clearCart: async () => {
    const res = await api.delete(API_ENDPOINTS.CART)
    return res.data
  },

  removeItem: async (itemId) => {
    const res = await api.delete(API_ENDPOINTS.CART_ITEM(itemId))
    return res.data
  }
}