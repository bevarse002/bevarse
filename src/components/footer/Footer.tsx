import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      {/* Brand & Newsletter */}
      <div className={styles.brandSection}>
        <div className={styles.brand}>
          <img src="/bevarselogo.png" alt="BEVARSE Logo" className={styles.logo} />
          <p className={styles.tagline}>Be Cool. Stay Cool.</p>
        </div>
        <form className={styles.newsletter} onSubmit={e => e.preventDefault()}>
          <label htmlFor="newsletter" className={styles.newsletterLabel}>Subscribe to our newsletter</label>
          <div className={styles.newsletterInputWrap}>
            <input
              id="newsletter"
              type="email"
              placeholder="Your email"
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterButton}>Subscribe</button>
          </div>
        </form>
        <div className={styles.payments}>
          <img src="/icons/visa.png" alt="Visa" />
          <img src="/icons/mastercard.png" alt="Mastercard" />
          <img src="/icons/paypal.png" alt="PayPal" />
        </div>
      </div>
      {/* Links */}
      <div className={styles.sections}>
        <div>
          <h4 className={styles.heading}>Shop</h4>
          <a href="/products" className={styles.link}>Products</a>
          <a href="/account" className={styles.link}>Account</a>
          <a href="/cart" className={styles.link}>Cart</a>
        </div>
        <div>
          <h4 className={styles.heading}>Customer Service</h4>
          <a href="/contact" className={styles.link}>Contact</a>
          <a href="/faq" className={styles.link}>FAQ</a>
          <a href="/returns" className={styles.link}>Returns</a>
          <a href="/shipping" className={styles.link}>Shipping</a>
        </div>
        <div>
          <h4 className={styles.heading}>Company</h4>
          <a href="/about" className={styles.link}>About</a>
          <a href="/careers" className={styles.link}>Careers</a>
          <a href="/register" className={styles.link}>Register</a>
        </div>
        <div>
          <h4 className={styles.heading}>Follow Us</h4>
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className={styles.socialIcon}>
              <img src="/icons/instagram.png" alt="" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" className={styles.socialIcon}>
              <img src="/icons/twitter.png" alt="" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className={styles.socialIcon}>
              <img src="/icons/facebook.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.bottom}>
      <span>&copy; {new Date().getFullYear()} BEVARSE. All rights reserved.</span>
      <div className={styles.legalLinks}>
        <a href="/privacy" className={styles.link}>Privacy Policy</a>
        <a href="/terms" className={styles.link}>Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;