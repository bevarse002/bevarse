import React from "react";
import styles from "./Dashboard.module.css";

const WishlistItem = ({ item, onAddToCart, onRemove }: { item: any, onAddToCart: () => void, onRemove: () => void }) => (
  <div className={styles.wishlistItem}>
    <img src={item.image} alt={item.name} className={styles.wishlistImg} />
    <div>
      <div>{item.name}</div>
      <div>${item.price}</div>
      <button className={styles.addToCartBtn} onClick={onAddToCart}>Add to Cart</button>
      <button className={styles.removeBtn} onClick={onRemove}>Remove</button>
    </div>
  </div>
);

export default WishlistItem;