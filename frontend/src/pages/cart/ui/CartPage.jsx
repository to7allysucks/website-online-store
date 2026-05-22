import {useEffect, useMemo, useState} from "react";
import {NavLink, useLoaderData} from "react-router-dom";
import {ROUTES} from "../../../shared/config/routes";
import {ProductCard} from "../../../entities/product";
import styles from "./CartPage.module.scss";
import {useCartStore} from "../../../features/cart/model/cartStore.js";

const CartPage = () => {
  const {
    items,
    total,
    isLoading,
    fetchCart,
    removeItem,
    updateItem
  } = useCartStore()

  const [shipping, setShipping] = useState(10)
  const [isCheck, setIsCheck] = useState(false)

    const setCheckedToggle = () => {
    if (isCheck === false) {
      setIsCheck(true)

    } else if (isCheck === true) {
      setIsCheck(false)
    }
  };

  useEffect(() => {
    fetchCart()
  }, [])


  const totalPrice = useMemo(() =>
    items.reduce((currentPrice, item) => (item.quantity * item.variant.product.price) + currentPrice, 0),
    [items])

  console.log(items)

  if (isLoading) return <p>Loading...</p>
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.variants}>
          <NavLink to={ROUTES.CART}
                   className={`${styles.active} ${styles.navLink}`}>shopping bag
          </NavLink>
          {/*<NavLink to={ROUTES.FAVORITES} className={styles.navLink}>favorites*/}
          {/*</NavLink>*/}
        </div>
        <div className={styles.content}>
          <div className={styles.productsList}>
            {items.length === 0
              ? <p>Cart is entry</p>
              :
              items.map(
                item => <ProductCard product={item.variant.product}
                                     key={item.id}
                                     variant="cart"
                                     onRemove={() => removeItem(item.id)}
                                     onQuantityChange={(qty) => updateItem(item.id, qty)}
                                     quantity={item.quantity}

                />)

            }

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
                  onClick={setCheckedToggle}
                ></input>
                <label
                  htmlFor="agreement"
                >I agree to the Terms and Conditions</label>
              </div>
              <button
                className={styles.btnContinue}
                disabled={!isCheck}
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