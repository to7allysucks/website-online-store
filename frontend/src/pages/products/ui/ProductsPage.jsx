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
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filters, setFilters] = useState({
      color: '',
      size: '',
      category: '',
      collection: ''
  })


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
                rootMargin: '200px',
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

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebouncedSearch(querySearch)
        }, 500)

        return () => clearTimeout(timeout)

    }, [querySearch])

    useEffect(() => {

        const fetchProducts = async () => {

            setIsLoading(true)

            try {

                const res = await api.get('/products', {
                    params: {
                        limit: 12,
                        skip,

                        search: debouncedSearch,

                        size: filters.size,
                        category: filters.category,
                        color: filters.color,
                    }
                })

                const newProducts = res.data.items

                setProducts(prev => (
                    skip === 0
                        ? newProducts
                        : [...prev, ...newProducts]
                ))

                setHasMore(newProducts.length >= 12)

            } catch (err) {

                console.log('Ошибка вывода продуктов:', err)

            } finally {

                setIsLoading(false)

            }
        }

        fetchProducts()

    }, [
        skip,
        debouncedSearch,

        filters.size,
        filters.category,
        filters.color,
        filters.collection,
    ])
    useEffect(() => {
        setProducts([])
        setSkip(0)
        setHasMore(true)
    }, [debouncedSearch, filters])

    useEffect(() => {
        console.log(filters)
    }, [filters])
  return (
    <div className={styles.productsWrapper}>
      <Filters
          filters={filters}
          setFilters={setFilters}
      />
      <div className={styles.content}>
        <div className={styles.searchWrapper}>
          <h3>Products</h3>
          <Search
            value={querySearch}
            setQuerySearch={setQuerySearch}
          />
        </div>
        <div className={styles.productsList}>
          {products.length !== 0
          ? (products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
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
