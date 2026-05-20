import { Tabs } from "../../../shared/ui/tabs/index.js";
import { COLLECTIONS } from "../../../shared/config/collections.js";
import styles from './XivCollections.module.scss'
import {useEffect, useState} from "react";
import {ProductCard} from "../../../entities/product/index.js";
import arrowImg from '../../../shared/assets/icons/arrow_prev.svg'
import {api} from "../../../shared/api/instanse.js";


export const XivCollections = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [productsByCollections, setProductsByCollections] = useState({
        all: [],
        men: [],
        women: [],
        kid: [],
    });

    useEffect(() => {
        api.get('/products',
            {
                params: {
                    limit: 20
                }
            }
        )
            .then(res => setProducts(res.data.items))
            .catch(err => console.log('Ошибка вывода продуктов:', err))
            .finally(() => setIsLoading(false))
    }, []);

    console.log(products)
    useEffect(() => {
        if (!products || products.length === 0) return;


        const PRODUCTS_BY_COLLECTIONS ={
            all: [...products].slice(0, 16),
            men: [],
            women: [],
            kid: [],
        }
        products.forEach((product, index) => {
            if ( index < 16 ) {
                PRODUCTS_BY_COLLECTIONS.men.push(product)
            } else if ( index < 32 ) {
                PRODUCTS_BY_COLLECTIONS.women.push(product)
            } else if ( index < 48 ) {
                PRODUCTS_BY_COLLECTIONS.kid.push(product)
            }
        })

        setProductsByCollections(PRODUCTS_BY_COLLECTIONS)
    }, [products])



  const [activeTab, setActiveTab] = useState('all')
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropDown = () => setIsOpen(!isOpen)
    const activeProducts = productsByCollections[activeTab] || []
    const visibleProducts = isOpen ? activeProducts : activeProducts.slice(0, 4)

    console.log(productsByCollections)

  return (
    <div className={styles.wrapper}>
      <h2>xiv<br/>collections<br/>23-24</h2>
      <Tabs
        tabs={COLLECTIONS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className={styles.grid}>
          {(isLoading ?
              <div>Loading...</div> :
                  visibleProducts.map(product =>  <ProductCard key={product.id} product={product}/>)
          )}
      </div>
      <div className={styles.dropDownWrapper}>
          <button
            className={styles.dropDownBtn}
            onClick={toggleDropDown}
          >More
            <img  className={`${styles.arrowDropDown} ${isOpen ? styles.active : ''} `} src={arrowImg} alt="arrow"/>
          </button>
      </div>
    </div>
  );
};
