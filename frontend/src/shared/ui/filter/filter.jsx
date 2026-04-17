import styles from "./Filter.module.scss"

export const Filter = (props) => {
    const {
        title,
        items,
    } = props
    
    return (
        <>
        <details className={styles.accordeon}>
            <summary className={styles.title}>{title}</summary>
            <ul className={styles.content}>
                {items.map((item) => (
                    <button className={styles.item} style={{'backgroundColor' : item, 'color' : item, 'border' : item}}>{item}</button>
                ))} 
            </ul>
        </details>
        <span className={styles.separator}></span>
        </>
    )
}