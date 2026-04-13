import { Filters } from "../../../widgets/filters/ui/Filters";
import styles from './ProductsPage';


const ProductsPage = () => {
  return (
    <div className={styles.productsWrapper}>
      <Filters />
      <div className={styles.content}>
      </div>
    </div>
  );
};

export default ProductsPage;