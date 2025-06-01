import React from "react";
import styles from "./cart.module.css";

type CartItemProps = {
  item: {
    slug: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string | undefined;
    color: string | undefined;
  };
  onRemove: (slug: string) => void;
  onUpdateQuantity: (slug: string, quantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => (
  <div className={styles.cartItem}>
    <a href={`/products/${item.slug}`}>
      <img src={item.image} alt={item.name} className={styles.cartImg} />
    </a>
    <div className={styles.cartInfo}>
      <div className={styles.cartName}>{item.name}</div>
      <div className={styles.cartDetails}>
        {item.size && <span>Size: {item.size}</span>}
       
      </div>
      <div className={styles.cartPrice}>${item.price.toFixed(2)} each</div>
      <div className={styles.cartQty}>
        Qty:
        <button
          className={styles.qtyBtn}
          onClick={() => onUpdateQuantity(item.slug, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >-</button>
        <span className={styles.qtyNum}>{item.quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => onUpdateQuantity(item.slug, item.quantity + 1)}
        >+</button>
      </div>
      <div className={styles.cartTotalPerItem}>
        Total: ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button
        className={styles.removeBtn}
        onClick={() => onRemove(item.slug)}
      >
        Remove
      </button>
    </div>
  </div>
);

export default CartItem;