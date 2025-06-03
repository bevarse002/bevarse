import React from 'react';
import styles from './Men.module.css';
import Link from 'next/link';
import { useCart } from '../../components/cart/CartContext';
import { useToast } from '../../components/toast/ToastContext';
import { menProducts } from '../../data/menProducts';
const MenPage: React.FC = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof menProducts[number]) => {
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      color: undefined,
      size: undefined
    });
    showToast('Added to cart');
  };

  return (
    <div className={styles.productsPage}>
      <h1 className={styles.heading}>Men's Collection</h1>
      <div className={styles.grid}>
        {menProducts.map(product => (
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
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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

export default MenPage;