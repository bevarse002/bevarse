import React, { useState } from 'react';
import styles from './contact.module.css';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className={styles.contactMain}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question, suggestion, or just want to say hi? We’d love to hear from you!
        </p>
      </section>
      <section className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.heading}>Get in Touch</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Your Message"
              required
              rows={5}
            />
            <button className={styles.button} type="submit">
              Send Message
            </button>
            {submitted && (
              <div className={styles.success}>Thank you! We’ll get back to you soon.</div>
            )}
          </form>
        </div>
        <div className={styles.card}>
          <h2 className={styles.heading}>Contact Info</h2>
          <ul className={styles.infoList}>
            <li>Email: <a href="mailto:support@bevarse.com">support@bevarse.com</a></li>
            <li>Instagram: <a href="https://instagram.com/bevarse" target="_blank" rel="noopener">bevarse</a></li>
            <li>Twitter: <a href="https://twitter.com/bevarse" target="_blank" rel="noopener">@bevarse</a></li>
          </ul>
          <p className={styles.infoNote}>
            Our team typically replies within 24 hours on business days.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;