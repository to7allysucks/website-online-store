import { useEffect, useRef, useState } from 'react'
import { api } from '../../../shared/api/instanse.js'
import { API_ENDPOINTS } from '../../../shared/api/endpoints.js'

const LIMIT = 12

export const useProducts = () => {
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

  const isFirstRender = useRef(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(querySearch)
    }, 500)
    return () => clearTimeout(timeout)
  }, [querySearch])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setProducts([])
    setOffset(0)
    setTotal(0)
  }, [debouncedSearch, filters.size, filters.category, filters.color, filters.collection])

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

        const res = await api.get(API_ENDPOINTS.PRODUCTS, { params })

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

  const loadMore = () => {
    if (!isLoading && products.length < total) {
      setOffset(prev => prev + LIMIT)
    }
  }

  return {
    querySearch,
    setQuerySearch,
    products,
    isLoading,
    filters,
    setFilters,
    loadMore,
    hasMore: products.length < total
  }
}
