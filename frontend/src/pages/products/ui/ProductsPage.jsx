import { Filters } from '../../../widgets/filters/ui/Filters.jsx'
import { Search } from '../../../shared/ui/search/index.js'
import { ProductCard } from '../../../entities/product/index.js'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './ProductsPage.module.scss'
import { api } from '../../../shared/api/instanse.js'

const LIMIT = 12

export const ProductsPage = () => {
  const [querySearch, setQuerySearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    color: '',
    size: '',
    category: '',
    collection: ''
  })

  const observerRef = useRef(null)
  const isFirstRender = useRef(true)

  // debounce поиска
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(querySearch)
    }, 500)
    return () => clearTimeout(timeout)
  }, [querySearch])

  // сброс при изменении фильтров или поиска
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setProducts([])
    setOffset(0)
    setTotal(0)
  }, [debouncedSearch, filters.size, filters.category, filters.color, filters.collection])

  // загрузка продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const params = { limit: LIMIT, offset }

        if (debouncedSearch.trim()) params.search = debouncedSearch
        if (filters.size) params.size = filters.size
        if (filters.category) params.category = filters.category
        if (filters.color) params.color = filters.color
        if (filters.collection) params.collection = filters.collection

        const res = await api.get('/products', { params })

        const newProducts = res.data.items
        const newTotal = res.data.total

        setTotal(newTotal)
        setProducts(prev =>
          offset === 0 ? newProducts : [...prev, ...newProducts]
        )
      } catch (err) {
        console.error('Ошибка загрузки продуктов:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [offset, debouncedSearch, filters.size, filters.category, filters.color, filters.collection])

  // IntersectionObserver для бесконечной ленты
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          products.length < total  // есть ещё товары
        ) {
          setOffset(prev => prev + LIMIT)
        }
      },
      { rootMargin: '200px' }
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [isLoading, products.length, total])

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
          {isLoading && <p className={styles.hintSearch}>Loading...</p>}
          {!isLoading && products.length === 0 && (
            <div className={styles.hintSearch}>Products not found</div>
          )}
        </div>
        <div ref={observerRef} />
      </div>
    </div>
  )
}