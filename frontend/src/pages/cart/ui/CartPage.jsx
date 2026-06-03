import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes";
import { ProductCard } from "../../../entities/product";
import styles from "./CartPage.module.scss";
import { useCartStore } from "../../../features/cart/model/cartStore.js";
import { formatPrice, calculateTotal } from "../../../shared/lib/formatters.js";
import { MESSAGES } from "../../../shared/config/constants.js";

const CartPage = () => {
  const {
    items,
    total,
    isLoading,
    fetchCart,
    removeItem,
    updateItem
  } = useCartStore()

  const [shipping] = useState(10)
  const [isCheck, setIsCheck] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const totalPrice = calculateTotal(items)

  if (isLoading) return <p>{MESSAGES.LOADING}</p>
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
            {items.length === 0 ? (
              <p>{MESSAGES.CART_EMPTY}</p>
            ) : (
              items.map(item => (
                <ProductCard
                  product={item.variant.product}
                  key={item.id}
                  variant="cart"
                  onRemove={() => removeItem(item.id)}
                  onQuantityChange={(qty) => updateItem(item.id, qty)}
                  quantity={item.quantity}
                />
              ))
            )}
          </div>
          <div className={styles.totalCard}>
            <h4>order summary</h4>
            <div className={styles.contentCard}>
              <div className={styles.contentInner}>
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.contentInner}>
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className={styles.separator}></div>
              <h4 className={styles.totalEnter}>
                <div>
                  total
                  <p>(TAX INCL.)</p>
                </div>
                <h4>{formatPrice(totalPrice + shipping)}</h4>
              </h4>
              <div className={styles.agreement}>
                <input
                  name="agreement"
                  type="checkbox"
                  checked={isCheck}
                  onChange={(e) => setIsCheck(e.target.checked)}
                />
                <label htmlFor="agreement">
                  I agree to the Terms and Conditions
                </label>
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