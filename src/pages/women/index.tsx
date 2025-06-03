import React from 'react';
import styles from './Women.module.css';
import Link from 'next/link';
import { useCart } from '../../components/cart/CartContext';
import { useToast } from '../../components/toast/ToastContext';
import { womenProducts } from '../../data/womenProducts';

const WomenPage: React.FC = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof womenProducts[number]) => {
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      size: undefined,
      color: undefined
    });
    showToast('Added to cart');
  };

  return (
    <div className={styles.productsPage}>
      <h1 className={styles.heading}>Women's Collection</h1>
      <div className={styles.grid}>
        {womenProducts.map(product => (
          <div className={styles.card} key={product.slug}>
            <div className={styles.productName}>{product.name}</div>
            <Link href={`/products/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <div className={styles.productInfo}>
              <div className={styles.productPrice}>${product.price}</div>
              <div className={styles.buttonRow}>
                 <button
                  className={styles.addToCart}
                  type="button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenPage;