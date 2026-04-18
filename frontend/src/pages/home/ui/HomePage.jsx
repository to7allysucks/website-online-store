import { NewCollections } from "../../../widgets/new-collection";
import { SearchProducts } from "../../../widgets/search-products";
import { NewThisWeek } from "../../../widgets/new-this-week/index.js";
import styles from './HomePage.module.scss'
import {XivCollections} from "../../../widgets/XIV-collections/index.js";
import {DescriptionFasion} from "../../../widgets/description-fasion/index.js";

const HomePage = () => {

  return (
    <div className={styles.home}>
      <SearchProducts />
      <NewCollections />
      <NewThisWeek />
      <XivCollections />
      <DescriptionFasion />
    </div>
  );
};

export default HomePage;