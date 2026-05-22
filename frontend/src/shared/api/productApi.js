import { api } from './instanse.js'

export const productApi = {
  getProduct: async (id) => {
    const res = await api.get(`/products/${id}`)
    return res.data
  }
}