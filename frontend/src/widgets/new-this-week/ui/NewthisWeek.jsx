import styles from './NewThisWeek.module.scss'
import {NavLink} from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes.js";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import {useRef, useState} from "react";
import imgArrowPrev from "../../../shared/assets/icons/arrow_prev.svg";
import ProductPage from "../../../pages/product/index.js";
import {ProductCard} from "../../../entities/product/index.js";

export const NewThisWeek = () => {

  const swiperRef = useRef(null)

  const MOCK_PRODUCTS = [
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['black','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['red','white','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
  ]

  const [products, setProducts] = useState(MOCK_PRODUCTS)

  return (
    <div className={styles.sliderWrapper}>
      <h2>new<br/>this week <sup>({products.length})</sup></h2>
      <div className={styles.slider}>
        <Swiper
          onSwiper={ (swiper) => (swiperRef.current = swiper) }
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            768: {slidesPerView: 4, spaceBetween: 26}
          }}
        >
          {products.map(product => (
            <SwiperSlide>
              <ProductCard
              product={product}
              key={product.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.btnsNav}>
        <button
          className={styles.btnPrev}
          onClick={() => swiperRef.current?.slidePrev()}>
          <img src={imgArrowPrev} alt=""/>
        </button>
        <button
          className={styles.btnNext}
          onClick={() => swiperRef.current?.slideNext()}>
          <img src={imgArrowPrev} alt=""/>
        </button>
      </div>
    </div>
  );
};
