import React from "react";
import Link from "next/link";
import styles from "./checkout.module.css";

const ConfirmationPage: React.FC = () => (
  <div className={styles.checkoutPage} style={{ textAlign: "center", padding: "4rem 2rem" }}>
    <h1 className={styles.sectionTitle}>Thank You!</h1>
    <p>Your order has been placed successfully.</p>
    <Link href="/products">
      <button className={styles.checkoutButton}>Continue Shopping</button>
    </Link>
  </div>
);

export default ConfirmationPage;