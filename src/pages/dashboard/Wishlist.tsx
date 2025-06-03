import React from "react";
import { useWishlist } from '../../components/wishlist/WishlistContext'; // adjust path if needed
import styles from "./Dashboard.module.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div>
      <h2 className={styles.sectionTitle}>Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className={styles.emptyMsg}>No items in wishlist.</div>
      ) : (
        <div>
          {wishlist.map(item => (
            <div key={item.id}>
              <img src={item.image} alt={item.name} width={80} />
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;