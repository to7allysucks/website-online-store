import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import {useRef, useState} from "react";
import styles from './ProductPage.module.scss';
import likeImg from '../../../shared/assets/icons/like.svg'
import mockImg from '../../../shared/assets/images/mock.png'

const ProductPage = () => {
  const swiperRef = useRef(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)


  const MOCK_PRODUCTS = {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue','grey','black','yellow'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      images: [
      {url: '../../../shared/assets/images/mock.png', is_main: true},
      {url: '../../../shared/assets/images/mock.png', is_main: true},
      {url: '../../../shared/assets/images/mock.png', is_main: true},
      {url: '../../../shared/assets/images/mock.png', is_main: true},
      {url: '../../../shared/assets/images/mock.png', is_main: true},]
    }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderWrapper}>
        <Swiper
          className={styles.mainSlider}
          onSwiper={ (swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Thumbs]}
        >
        <SwiperSlide className={styles.mainSlide}><img src={mockImg} alt="img"/></SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          direction={"vertical"}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className={styles.thumbsSlider}
        >
          {MOCK_PRODUCTS.images.map(img => <SwiperSlide className={styles.thumbSlide}><img src={mockImg} alt='img'/></SwiperSlide>)}
        </Swiper>
      </div>
      <div className={styles.cardProductWrapper}>
        <div className={styles.cardDescription}>
          <h4>{MOCK_PRODUCTS.title}</h4>
          <span>{`${MOCK_PRODUCTS.price}$`}</span>
          <p>{MOCK_PRODUCTS.category}</p>
          <div>Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.</div>
        </div>
        <div className={styles.cardParamsWrapper}>
          <div className={styles.cardParams}>
            <span>Color</span>
            <div className={styles.paramsList}>
            {MOCK_PRODUCTS.colors.map(color => <div style={{backgroundColor: `${color}`}} className={styles.squareParams}></div>)}
            </div>
          </div>
          <div className={styles.cardParamsWrapper}>
            <span>Size</span>
            <div className={styles.paramsList}>
              {MOCK_PRODUCTS.sizes.map(size => <div className={styles.squareParams}>{size}</div>)}
            </div>
          </div>
          <p>FIND YOUR SIZE |  MEASUREMENT GUIDE</p>
          <button className={styles.btnAdd}>ADD</button>
        </div>
        <div className={styles.btnLike}><img src={likeImg} alt="like"/></div>
      </div>
    </div>
  );
};

export default ProductPage;