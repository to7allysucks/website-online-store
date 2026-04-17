import styles from './Footer.module.scss'
import imgFooter from '../../../shared/assets/images/footer.svg'


export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={ styles.infoWrapper}>
          <ul className={styles.infoList}>
            <span>Info</span>
            <li>Pricing</li>
            <li>About</li>
            <li>Contacts</li>
          </ul>
          <ul className={styles.infoList}>
            <span>Languages</span>
            <li>Eng</li>
            <li>Esp</li>
            <li>Sve</li>
          </ul>
        </div>
        <div className={styles.imgWrapper}>
        <span className={styles.descriptionImg}>TECHNOLOGIES</span>
        <img src={imgFooter} alt="img"/>
        </div>
      </div>
    </footer>
  );
};
