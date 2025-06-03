import '../styles/globals.css';
import '../components/toast/toast.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Head from 'next/head';
import { CartProvider } from '../components/cart/CartContext';
import { ToastProvider } from '../components/toast/ToastContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js'; // Add this import



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [routeKey, setRouteKey] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      setRouteKey(prev => prev + 1);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
      <CartProvider>
        <ToastProvider>
          <Head>
            <title>BEVARSE</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <div className="fade-in-up" key={routeKey}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </ToastProvider>
      </CartProvider>
  );
}

export default MyApp;