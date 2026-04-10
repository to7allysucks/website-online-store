import { NewCollections } from "../../../widgets/new-collection/ui/NewCollections.jsx";
import {Search} from "../../../widgets/search-products/ui/Search.jsx";
import styles from './HomePage.module.scss'

const HomePage = () => {

  return (
    <div className={styles.home}>
      <Search />
      <NewCollections />
    </div>
  );
};

export default HomePage;