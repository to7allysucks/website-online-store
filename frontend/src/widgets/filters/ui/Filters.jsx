import { Filter } from '../../../shared/ui/filter'
import styles from './Filters.module.scss'



export const Filters = () => {
    const MOCKS = [
        {
            id: 1,
            title: "Size",
            content: ['XS', 'S', 'M', 'L', 'XL', '2X']
        },
        {
            id: 2,
            title: "Category",
            content: ['Shirt', 'T-Shirt', 'Jeans', 'Shorts', 'Jackets']
        },
        {
            id: 3,
            title: "Colors",
            content: ['Red', 'Blue', 'Green', 'Purple', 'White', 'Black']
        },
        {
            id: 4,
            title: "Collections",
            content: ['XIV']
        }
    ]
    
    return (
        <div className={styles.wrapper}>
            <h4>Filters</h4>
            <ul className={styles.contentList} draggable={false} >
                {MOCKS.map(({id, title, content}) => (
                    <Filter title={title} items={content} key={id}/>
                ))}
        
            </ul>
        </div>
    )
}