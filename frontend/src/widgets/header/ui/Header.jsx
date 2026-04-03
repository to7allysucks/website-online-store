import { NavLink, Link } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes.js";
import Like from '../../../shared/assets/icons/like.svg';
import Logo from '../../../shared/assets/icons/logo.svg';
import Profile from '../../../shared/assets/icons/profile.svg';
import Cart from '../../../shared/assets/icons/cart.svg';
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <button className={styles.burger}>burger</button>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.CATALOG}>Catalog</NavLink>
        <NavLink to={ROUTES.CATALOG}>New</NavLink>
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
  );
};

export default Header;