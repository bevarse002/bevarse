import React from 'react';
import styles from './returns.module.css';

const ReturnsPage: React.FC = () => (
  <div className={styles.returnsPage}>
    <h1 className={styles.heading}>Returns & Refunds</h1>
    <div className={styles.returnsList}>
      <div className={styles.returnsItem}>
        <div className={styles.returnsInfo}>
          <div className={styles.returnsName}>Return Policy</div>
          <div className={styles.returnsDesc}>
            You can return most items within 30 days of delivery for a full refund. Items must be unused and in original packaging.
          </div>
        </div>
      </div>
      <div className={styles.returnsItem}>
        <div className={styles.returnsInfo}>
          <div className={styles.returnsName}>How to Request a Return</div>
          <div className={styles.returnsDesc}>
            Contact our support team with your order number and reason for return.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReturnsPage;