
import styles from "./CartPage.module.scss";


const CartPage = () => {
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
              <div>
                <span>Subtotal</span>
                <span>180$</span>
              </div>
              <div>
                <span>Subtotal</span>
                <span>180$</span>
              </div>
              <div className={styles.separator}></div>
              <h4>total 
                <p>(TAX INCL.)</p>
                <h4>$190</h4>
              </h4>
              <div className={styles.agreement}>
                <input name="agreement" type="checkbox"></input>
                <label htmlFor="agreement">I agree to the Terms and Conditions</label>
              </div>
              <button className={styles.btnContinue}>continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CartPage