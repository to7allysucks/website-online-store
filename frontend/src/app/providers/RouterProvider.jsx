import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../../shared/config/routes.js";
import Header from '../../widgets/header';
import ProductsPage from "../../pages/Products";
import ProductPage from "../../pages/product";
import CartPage from "../../pages/cart";
import CheckOutPage from "../../pages/checkout";
import ProfilePage from "../../pages/profile";
import HomePage from "../../pages/home";
import AuthPage from "../../pages/auth";
import {Footer} from "../../widgets/footer";


const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
    )
}

const router = createBrowserRouter([
  {
    path: ROUTES.HOME, element: <Layout><HomePage /></Layout>
  },
  {
    path: ROUTES.PRODUCTS, element: <Layout><ProductsPage /></Layout>
  },
  {
    path: ROUTES.PRODUCT, element: <Layout><ProductPage /></Layout>
  },
  {
    path: ROUTES.CART, element: <Layout><CartPage /></Layout>
  },
  {
    path: ROUTES.CHECKOUT, element: <Layout><CheckOutPage /></Layout>
  },
  {
    path: ROUTES.AUTH, element: <AuthPage />
  },
  {
    path: ROUTES.PROFILE, element: <Layout><ProfilePage /></Layout>
  },
])

export const AppRouter = () => <RouterProvider router={router}/>