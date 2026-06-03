import plusImg from '../../../shared/assets/icons/plus.svg'
import minusImg from '../../../shared/assets/icons/minus.svg'
import stylesCatalog from './ProductCard.module.scss'
import stylesCart from './ProductCardCart.module.scss'
import likeImg from '../../../shared/assets/icons/like.svg'
import closeImg from '../../../shared/assets/icons/plus.svg'
import { useAddToCart } from "../../../features/cart/model/useAddToCart.js"
import { ROUTES } from "../../../shared/config/routes.js"
import { Link } from "react-router-dom"
import { formatPrice } from "../../../shared/lib/formatters.js"
import { LABELS } from "../../../shared/config/constants.js"

export const ProductCard = (props) => {
  const {
    product,
    variant = 'catalog',
    quantity = 1,
    onRemove,
    onQuantityChange
  } = props

  const { addToCart } = useAddToCart()

  const mainImage = product['main_image']
  const styles = variant === 'cart' ? stylesCart : stylesCatalog
  const actionIcon = variant === 'catalog' ? plusImg : likeImg

  const handleAddToCart = async () => {
    await addToCart(product.default_variant_id)
  }

  return (
    <div className={styles.ProductCardWrapper}>
      <Link to={ROUTES.PRODUCT.replace(':id', product.id)} className={styles.ProductCard}>
        <div className={styles.imgWrapper}>
          <img src={mainImage} alt={product.name} />
          <button
            className={styles.plus}
            onClick={(e) => {
              e.preventDefault()
              handleAddToCart()
            }}
          >
            <img src={actionIcon} alt={LABELS.ADD_TO_CART} />
          </button>
        </div>

        <div className={styles.descriptionCard}>
          <p>
            {product.category?.name}{' '}
            {product.colors?.length > 0 && (
              <div>
                <span
                  className={styles.colorSquare}
                  style={{ backgroundColor: product.colors[0] }}
                />
                +{product.colors.length - 1}
              </div>
            )}
          </p>
          <div className={styles.heroInfoCard}>
            <h4>{product.name}</h4>
            <span>{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>

      {variant === 'cart' && (
        <div className={styles.actionPanelWrapper}>
          <button className={styles.closeBtn} onClick={onRemove} aria-label={LABELS.REMOVE}>
            <img src={closeImg} alt={LABELS.REMOVE} />
          </button>
          <div className={styles.actionsWrapper}>
            <div className={styles.size}>{product.size}</div>
            <div className={styles.counterWrapper}>
              <button
                className={styles.actions}
                onClick={() => onQuantityChange(quantity + 1)}
                aria-label={LABELS.INCREASE}
              >
                <img src={closeImg} alt={LABELS.INCREASE} className={styles.plusCloth} />
              </button>

              <div className={`${styles.actions} ${styles.counter}`}>
                {quantity}
              </div>

              <button
                className={styles.actions}
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                aria-label={LABELS.DECREASE}
              >
                <img src={minusImg} alt={LABELS.DECREASE} className={styles.plusCloth} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

