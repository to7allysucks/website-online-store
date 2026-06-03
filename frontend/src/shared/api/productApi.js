import { api } from './instanse.js'
import { API_ENDPOINTS } from './endpoints.js'

export const productApi = {
  getProduct: async (id) => {
    const res = await api.get(API_ENDPOINTS.PRODUCT(id))
    return res.data
  }
}