import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authApi } from "../api/authApi.js"
import { useAuthStore } from "./authStore.js"
import { ROUTES } from "../../../shared/config/routes.js"

export const useAuth = () => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const login = async (email, password) => {
    setError('')
    setIsLoading(true)

    try {
      const { access_token } = await authApi.login({ email, password })
      const user = await authApi.getMe()
      setAuth(user, access_token)
      navigate(ROUTES.HOME)
    } catch (err) {
      setError('Invalid email or password')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (formData) => {
    setError('')
    setIsLoading(true)

    try {
      await authApi.register(formData)
      const { access_token } = await authApi.login({
        email: formData.email,
        password: formData.password
      })
      const user = await authApi.getMe()
      setAuth(user, access_token)
      navigate(ROUTES.HOME)
    } catch (err) {
      setError('Registration failed. Please try again')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    register,
    error,
    isLoading
  }
}
