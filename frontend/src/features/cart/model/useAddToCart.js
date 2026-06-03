import { useNavigate } from "react-router-dom"
import { useCartStore } from "./cartStore.js"
import { useAuthStore } from "../../auth/model/authStore.js"
import { ROUTES } from "../../../shared/config/routes.js"
import { MESSAGES } from "../../../shared/config/constants.js"

export const useAddToCart = () => {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const { isAuth } = useAuthStore()

  const addToCart = async (variantId) => {
    if (!isAuth) {
      navigate(ROUTES.AUTH)
      return
    }

    if (!variantId) {
      console.error(MESSAGES.ERROR_VARIANT_REQUIRED)
      return
    }

    await addItem(variantId, 1)
  }

  return { addToCart, isAuth }
}
