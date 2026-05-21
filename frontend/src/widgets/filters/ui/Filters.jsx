import { Filter } from '../../../shared/ui/filter'
import styles from './Filters.module.scss'
import arrowIMG from '../../../shared/assets/icons/arrow_prev.svg'


export const Filters = ({filters, setFilters}) => {
    const MOCKS = [
        {
            id: 1,
            key: "size",
            title: "size",
            content: ['XS', 'S', 'M', 'L', 'XL', '2X']
        },
        {
            id: 2,
            key: "category",
            title: "category",
            content: ['Shirt', 'T-Shirt', 'Jeans', 'Shorts', 'Jackets']
        },
        {
            id: 3,
            key: "color",
            title: "color",
            content: ['Red', 'Blue', 'Green', 'Purple', 'White', 'Black']
        },
        {
            id: 4,
            key: "collections",
            title: "collections",
            content: ['XIV']
        }
    ]
    const toggleFilter = (type, value) => {

        setFilters(prev => ({
            ...prev,
            [type]:
                prev[type] === value
                    ? ''
                    : value
        }))
    }

    const resetFilters = () => {

        setFilters({
            size: '',
            category: '',
            color: '',
            collection: '',
        })
    }
    return (
        <div className={styles.wrapper}>
            <h4>Filters <img className={styles.arrow} src={arrowIMG} alt="arrow"/></h4>
            <ul className={styles.contentList} draggable={false} >
                {MOCKS.map(({id, title, content, key}) => (
                    <Filter
                        title={key}
                        items={content}
                        key={id}
                        selectedValues={filters[key]}
                        onSelect={(value) => {
                            toggleFilter(key, value.toLowerCase());
                        }}
                    />
                ))}
            </ul>
        </div>
    )
}