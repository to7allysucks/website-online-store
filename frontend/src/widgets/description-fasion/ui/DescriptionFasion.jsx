import styles from './DescriptionFasion.module.scss'

export const DescriptionFasion = () => {
  return (
    <div className={styles.wrapper}>
      <h3>
        Our Approach to fashion design
      </h3>
      <p>at elegant vogue , we blend creativity with craftsmanship to
        create fashion that transcends trends and stands the test of time
        each design is meticulously crafted, ensuring the highest quelity
        exqulsite finish</p>
      <ul className={styles.cardWrapper}>
        <li className={`${styles.cardItem} ${styles.top}`}><img src="https://placehold.co/300x400" alt="img"/></li>
        <li className={styles.cardItem}><img src="https://placehold.co/300x400" alt="img"/></li>
        <li className={`${styles.cardItem} ${styles.top}`}><img src="https://placehold.co/300x400" alt="img"/></li>
        <li className={styles.cardItem}><img src="https://placehold.co/300x400" alt="img"/></li>
      </ul>
    </div>
  );
};
