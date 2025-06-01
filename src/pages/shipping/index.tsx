import React from 'react';
import styles from './shipping.module.css';

const ShippingPage: React.FC = () => (
  <div className={styles.shippingPage}>
    <h1 className={styles.heading}>Shipping Information</h1>
    <div className={styles.shippingList}>
      <div className={styles.shippingItem}>
        <div className={styles.shippingInfo}>
          <div className={styles.shippingName}>Shipping Methods</div>
          <div className={styles.shippingDesc}>
            We offer standard and express shipping options. Delivery times vary by location.
          </div>
        </div>
      </div>
      <div className={styles.shippingItem}>
        <div className={styles.shippingInfo}>
          <div className={styles.shippingName}>Tracking Orders</div>
          <div className={styles.shippingDesc}>
            You will receive a tracking link by email once your order ships.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShippingPage;