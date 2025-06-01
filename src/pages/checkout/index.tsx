import React, { useState } from 'react';
import styles from './checkout.module.css';
import { useCart } from '../cart/CartContext';
import { useToast } from '../../components/toast/ToastContext';
import { useRouter } from 'next/router';

const steps = ['Address', 'Shipping & Payment', 'Review'];

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    card: '',
    expiry: '',
    cvc: '',
    shipping: 'standard',
  });
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      showToast('Order placed successfully!');
      clearCart();
      router.push('/checkout/confirmation');
    }, 1500);
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.summarySection}>
        <h2 className={styles.sectionTitle}>Order Summary</h2>
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.slug} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartImage} />
              <div>
                <div className={styles.cartName}>{item.name}</div>
                <div className={styles.cartDetails}>
                  {item.size && <span>Size: {item.size}</span>}
                  <span>Qty: {item.quantity || 1}</span>
                </div>
              </div>
              <div className={styles.cartPrice}>${(item.price * (item.quantity || 1)).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        <div className={styles.totalRow}>
          <span>Total</span>
          <span className={styles.totalPrice}>${total.toFixed(2)}</span>
        </div>
      </div>
      <form className={styles.formSection} onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        <div className={styles.stepsRow}>
          {steps.map((s, i) => (
            <span key={s} className={i === step ? styles.activeStep : styles.step}>{s}</span>
          ))}
        </div>
        {step === 0 && (
          <>
            <h2 className={styles.sectionTitle}>Address</h2>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>ZIP</label>
                <input name="zip" value={form.zip} onChange={handleChange} required />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <input name="country" value={form.country} onChange={handleChange} required />
            </div>
            <button className={styles.checkoutButton} type="button" onClick={nextStep}>
              Next: Shipping & Payment
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className={styles.sectionTitle}>Shipping & Payment</h2>
            <div className={styles.formGroup}>
              <label>Shipping Method</label>
              <select name="shipping" value={form.shipping} onChange={handleChange}>
                <option value="standard">Standard (Free)</option>
                <option value="express">Express (+$10)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input name="card" value={form.card} onChange={handleChange} required />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Expiry</label>
                <input name="expiry" value={form.expiry} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>CVC</label>
                <input name="cvc" value={form.cvc} onChange={handleChange} required />
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.checkoutButton} type="button" onClick={prevStep}>
                Back
              </button>
              <button className={styles.checkoutButton} type="button" onClick={nextStep}>
                Next: Review
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className={styles.sectionTitle}>Review & Place Order</h2>
            <div className={styles.reviewBox}>
              <div><b>Name:</b> {form.name}</div>
              <div><b>Email:</b> {form.email}</div>
              <div><b>Address:</b> {form.address}, {form.city}, {form.zip}, {form.country}</div>
              <div><b>Shipping:</b> {form.shipping}</div>
              <div><b>Card:</b> **** **** **** {form.card.slice(-4)}</div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.checkoutButton} type="button" onClick={prevStep}>
                Back
              </button>
              <button className={styles.checkoutButton} type="submit" disabled={submitting}>
                {submitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CheckoutPage;