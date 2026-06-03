import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs } from 'swiper/modules'
import { useRef, useState } from 'react'
import styles from './ProductPage.module.scss'
import likeImg from '../../../shared/assets/icons/like.svg'
import { useProduct } from '../model/useProduct.js'
import { useAddToCart } from '../../../features/cart/model/useAddToCart.js'
import { formatPrice } from '../../../shared/lib/formatters.js'
import { MESSAGES, LABELS } from '../../../shared/config/constants.js'

const ProductPage = () => {
  const swiperRef = useRef(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const {
    product,
    isLoading,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    uniqueColors,
    uniqueSizes,
    selectedVariant
  } = useProduct()

  const { addToCart } = useAddToCart()

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addToCart(selectedVariant.id)
    }
  }

  if (isLoading) return <div>{MESSAGES.LOADING}</div>
  if (!product) return <div>{MESSAGES.PRODUCT_NOT_FOUND}</div>

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
          <span>{formatPrice(product.price)}</span>
          <p>{product.category?.name}</p>
          <div>{product.description}</div>
        </div>

        <div className={styles.cardParamsWrapper}>
          <div className={styles.cardParams}>
            <span>Color</span>
            <div className={styles.paramsList}>
              {uniqueColors.map(color => (
                <button
                  key={color}
                  style={{ backgroundColor: color }}
                  className={`${styles.squareParams} ${selectedColor === color ? styles.selected : ''}`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.cardParams}>
            <span>Size</span>
            <div className={styles.paramsList}>
              {uniqueSizes.map(size => (
                <button
                  key={size}
                  className={`${styles.squareParams} ${selectedSize === size ? styles.selected : ''}`}
                  onClick={() => setSelectedSize(size)}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p>FIND YOUR SIZE | MEASUREMENT GUIDE</p>
          <button className={styles.btnAdd} onClick={handleAddToCart}>
            ADD
          </button>
        </div>

        <button className={styles.btnLike} aria-label={LABELS.FAVORITES}>
          <img src={likeImg} alt={LABELS.FAVORITES} />
        </button>
      </div>
    </div>
  )
}

export default ProductPage