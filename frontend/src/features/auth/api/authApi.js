import {api} from '../../../shared/api/instanse.js'

export const authApi = {
  register: async (data) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data)
    const { access_token } = response.data
    localStorage.setItem('token', access_token)
    return response.data
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  logOut: () => {
    localStorage.removeItem('token')
  }
}