import { api } from '../../../shared/api/instanse.js'
import { API_ENDPOINTS } from '../../../shared/api/endpoints.js'

export const authApi = {
  register: async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH_REGISTER, data)
    return response.data
  },

  login: async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH_LOGIN, data)
    const { access_token } = response.data
    localStorage.setItem('token', access_token)
    return response.data
  },

  getMe: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH_ME)
    return response.data
  },

  logOut: () => {
    localStorage.removeItem('token')
  }
}