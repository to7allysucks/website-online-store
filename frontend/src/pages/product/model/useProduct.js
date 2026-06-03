import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { productApi } from '../../../shared/api/productApi.js'

export const useProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

  useEffect(() => {
    productApi.getProduct(id)
      .then(data => {
        setProduct(data)
        if (data.variants?.length > 0) {
          setSelectedColor(data.variants[0].color)
          setSelectedSize(data.variants[0].size)
        }
      })
      .catch(err => console.error('Ошибка загрузки товара:', err))
      .finally(() => setIsLoading(false))
  }, [id])

  const uniqueColors = [...new Set(product?.variants?.map(v => v.color) || [])]
  const uniqueSizes = [...new Set(product?.variants?.map(v => v.size) || [])]

  const selectedVariant = product?.variants?.find(
    v => v.color === selectedColor && v.size === selectedSize
  )

  return {
    product,
    isLoading,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    uniqueColors,
    uniqueSizes,
    selectedVariant
  }
}
