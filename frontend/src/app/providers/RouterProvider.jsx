import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../../shared/config/routes.js";

import CatalogPage from "../../pages/catalog";
import ProductPage from "../../pages/product";
import CartPage from "../../pages/cart";
import CheckOutPage from "../../pages/checkout";
import ProfilePage from "../../pages/profile";
import HomePage from "../../pages/home";
import AuthPage from "../../pages/auth";


const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.CATALOG, element: <CatalogPage /> },
  { path: ROUTES.PRODUCT, element: <ProductPage />},
  { path: ROUTES.CART, element: <CartPage /> },
  { path: ROUTES.CHECKOUT, element: <CheckOutPage /> },
  { path: ROUTES.AUTH, element: <AuthPage /> },
  { path: ROUTES.PROFILE, element: <ProfilePage /> },
])

export const AppRouter = () => <RouterProvider router={router}/>