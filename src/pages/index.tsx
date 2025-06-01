import Link from "next/link";
import ProductCarousel from '../components/carousel/ProductCarousel';
import HeroSection from '../components/hero/HeroSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductCarousel />
    </main>
  );
}