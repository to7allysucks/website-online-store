import { ROUTES } from "../../../shared/config/routes.js";
import { NavLink } from "react-router-dom";

import styles from './Search.module.scss'

export const Search = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.listCategory}>
        <NavLink to={ROUTES.PRODUCTS} className={styles.item}>men</NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={styles.item}>women</NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={styles.item}>kids</NavLink>
      </ul>
      <div className={styles.searchWrapper}>
        <input type="search" placeholder='Search' img/>
      </div>
    </div>
  );
};