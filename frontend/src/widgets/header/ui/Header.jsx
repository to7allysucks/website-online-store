import { NavLink, Link } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes.js";
import { BurgerMenu, useBurgerMenu } from '../../../widgets/burger-menu'
import Like from '../../../shared/assets/icons/like.svg';
import Logo from '../../../shared/assets/icons/logo.svg';
import Profile from '../../../shared/assets/icons/profile.svg';
import Cart from '../../../shared/assets/icons/cart.svg';
import styles from './Header.module.scss'

const Header = () => {
  const { isOpen, toggle, close } = useBurgerMenu()

  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <button className={styles.burger} onClick={toggle} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <NavLink className={styles.navItem} to={ROUTES.HOME}>Home</NavLink>
          <NavLink className={styles.navItem} to={ROUTES.PRODUCTS}>Products</NavLink>
          <NavLink className={styles.navItem} to={ROUTES.PRODUCTS}>New</NavLink>
        </div>

        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={Logo} alt="logo" />
        </Link>

        <div className={styles.navActions}>
          <Link to={ROUTES.CART} className={styles.like} aria-label="Favorites">
            <img src={Like} alt="favorites" />
          </Link>
          <Link to={ROUTES.CART} className={styles.cartWrapper}>
            <span>Cart</span>
            <div><img src={Cart} alt="cart" /></div>
          </Link>
          <Link to={ROUTES.PROFILE} className={styles.profile} aria-label="Profile">
            <img src={Profile} alt="profile" />
          </Link>
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} onClose={close} />
    </>
  );
};

export default Header;