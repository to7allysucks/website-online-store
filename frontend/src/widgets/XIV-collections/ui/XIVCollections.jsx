import { Tabs } from "../../../shared/ui/tabs/index.js";
import { COLLECTIONS } from "../../../shared/config/collections.js";
import styles from './XivCollections.module.scss'
import {use, useState} from "react";
import {ProductCard} from "../../../entities/product/index.js";
import arrowImg from '../../../shared/assets/icons/arrow_prev.svg'


export const XivCollections = () => {

  const MOCK_PRODUCTS = [
    {
      id:'1',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'2',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['black','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'3',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: null,
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'4',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['red','white','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'5',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'6',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'7',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
    {
      id:'8',
      title: 'Embroidered Seersucker Shirt',
      material: 'V-Neck',
      price: 99,
      category: 'T-Shirt',
      colors: ['white','red','blue'],
      images: [{url: 'https://placehold.co/300x300', is_main: true}]
    },
  ]

  const PRODUCTS_BY_COLLECTIONS ={
    all: [...MOCK_PRODUCTS],
    men: [...MOCK_PRODUCTS],
    women: [...MOCK_PRODUCTS],
    kid: [...MOCK_PRODUCTS],
  }

  const [activeTab, setActiveTab] = useState('all')
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropDown = () => setIsOpen(!isOpen)

  const products = PRODUCTS_BY_COLLECTIONS[activeTab]

  const visibleProducts = isOpen ? products : products.slice(0, 4)

  return (
    <div className={styles.wrapper}>
      <h2>xiv<br/>collections<br/>23-24</h2>

      <Tabs
        tabs={COLLECTIONS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className={styles.grid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))}
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
