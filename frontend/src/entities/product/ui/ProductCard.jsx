import plusImg from '../../../shared/assets/icons/plus.svg'
import minusImg from '../../../shared/assets/icons/minus.svg'
import stylesCatalog from './ProductCard.module.scss'
import stylesCart from './ProductCardCart.module.scss'
import likeImg from '../../../shared/assets/icons/like.svg'
import closeImg from '../../../shared/assets/icons/plus.svg'
import {useState} from 'react'
import {useCartStore} from "../../../features/cart/model/cartStore.js";
import {useAuthStore} from "../../../features/auth/model/authStore.js";
import {ROUTES} from "../../../shared/config/routes.js";
import {Link, useNavigate} from "react-router-dom";

export const ProductCard = (props) => {
  const {
    product,
    variant = 'catalog',
    quantity = 1,
    onRemove,
    onQuantityChange
  } = props

  const navigate = useNavigate()
  const {addItem} = useCartStore()
  const {isAuth} = useAuthStore()

  const mainImage = product['main_image']
  const styles = variant === 'cart' ? stylesCart : stylesCatalog
  const actionIcon = variant === 'catalog' ? plusImg : likeImg


  const handleAddToCart = async () => {
    if (!isAuth) {
      navigate(ROUTES.AUTH)
      return
    }

    const firstVariantId = product.default_variant_id

    if (!firstVariantId) {
      console.error('У товара нет вариантов')
      return
    }

    await addItem(firstVariantId, 1)
  }

  return (
    <div className={styles.ProductCardWrapper}>
      <Link to={ROUTES.PRODUCT.replace(':id', product.id)} className={styles.ProductCard}>
        <div className={styles.imgWrapper}>
          <img src={mainImage} alt="img"/>{/*-----------MockImg-----------*/}
          <button className={styles.plus} onClick={(e) => {
            e.preventDefault()
            handleAddToCart()
          }}>
            <img src={actionIcon} alt="img"/>
          </button>
        </div>

        <div className={styles.descriptionCard}>
          <p>{product.category?.name} {product.colors?.length ?
            <div><span className={styles.colorSquare}
                       style={{backgroundColor: `${product.colors[0]}`}}></span>+{product.colors.length - 1}
            </div> : ''}</p>
          <div className={styles.heroInfoCard}>
            <h4>{product.name}</h4>
            <span>$ {product.price}</span>
          </div>
        </div>
      </Link>
      {variant === 'cart' && (
        <div className={styles.actionPanelWrapper}>
          <button className={styles.closeBtn} onClick={onRemove}>
            <img src={closeImg} alt="close" />
          </button>
          <div className={styles.actionsWrapper}>
            <div className={styles.size}>{product.size}</div>
            <div className={styles.counterWrapper}>
              <div className={styles.actions}
                   onClick={() => onQuantityChange(quantity + 1)}>
                <img src={closeImg} alt="plus" className={styles.plusCloth}/>
              </div>

              <div
                className={`${styles.actions} ${styles.counter}`}>{quantity}</div>

              <div className={styles.actions}
                   onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
                <img src={minusImg} alt="minus" className={styles.plusCloth}/>
              </div>
            </div>
          </div>
        </div>)
      }
    </div>
  );
};

