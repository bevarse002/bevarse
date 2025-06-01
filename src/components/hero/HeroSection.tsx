import React from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            Give Your Life{'\n'}A New Style
          </h1>
          <p className={styles.heroSubtitle}>
            Be Cool Look Cool, Own the Moment
          </p>
          <Link href="/auth/register" className={styles.heroRegister}>
            REGISTER
          </Link>
        </div>
        <div className={styles.heroRight}>
          <img
            src="/Eminem_hoodie.png"
            alt="Person in stylish hoodie"
            className={styles.heroImg}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;