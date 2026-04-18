import { ROUTES } from "../../../shared/config/routes.js";
import { NavLink } from "react-router-dom";

import {Search} from "../../../shared/ui/search/index.js";
import styles from './SearchProducts.module.scss'

export const SearchProducts = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.listCategory}>
        <NavLink to={ROUTES.PRODUCTS} className={styles.item}>men</NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={styles.item}>women</NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={styles.item}>kids</NavLink>
      </ul>
      <div className={styles.searchWrapper}>
        <Search />
      </div>
    </div>
  );
};