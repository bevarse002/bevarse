import React, { useState } from "react";
import styles from "./cart.module.css";

type CartSummaryProps = {
  subtotal: number;
  taxRate?: number;
  onApplyCoupon: (code: string) => void;
  grandTotal: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  taxRate = 0.08,
  onApplyCoupon,
  grandTotal,
}) => {
  const [coupon, setCoupon] = useState("");
  const tax = subtotal * taxRate;

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.summaryHeading}>Order Summary</h2>
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Tax (8%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className={styles.summaryRowTotal}>
        <span>Grand Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
      <div className={styles.couponSection}>
        <input
          type="text"
          placeholder="Coupon code"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          className={styles.couponInput}
        />
        <button
          className={styles.couponBtn}
          onClick={() => onApplyCoupon(coupon)}
        >
          Apply
        </button>
      </div>
      <a href="/checkout">
        <button className={styles.checkoutButton}>Proceed to Checkout</button>
      </a>
      <a href="/products" className={styles.continueShopping}>
        &larr; Continue Shopping
      </a>
    </div>
  );
};

export default CartSummary;