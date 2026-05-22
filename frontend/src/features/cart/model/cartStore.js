import {create} from "zustand";
import {cartApi} from "../api/cartApi.js";

export const useCartStore = create((set) => ({
  items: [],
  total: 0,
  isLoading: false,


  fetchCart: async () => {
    try {
      const data = await cartApi.getCart()
      set({items: data.items, total: data['total_price']})
    } catch (err) {
      console.error('Error: ', err)
    } finally {
      set({isLoading: false})
    }
  },

  addItem: async (variantId, quantity = 1) => {
    await cartApi.addToCart(variantId, quantity)
    // после добавления перезагружаем корзину
    useCartStore.getState().fetchCart()
  },

  updateItem: async (itemId, quantity) => {
    await cartApi.updateQuantity(itemId, quantity)
    useCartStore.getState().fetchCart()
  },

  removeItem: async (itemId) => {
    await cartApi.removeItem(itemId)
    useCartStore.getState().fetchCart()
  },
  clearCart: async () => {
    await cartApi.clearCart()
    set({items: [], total: 0})
  }
}))