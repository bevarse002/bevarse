import React, { useState } from "react";
import styles from "../../pages/cart/cart.module.css";

type CartSummaryProps = {
  subtotal?: number;
  taxRate?: number;
  onApplyCoupon: (code: string) => void;
  grandTotal?: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal = 0,
  taxRate = 0.08,
  onApplyCoupon,
  grandTotal = 0,
}) => {
  const [coupon, setCoupon] = useState("");
  const tax = subtotal * taxRate;
  const total = (subtotal + tax).toFixed(2);

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.summaryHeading}>Order Summary</h2>
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
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