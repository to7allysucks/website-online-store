import { NewCollections } from "../../../widgets/new-collection";
import {Search} from "../../../widgets/search-products";
import { NewThisWeek } from "../../../widgets/new-this-week/index.js";
import styles from './HomePage.module.scss'
import {XivCollections} from "../../../widgets/XIV-collections/index.js";

const HomePage = () => {

  return (
    <div className={styles.home}>
      <Search />
      <NewCollections />
      <NewThisWeek />
      <XivCollections />
    </div>
  );
};

export default HomePage;