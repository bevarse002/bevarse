import React from 'react';
import styles from './faq.module.css';

const FAQPage: React.FC = () => (
  <div className={styles.faqPage}>
    <h1 className={styles.heading}>Frequently Asked Questions</h1>
    <div className={styles.faqList}>
      <div className={styles.faqItem}>
        <div className={styles.faqInfo}>
          <div className={styles.faqQuestion}>How do I place an order?</div>
          <div className={styles.faqAnswer}>
            Browse products, add to cart, and proceed to checkout.
          </div>
        </div>
      </div>
      <div className={styles.faqItem}>
        <div className={styles.faqInfo}>
          <div className={styles.faqQuestion}>What payment methods do you accept?</div>
          <div className={styles.faqAnswer}>
            We accept credit cards, PayPal, and more.
          </div>
        </div>
      </div>
      <div className={styles.faqItem}>
        <div className={styles.faqInfo}>
          <div className={styles.faqQuestion}>How can I contact support?</div>
          <div className={styles.faqAnswer}>
            Visit our Contact page or email support@bevarse.com.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FAQPage;