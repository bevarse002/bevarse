import React from "react";
import styles from "./Dashboard.module.css";

const Overview = ({ user, stats }: { user: { name: string; image?: string }, stats: any }) => (
  <div className={styles.overview}>
    <h2>Welcome, {user.name}</h2>
    <div className={styles.statsRow}>
      <div className={styles.statBox}>
        <div className={styles.statNum}>{stats.orders}</div>
        <div className={styles.statLabel}>Orders</div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statNum}>{stats.wishlist}</div>
        <div className={styles.statLabel}>Wishlist</div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statNum}>{stats.shipping}</div>
        <div className={styles.statLabel}>Shipping</div>
      </div>
    </div>
  </div>
);

export default Overview;