
import imgPlus from '../../../shared/assets/icons/plus.svg'
import stylesCatalog from './ProductCard.module.scss'
import stylesCart from './ProductCardCart.module.scss'
import likeImg from '../../../shared/assets/icons/like.svg'
import closeImg from '../../../shared/assets/icons/plus.svg'
import { useState } from 'react'


export const ProductCard = ({product, variant = 'catalog'}) => {
  const mainImage = product.images.find(img => img.is_main)?.url
  const styles = variant === 'cart' ? stylesCart : stylesCatalog
  const actionIcon = variant === 'catalog'? imgPlus : likeImg

  const [counterCloth, setCounterCloth] = useState(1)

  return (
    <div className={styles.ProductCardWrapper}>
      <div className={styles.ProductCard}>
        <div className={styles.imgWrapper}>
          <img src={mainImage} alt="img"/>
          <button className={styles.plus}>
            <img src={actionIcon} alt="img"/>
          </button>
        </div>

        <div className={styles.descriptionCard}>
          <p>{product.material} {product.category}   {product.colors?.length ? <div><span className={styles.colorSquare} style={{backgroundColor: `${product.colors[0]}`}}></span>+{product.colors.length - 1}</div> : ''}</p>
          <div className={styles.heroInfoCard}>
            <h4>{product.title}</h4>
            <span>$ {product.price}</span>
          </div>
        </div>
      </div>
      {variant === 'cart'
      ?
        <div className={styles.actionPanelWrapper}>
          <button className={styles.closeBtn}>
          <img src={closeImg} alt="close"/>
          </button>
          <div className={styles.actionsWrapper}>
            <div className={styles.size}>{product.size}</div>
            <div className={styles.counterWrapper}>
              <div className={styles.actions}>
                <img src={closeImg} alt="plus" className={styles.plusCloth}/>
              </div>
              <div className={styles.actions}>{counterCloth}</div>
              <div className={`${styles.actions} ${styles.counterCloth}`}>
                <img src={closeImg} alt="plus" className={styles.plusCloth}/>
              </div>
            </div>
          </div>
        </div>
        :
        <div className={{display: 'none'}}></div>
      }
    </div>
  );
};
