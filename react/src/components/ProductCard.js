import { useEffect, useRef, useState } from 'react';
import { addCartItem, getProductImageUrl } from '../lib/backendService';
import styles from './ProductCard.module.scss';

// Trim long product names
const trimProductName = prodName => {
  if (typeof prodName == 'string') {
    let words = prodName.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).concat('...').join(' ');
    }
    return prodName;
  }
};

// Format price value
const formatPrice = prodPrice => {
  let formatPrice = String(prodPrice);
  formatPrice =
    formatPrice.slice(0, formatPrice.length - 3) + ',' + formatPrice.slice(formatPrice.length - 3);
  return formatPrice;
};

// Component definition - Product Card
// Render a product card and manage state
const MainComponent = props => {
  const [added, setAdded] = useState(props.added);
  const ref = useRef(null);

  useEffect(() => {
    setAdded(props.added);
  }, [props.added]);

  const addToCart = () => {
    if (!added) setAdded(true);
    ref.current.className = `${styles.plusOne} ${styles.show}`;
    setTimeout(() => {
      ref.current.className = `${styles.plusOne}`;
    }, 1000);

    addCartItem(props.prod).then(_ => {
      props.updateCart();
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.prodName}>{trimProductName(props.prod.name)}</div>
      <div className={styles.prodType}>{props.prod.type}</div>
      <div className={styles.prodPrice}>
        {formatPrice(parseFloat(props.prod.price) * 1000)}
        <span>đ</span>
      </div>
      <div className={styles.prodImage}>
        <img src={getProductImageUrl(props.prod.img)} alt='' />
      </div>
      <div className={styles.addToCartButton}>
        <button onClick={addToCart} className={added ? styles.added : ''}>
          {added ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
        </button>
      </div>
      <div ref={ref} className={styles.plusOne}>
        +1
      </div>
    </div>
  );
};

export { MainComponent as ProductCard };
