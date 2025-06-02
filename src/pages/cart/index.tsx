import React, { useState } from 'react';
import styles from './cart.module.css';
import { useCart } from '../../components/cart/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';

const TAX_RATE = 0.08;

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  // Dummy coupon: 10% off
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + tax - discount;

  const handleApplyCoupon = (code: string) => {
    if (code.trim().toLowerCase() === "save10") {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      alert("Invalid coupon code");
    }
  };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.heading}>Your Cart</h1>
      <div className={styles.cartMain}>
        <div className={styles.cartList}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              Your cart is empty.<br />
              <a href="/products" className={styles.continueShoppingCTA}>
                Start Shopping
              </a>
            </div>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.slug}
                item={{
                  ...item,
                  size: typeof item.size === "string" ? item.size : (item.size != null ? String(item.size) : undefined),
                  color: typeof item.color === "string" ? item.color : (item.color != null ? String(item.color) : undefined),
                }}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className={styles.cartSummarySticky}>
            <CartSummary
              subtotal={subtotal}
              taxRate={TAX_RATE}
              onApplyCoupon={handleApplyCoupon}
              grandTotal={grandTotal}
            />
            {couponApplied && (
              <div className={styles.couponApplied}>Coupon applied: -10%</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;