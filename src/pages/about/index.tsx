import React from 'react';
import styles from './about.module.css';

const About: React.FC = () => (
  <main className={styles.aboutMain}>
    <section className={styles.hero}>
      <h1 className={styles.title}>About BEVARSE</h1>
      <p className={styles.subtitle}>
        Where Style Meets Fandom. For the Bold, the Young, and the Unique.
      </p>
    </section>
    <section className={styles.content}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Who We Are</h2>
        <p>
          BEVARSE is a next-generation e-commerce destination for young trendsetters aged 12–26. 
          We blend pop culture, anime, Hollywood, and quirky vibes into premium hoodies, t-shirts, and streetwear.
        </p>
      </div>
      <div className={styles.card}>
        <h2 className={styles.heading}>Our Mission</h2>
        <p>
          To empower youth to express themselves through fashion that’s bold, fun, and always authentic. 
          We believe in celebrating individuality and making every day a statement.
        </p>
      </div>
      <div className={styles.card}>
        <h2 className={styles.heading}>Why Shop With Us?</h2>
        <ul>
          <li>Exclusive, limited-edition drops</li>
          <li>Premium quality & comfort</li>
          <li>Designs inspired by anime, movies, and internet culture</li>
          <li>Fast, reliable shipping</li>
          <li>Easy returns & friendly support</li>
        </ul>
      </div>
    </section>
    <section className={styles.aboutMeFull}>
      <div className={styles.portraitFrame}>
        <img src="/myself.jpg" alt="Developer" className={styles.portraitImage} />
        <div className={styles.portraitCaption}>
          <h2 className={styles.heading}>About the Developer</h2>
          <p>
            I’m a solo developer who built BEVARSE from scratch, powered by passion and the help of AI.<br />
            Every line of code and every detail is crafted to deliver a unique experience for you.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default About;