
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes";
import { ProductCard } from "../../../entities/product";
import styles from "./CartPage.module.scss";

const CartPage = () => {

    const MOCK_PRODUCTS = [
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      size : 'L',
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      size : 'L',
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      size : 'L',
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      size : 'L',
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      size : 'L',
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
  ]

  const [totalPrice, setTotalPrice] = useState(0)
  const [shipping, setShipping] = useState(10)
  const [isCheck, setIscheck] = useState(true)
  const [products, setProducts] = useState(MOCK_PRODUCTS)

  const setCheckedtoggle = ()=> {
    if (isCheck === false) {
      setIscheck(true)
      
    } else if (isCheck === true) {
      setIscheck(false)
    }
  };

    const calcTotalPrice = useMemo(() => {
     let price = products.reduce((currentPrice, product) => product.price + currentPrice,0)
     console.log(price);
     return price
    }, [products])

    useEffect(() => {
      setTotalPrice(calcTotalPrice)
    }, [calcTotalPrice])


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.variants}>
          <navLink to={ROUTES.CART} className={`${styles.active} ${styles.navLink}`}>shopping bag</navLink>
          <navLink to={ROUTES.FAVORITES} className={styles.navLink}>favorites</navLink>
        </div>
        <div className={styles.content}>
          <div className={styles.productsList}>
          {products.map(product => <ProductCard product={product} key={product.id} variant="cart"/>)}
          </div>
          <div className={styles.totalCard}>
            <h4>order summary</h4>
            <div className={styles.contentCard}>
              <div className={styles.contentInner}>
                <span>Subtotal</span>
                <span>{`${totalPrice}$`}</span>
              </div>
              <div className={styles.contentInner}>
                <span>Shipping</span>
                <span>{`${shipping}$`}</span>
              </div>
              <div className={styles.separator}></div>
              <h4 className={styles.totalEnter}>
                <div>
                total 
                <p>(TAX INCL.)</p>
                </div>
                <h4>{`${totalPrice + shipping}$`}</h4>
              </h4>
              <div className={styles.agreement}>
                <input 
                name="agreement" 
                type="checkbox"
                onClick={setCheckedtoggle}
                ></input>
                <label 
                htmlFor="agreement"
                >I agree to the Terms and Conditions</label>
              </div>
              <button 
              className={styles.btnContinue} 
              disabled={isCheck}
              >continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CartPage