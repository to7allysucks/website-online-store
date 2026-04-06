import {api} from '../../../shared/api/instanse.js'

export const authApi = {
  register: async (data) => {
    const response = await api.post('./auth/register', data)
    return response.data
  },

  login: async () => {
    const response = await api.get('./auth/me')
    return response.data
  }
}