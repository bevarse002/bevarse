import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './buynow.module.css';
import { products } from '../../data/products';
import { menProducts } from '../../data/menProducts';
import { womenProducts } from '../../data/womenProducts';
import { useCart } from '../../components/cart/CartContext';
import { useToast } from '../../components/toast/ToastContext';


const allProducts = [...products, ...menProducts, ...womenProducts];

const sizeOptions = ['S', 'M', 'L', 'XL'];
const colorOptions = ['Black', 'White', 'Red', 'Blue'];

const BuyNowPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const product = allProducts.find((p) => p.slug === slug);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [size, setSize] = useState(sizeOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className={styles.notFound}>Product not found.</div>;
  }

  const handleConfirmBuy = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      color: undefined ,
      size: undefined
    });
    showToast('Purchase successful!');
    router.push('/cart');
  };

  return (
    <div className={styles.buyNowPage}>
      <div className={styles.productImageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productDetails}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>${product.price}</p>
        <div className={styles.productDescription}></div>
        <div className={styles.options}>
          <div>
            <label>Size:</label>
            <select value={size} onChange={e => setSize(e.target.value)}>
              {sizeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Color:</label>
            <select value={color} onChange={e => setColor(e.target.value)}>
              {colorOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className={styles.quantityInput}
            />
          </div>
        </div>
        <button className={styles.buyButton} onClick={handleConfirmBuy}>
          Confirm Buy Now
        </button>
      </div>
    </div>
  );
};

export default BuyNowPage;