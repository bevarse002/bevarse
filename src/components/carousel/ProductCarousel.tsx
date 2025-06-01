import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './ProductCarousel.module.css';
import Link from 'next/link';
import { products } from '../../data/products'; // Import product data

const ProductCarousel: React.FC = () => (
  <div className={styles.carouselWrapper}>
    <div className={styles.featuredText}>Featured</div>
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={24}
      slidesPerView={1}
      loop
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className={styles.swiper}
      breakpoints={{
        640: { slidesPerView: 1 },
        900: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.slug} className={styles.swiperSlide}>
          <Link href={`/products/${product.slug}`} passHref>
            <div className={styles.slide}>
              <img src={product.image} alt={product.name} className={styles.slideImg} />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ProductCarousel;