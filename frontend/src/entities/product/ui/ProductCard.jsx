
import imgPlus from '../../../shared/assets/icons/plus.svg'
import styles from './ProductCard.module.scss'

export const ProductCard = ({product}) => {
  const mainImage = product.images.find(img => img.is_main)?.url


  return (
    <div className={styles.ProductCard}>
      <div className={styles.imgWrapper}>
        <img src={mainImage} alt="img"/>
        <button className={styles.plus}>
          <img src={imgPlus} alt="img"/>
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
  );
};
