import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs } from 'swiper/modules'
import { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ProductPage.module.scss'
import likeImg from '../../../shared/assets/icons/like.svg'
import { productApi } from '../../../shared/api/productApi.js'
import { useCartStore } from '../../../features/cart/model/cartStore.js'
import { useAuthStore } from '../../../features/auth/model/authStore.js'
import { ROUTES } from '../../../shared/config/routes.js'

const ProductPage = () => {
  const { id } = useParams() // берём id из URL /products/:id
  const navigate = useNavigate()
  const swiperRef = useRef(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // выбранные цвет и размер
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

  const { addItem } = useCartStore()
  const { isAuth } = useAuthStore()

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

  const handleAddToCart = async () => {
    if (!isAuth) {
      navigate(ROUTES.AUTH)
      return
    }

    const variant = product.variants?.find(
      v => v.color === selectedColor && v.size === selectedSize
    )

    if (!variant) {
      console.error('Вариант не найден')
      return
    }

    await addItem(variant.id, 1)
  }

  const uniqueColors = [...new Set(product?.variants?.map(v => v.color))]
  const uniqueSizes = [...new Set(product?.variants?.map(v => v.size))]

  if (isLoading) return <div>Loading...</div>
  if (!product) return <div>Товар не найден</div>

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderWrapper}>
        <Swiper
          className={styles.mainSlider}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={10}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
          }}
          modules={[FreeMode, Thumbs]}
        >
          {product.images?.map((img, index) => (
            <SwiperSlide key={index} className={styles.mainSlide}>
              <img src={img.url} alt={product.name} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          direction="vertical"
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className={styles.thumbsSlider}
        >
          {product.images?.map((img, index) => (
            <SwiperSlide key={index} className={styles.thumbSlide}>
              <img src={img.url} alt={product.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.cardProductWrapper}>
        <div className={styles.cardDescription}>
          <h4>{product.name}</h4>
          <span>{product.price}$</span>
          <p>{product.category?.name}</p>
          <div>{product.description}</div>
        </div>

        <div className={styles.cardParamsWrapper}>
          <div className={styles.cardParams}>
            <span>Color</span>
            <div className={styles.paramsList}>
              {uniqueColors.map(color => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className={`${styles.squareParams} ${selectedColor === color ? styles.selected : ''}`}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* выбор размера */}
          <div className={styles.cardParams}>
            <span>Size</span>
            <div className={styles.paramsList}>
              {uniqueSizes.map(size => (
                <div
                  key={size}
                  className={`${styles.squareParams} ${selectedSize === size ? styles.selected : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <p>FIND YOUR SIZE | MEASUREMENT GUIDE</p>
          <button className={styles.btnAdd} onClick={handleAddToCart}>
            ADD
          </button>
        </div>

        <div className={styles.btnLike}>
          <img src={likeImg} alt="like" />
        </div>
      </div>
    </div>
  )
}

export default ProductPage