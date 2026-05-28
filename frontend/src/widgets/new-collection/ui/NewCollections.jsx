import {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes.js";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import styles from './newCollections.module.scss'
import imgLongArrow from '../../../shared/assets/icons/long_arrow.svg';
import imgArrowPrev from '../../../shared/assets/icons/arrow_prev.svg';
import {api} from "../../../shared/api/instanse.js";


export const NewCollections = () => {

  const swiperRef = useRef(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get('/products',
        {
          params: {
            limit: 20
          }
        }
    )
        .then(res => setProducts(res.data.items))
        .catch(err => console.log('Ошибка вывода продуктов:', err))
        .finally(() => setIsLoading(false))
  }, []);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.descriptionColl}>
        <div className={styles.sliderTitle}>
          <h2>New<br/>Collection</h2>
          <p>Summer<br/>2024</p>
        </div>

        <div className={styles.btnsWrapper}>
          <div className={styles.btnControl}>
            <NavLink to={ROUTES.PRODUCTS} className={styles.btnShop}>Go To Shop <img src={imgLongArrow} alt="longArrow"/></NavLink>
          </div>
          <div className={styles.btnsNav}>
            <button
              className={styles.btnPrev}
              onClick={() => swiperRef.current?.slidePrev()}>
              <img src={imgArrowPrev} alt="arrow"/>
            </button>
            <button
              className={styles.btnNext}
              onClick={() => swiperRef.current?.slideNext()}>
              <img src={imgArrowPrev} alt="arrow"/>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.slider}>
        <Swiper
          onSwiper={ (swiper) => (swiperRef.current = swiper) }
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            768: {slidesPerView: 3, spaceBetween: 20}
          }}
        >
          {products.map(product => (
              <SwiperSlide className={styles.imgSlide}>
                {(isLoading) ?
                    <div>Loading... </div> :
                    <img src={product['main_image']} alt="img"/>
                }
              </SwiperSlide>
          )
        )}
        </Swiper>
      </div>
    </div>
  );
};