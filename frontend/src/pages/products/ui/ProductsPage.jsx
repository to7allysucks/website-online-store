import {Filters} from "../../../widgets/filters/ui/Filters.jsx";
import styles from './ProductsPage.module.scss';
import {Search} from "../../../shared/ui/search/index.js";
import {ProductCard} from "../../../entities/product/index.js";
import {useState} from "react";


export const ProductsPage = () => {

  const MOCK_PRODUCTS = [
    {
      id: '1',
      title: 'abc Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white', 'red', 'blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['black', 'red', 'blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['red', 'white', 'blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white', 'red', 'blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id: '1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
  ]

  const [querySearch, setQuerySearch] = useState('')


  const filteredProducts = querySearch.length === 0
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(product =>
      product.title.toLowerCase().includes(querySearch.trim().toLowerCase())
    )


  return (
    <div className={styles.productsWrapper}>
      <Filters/>
      <div className={styles.content}>
        <div className={styles.searchWrapper}>
          <h3>Products</h3>
          <Search
            value={querySearch}
            setQuerySearch={setQuerySearch}
          />
        </div>
        <div className={styles.productsList}>
          {filteredProducts.length !== 0
          ? (filteredProducts.map((product, index) => (
            <ProductCard
              product={product}
              key={product.id + index}
            />
          )))
            :  <div className={styles.hintSearch}>Products not yet</div>
          }

        </div>
      </div>
    </div>
  );
};
