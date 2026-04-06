import { create } from "zustand/react";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuth: !!localStorage.getItem('token'),

  setAuth: (user, token) => {
    localStorage.setItem('token', token)
    set({ user, token, isAuth: true })
  },

  logOut: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuth: null })
  },
}))