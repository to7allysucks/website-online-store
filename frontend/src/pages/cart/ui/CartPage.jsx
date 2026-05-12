
import { useState } from "react";
import styles from "./CartPage.module.scss";


const CartPage = () => {

  const [totalPrice, setTotalPrice] = useState('')
  const [isCheck, setIscheck] = useState(false)

  const setCheckedtoggle = ()=> {
    if (isCheck === false) {
      setIscheck(true)
    } else if (isCheck === true) {
      setIscheck(false)
    }
  };
  


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.variants}>
          <div className={`${styles.active} ${styles.navLink}`}>shopping bag</div>
          <div className={`$${styles.navLink}`}>favorites</div>
        </div>
        <div className={styles.content}>
          <div className={styles.productsList}>
          ASD
          </div>
          <div className={styles.totalCard}>
            <h4>order summary</h4>
            <div className={styles.contentCard}>
              <div className={styles.contentInner}>
                <span>Subtotal</span>
                <span >180$</span>
              </div>
              <div className={styles.contentInner}>
                <span>Shipping</span>
                <span>10$</span>
              </div>
              <div className={styles.separator}></div>
              <h4 className={styles.totalEnter}>
                <div>
                total 
                <p>(TAX INCL.)</p>
                </div>
                <h4>190$</h4>
              </h4>
              <div className={styles.agreement}>
                <input name="agreement" type="checkbox"></input>
                <label 
                htmlFor="agreement"
                onClick={setCheckedtoggle}
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