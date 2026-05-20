import {Filters} from "../../../widgets/filters/ui/Filters.jsx";
import {Search} from "../../../shared/ui/search/index.js";
import {ProductCard} from "../../../entities/product/index.js";
import {useEffect, useRef, useState} from "react";
import styles from './ProductsPage.module.scss';
import {api} from "../../../shared/api/instanse.js";


export const ProductsPage = () => {


  const [querySearch, setQuerySearch] = useState('')
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      if (!hasMore) return;

    api.get('/products',
        {
          params: {
              limit: 12,
              skip: skip
          }
        }
    )
        .then(res => {
            const newProducts = res.data.items

            setProducts(prev => [...prev, ...newProducts])

            if (newProducts.length < 12 ){
                setIsLoading(false)
            }
        })
        .catch(err => console.log('Ошибка вывода продуктов:', err))
        .finally(() => setIsLoading(false))
  }, [skip]);

    const observerRef = useRef(null)

    useEffect(() => {

        const observer = new IntersectionObserver(
            entries => {

                if (
                    entries[0].isIntersecting &&
                    !isLoading &&
                    hasMore
                ) {
                    setSkip(prev => prev + 12)
                }

            },
            {
                threshold: 1,
            }
        )

        if (observerRef.current) {
            observer.observe(observerRef.current)
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current)
            }
        }

    }, [isLoading, hasMore])


  const filteredProducts = querySearch.length === 0
    ? products
    : products.filter(product =>
      product.name.toLowerCase().includes(querySearch.trim().toLowerCase())
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
              variant="catalog"
            />
          )))
            :  <div className={styles.hintSearch}>Products not yet</div>
          }
        </div>
          <div ref={observerRef}></div>
          {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};
