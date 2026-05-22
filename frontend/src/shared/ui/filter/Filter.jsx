import arrowIMG from '../../../shared/assets/icons/arrow_prev.svg'
import styles from "./Filter.module.scss"

export const Filter = (props) => {
  const {
    title,
    items,
    selectedValues,
    onSelect
  } = props

  const isColorFilter = title === 'color'

  return (
    <>
      <details className={styles.accordeon}>
        <summary
          className={styles.title}
        >{title}
          <img className={styles.arrow} src={arrowIMG} alt="arrow"/>
        </summary>
        <div className={styles.content}>
          {items.map((item) => {
            const isActive = selectedValues === item.toLowerCase()

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  onSelect(item.toLowerCase())
                }

                className={`
                   ${styles.item}
                   ${isActive ? styles.active : isColorFilter ? styles.activeColor: ''}
                  `}
                style={isColorFilter ? { backgroundColor: item,} : {}}
              >
                {!isColorFilter && item}
              </button>
            )
          })}
        </div>
      </details>
      <span className={styles.separator}></span>

    </>
  )
}