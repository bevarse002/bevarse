import React from 'react';
import styles from './Products.module.css';
import Link from 'next/link';
import { products } from '../../data/products';
import { useCart } from '../cart/CartContext';
import { useToast } from '../../components/toast/ToastContext';
import { useWishlist } from '../../components/wishlist/WishlistContext';

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      size: undefined,
      color: undefined, // <-- add this line
    });
    showToast('Added to cart');
  };

  return (
    <div className={styles.productsPage}>
      <h1 className={styles.heading}>Our Products</h1>
      <div className={styles.grid}>
        {products.map(product => (
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
                <button
                  className={styles.addToCart}
                  type="button"
                  onClick={() =>
                    isInWishlist(product.slug)
                      ? removeFromWishlist(product.slug)
                      : addToWishlist({ ...product, id: product.slug })
                  }
                  aria-label={
                    isInWishlist(product.slug)
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    background: isInWishlist(product.slug) ? '#ffd600' : '#181818',
                    color: isInWishlist(product.slug) ? '#181818' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.7em 1.2em',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                  }}
                >
                  {isInWishlist(product.slug) ? '♥' : '♡'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;