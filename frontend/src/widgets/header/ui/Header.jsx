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
          <button className={styles.burger} onClick={toggle}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <NavLink className={styles.navItem} to={ROUTES.HOME}>Home</NavLink>
          <NavLink className={styles.navItem} to={ROUTES.Products}>Products</NavLink>
          <NavLink className={styles.navItem} to={ROUTES.Products}>New</NavLink>
        </div>

        <div className={styles.logo}><img src={Logo} alt="logo"/></div>

        <div className={styles.navActions}>
          <Link  to={ROUTES.CART} className={styles.like}><img src={Like} alt="like"/></Link>
          <Link to={ROUTES.CART} className={styles.cartWrapper}>
            <span>Cart</span>
            <div><img src={Cart} alt="cart"/></div>
          </Link>
          <Link to={ROUTES.PROFILE} className={styles.profile}><img src={Profile} alt="profile"/></Link>
        </div>
      </header>
      <BurgerMenu isOpen={isOpen} onClose={close}/>
    </>
  );
};

export default Header;