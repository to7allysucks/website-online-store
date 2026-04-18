import arrowIMG from '../../../shared/assets/icons/arrow_prev.svg'
import styles from "./Filter.module.scss"

export const Filter = (props) => {
    const {
        title,
        items,
    } = props
    
    return (
        <>
        <details className={styles.accordeon}>
            <summary 
            className={styles.title}
            >{title}
            <img  className={styles.arrow} src={arrowIMG} alt="arrow" />
            </summary>
            <div className={styles.content}>
                {items.map((item) => (
                    <button 
                    className={styles.item} 
                    style={{'backgroundColor' : item, 'color' : item}}
                    >{item}</button>
                ))} 
            </div>
        </details>
        <span className={styles.separator}></span>
        </>
    )
}