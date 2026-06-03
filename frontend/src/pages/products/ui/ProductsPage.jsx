import { Filters } from '../../../widgets/filters/ui/Filters.jsx'
import { Search } from '../../../shared/ui/search/index.js'
import { ProductCard } from '../../../entities/product/index.js'
import { useEffect, useRef } from 'react'
import styles from './ProductsPage.module.scss'
import { useProducts } from '../model/useProducts.js'
import { MESSAGES } from '../../../shared/config/constants.js'

export const ProductsPage = () => {
  const {
    querySearch,
    setQuerySearch,
    products,
    isLoading,
    filters,
    setFilters,
    loadMore,
    hasMore
  } = useProducts()

  const observerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [hasMore, loadMore])

  return (
    <div className={styles.productsWrapper}>
      <Filters filters={filters} setFilters={setFilters} />
      <div className={styles.content}>
        <div className={styles.searchWrapper}>
          <h3>Products</h3>
          <Search value={querySearch} setQuerySearch={setQuerySearch} />
        </div>
        <div className={styles.productsList}>
          {products.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              variant="catalog"
            />
          ))}
          {isLoading && <p className={styles.hintSearch}>{MESSAGES.LOADING}</p>}
          {!isLoading && products.length === 0 && (
            <div className={styles.hintSearch}>{MESSAGES.PRODUCTS_NOT_FOUND}</div>
          )}
        </div>
        <div ref={observerRef} />
      </div>
    </div>
  )
}