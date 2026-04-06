import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../shared/config/routes.js'
import styles from './BurgerMenu.module.scss'

export const BurgerMenu = (props) => {
  const {
    isOpen,
    onClose,
  } = props

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={onClose}></div>
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <button className={styles.closeBtn} onClick={onClose}>
          <span></span>
          <span></span>
        </button>
        <nav className={styles.nav}>
          <NavLink to={ROUTES.HOME} onClick={onClose}>Home</NavLink>
          <NavLink to={ROUTES.CATALOG} onClick={onClose}>Catalog</NavLink>
          <NavLink to={ROUTES.CATALOG} onClick={onClose}>New</NavLink>
        </nav>
      </div>
    </>
  );
};
