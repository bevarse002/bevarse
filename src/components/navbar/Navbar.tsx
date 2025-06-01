import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../pages/cart/CartContext';
import styles from './Navbar.module.css';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/men', label: 'MEN' },
  { href: '/women', label: 'WOMEN' },
  { href: '/products', label: 'SHOPPING' },
  { href: '/cart', label: 'CART' },
  { href: '/dashboard', label: 'DASHBOARD' },
  { href: '/account', label: 'ACCOUNT' },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img
          src="/bevarselogo.png"
          alt="BEVARSE Logo"
          className={styles.logoImg}
        />
      </div>
      <div className={styles.navLinks}>
        {navItems.map((item) => {
          if (item.label === 'CART') {
            return (
              <div key={item.label} className={styles.cartNavWrapper}>
                {cartCount > 0 && (
                  <span className={styles.cartBadge}>{cartCount}</span>
                )}
                <Link href={item.href} legacyBehavior>
                  <a
                    className={
                      router.pathname === item.href
                        ? `${styles.navLink} ${styles.active}`
                        : styles.navLink
                    }
                    aria-current={
                      router.pathname === item.href ? 'page' : undefined
                    }
                    tabIndex={router.pathname === item.href ? -1 : 0}
                  >
                    {item.label}
                  </a>
                </Link>
              </div>
            );
          }
          return (
            <Link href={item.href} key={item.label} legacyBehavior>
              <a
                className={
                  router.pathname === item.href
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                aria-current={
                  router.pathname === item.href ? 'page' : undefined
                }
                tabIndex={router.pathname === item.href ? -1 : 0}
              >
                {item.label}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;