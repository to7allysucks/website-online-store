import {api} from "../../../shared/api/instanse.js";


export const cartApi = {

  getCart: async () => {
    const res = await api.get('/cart')
    return res.data
  },

  addToCart: async (variantId, quantity=1) => {
    const res = await api.post('/cart/items',{
      variant_id: variantId,
      quantity
    })
    return res.data
  },

  updateQuantity: async (itemId, quantity) => {
    const res = await api.patch(`/cart/items/${itemId}`, {quantity})
    return res.data
  },

  clearCart: async () => {
    const res = await api.delete('/cart/')
    return res.data
  },


  removeItem: async (itemId) => {
    const res = await api.delete(`/cart/items/${itemId}`)
    return res.data
  }
}