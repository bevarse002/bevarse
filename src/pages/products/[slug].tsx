import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { products } from '../../data/products';
import { menProducts } from '@/data/menProducts';
import { womenProducts } from '@/data/womenProducts';
import { useCart } from '../cart/CartContext';
import { useToast } from '../../components/toast/ToastContext';
import { useWishlist } from '../../components/wishlist/WishlistContext'; // adjust path as needed
import styles from './Products.module.css';

type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  shortDesc?: string;
  longDesc?: string;
};

const allProducts: Product[] = [...products, ...menProducts, ...womenProducts];
const sizeOptions = ['S', 'M', 'L', 'XL'];

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Find product from all sources
  const product = allProducts.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  if (!product) return <div className={styles.notFound}>Product not found.</div>;

  // Only include quantity if your CartItem supports it
  const handleAddToCart = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize,
      // Remove quantity if not supported by CartItem type
      ...(typeof quantity === "number" ? { quantity } : {}),
      color: undefined
    });
    showToast('Added to cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  // Use description for both short and long desc if shortDesc/longDesc not present
  const shortDesc = product.shortDesc || product.description || "A premium product for your style.";
  const longDesc = product.longDesc || product.description || "This product is made from the finest materials and designed for comfort and style. Perfect for any occasion.";

  return (
    <div className={styles.dedicatedProductPage}>
      <div className={styles.imageSection}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImageLarge}
          onClick={() => setShowModal(true)}
          style={{ cursor: 'zoom-in' }}
        />
        {showModal && (
          <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.modalImage}
              onClick={e => e.stopPropagation()}
            />
            <button
              className={styles.closeModal}
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}
      </div>
      <div className={styles.infoSection}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <div className={styles.productPrice}>${product.price}</div>
        <div className={styles.shortDesc}>{shortDesc}</div>
        <div className={styles.selectorRow}>
          <label className={styles.selectorLabel}>Size:</label>
          <div className={styles.sizeOptions}>
            {sizeOptions.map((size) => (
              <button
                key={size}
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                onClick={() => setSelectedSize(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.selectorRow}>
          <label className={styles.selectorLabel}>Quantity:</label>
          <div className={styles.quantitySelector}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >-</button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
              className={styles.qtyInput}
            />
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => q + 1)}
            >+</button>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
          <button className={styles.buyButton} onClick={handleBuyNow}>Buy Now</button>
          <button
            className={`${styles.addToCart} ${isInWishlist(product.slug) ? styles.wishlisted : ''}`}
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
          >
            {isInWishlist(product.slug) ? '♥' : '♡'}
          </button>
        </div>
        <div className={styles.estimatedDelivery}>
          Estimated delivery: <span>Jun 8 - Jun 12</span>
        </div>
        <div className={styles.longDesc}>
          {longDesc}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;