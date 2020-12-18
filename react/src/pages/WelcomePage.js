// Lib imports
import { useCallback, useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { getAllProductsAsync, getCartItems, searchProductAsync } from '../lib/backendService';
// Style and asset import
import styles from './WelcomePage.module.scss';
import banner from '../assets/banner.jpg';
import cookieImage from '../assets/cat-cookie.png';
import candyImage from '../assets/cat-keo.png';
import mochiImage from '../assets/cat-mochi.png';
import snackImage from '../assets/cat-snack.png';
import socolaImage from '../assets/cat-socola.png';
import allImage from '../assets/cat-all.png';

const CATEGORIES = [
  { name: 'All', img: allImage },
  { name: 'Bánh quy', img: cookieImage },
  { name: 'Kẹo dẻo', img: candyImage },
  { name: 'Bánh mochi', img: mochiImage },
  { name: 'Snack', img: snackImage },
  { name: 'Socola', img: socolaImage },
];

// Welcome Page definition
const Page = () => {
  const [products, setProducts] = useState(undefined); // product list to render
  const [category, setCategory] = useState('All'); // current category

  // Fetch all products
  useEffect(() => {
    category === 'All'
      ? getAllProductsAsync().then(res => setProducts(res.product_list))
      : searchProductAsync({ type: category }).then(res => setProducts(res.product_list));
  }, [category]);

  // Category change handler
  const changeCategoryHandler = e => {
    if (category !== e.target.category) {
      setCategory(e.target.value);
    }
  };

  return (
    <>
      <div id={styles.Banner}>
        <img src={banner} alt='' />
      </div>

      {/* Category */}
      <section>
        <div className={styles.sectionHeader}>
          <h1>Danh mục</h1>
        </div>
        <CategoryRenderer
          categories={CATEGORIES}
          changeCategoryHandler={changeCategoryHandler}
          currentCat={category}
        />
      </section>

      {/* Render when product list is fetched */}
      <section>
        <div className={styles.sectionHeader}>
          <h1>Sản phẩm nổi bật</h1>
        </div>
        <ProductRenderer products={products} />
      </section>
    </>
  );
};

// Render category switcher
const CategoryRenderer = ({ currentCat, categories, changeCategoryHandler }) => {
  return (
    <div id={styles.Category}>
      {Array.isArray(categories) &&
        categories.map((cat, index) => (
          <button
            key={`cat-${index}`}
            value={cat.name}
            className={currentCat === cat.name ? styles.highlight : ''}
            onClick={changeCategoryHandler}
          >
            <img src={cat.img} alt='' />
            <span>{cat.name}</span>
          </button>
        ))}
    </div>
  );
};

// Render multiple product cards in a grid
const ProductRenderer = ({ products }) => {
  const [cart, setCart] = useState();

  // initialize cart item list
  useEffect(() => {
    getCartItems().then(res => setCart(res.cart));
  }, []);

  const isInCart = product_id => cart.some(item => item.product_id === product_id);

  return (
    <div id={styles.ProdGrid}>
      {Array.isArray(products) && cart
        ? products.map((prod, index) =>
            index < 12 ? (
              <div key={index}>
                <ProductCard
                  key={index}
                  prod={prod}
                  added={isInCart(prod.product_id)}
                  updateCart={() => getCartItems().then(res => setCart(res.cart))}
                />
              </div>
            ) : null
          )
        : null}
    </div>
  );
};

export { Page as WelcomePage };
