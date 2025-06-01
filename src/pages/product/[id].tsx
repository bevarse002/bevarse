import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
      {/* Fetch and display product details using the ID */}
    </main>
  );
}