import React, { useState, useEffect } from 'react';
import { signUp, signIn } from '../../lib/auth';
import Link from 'next/link';
import styles from './account.module.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient'; // adjust path if needed
import { useCart } from '../../components/cart/CartContext'; // adjust the path if needed

const Account: React.FC = () => {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  // Shared state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Only for signup
  const [name, setName] = useState('');
  // Feedback
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { clearCart } = useCart(); // Destructure clearCart from useCart

  useEffect(() => {
    if (router.query.verified === 'true') {
      setSuccess('Email verified successfully! Please sign in.');
      setMode('signin');
    }
  }, [router.query]);

  useEffect(() => {
    // Fetch user info if signed in
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
  }, []);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(
  `Registration successful! Please verify your email (${email}) before signing in.`
    );  
    if (!email || !password || !name) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    const { error } = await signUp(email, password, name);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        `Registration successful! Please check your email (${email}) for a verification link before signing in.`
      );
      resetForm();
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Both fields are required.');
      setLoading(false);
      return;
    }
    const { data, error } = await signIn(email, password);
    if (error) {
      // Supabase returns a specific error for unverified emails
      if (error.message.toLowerCase().includes('email not confirmed')) {
        setError('Please verify your email before signing in. Check your inbox.');
      } else {
        setError(error.message);
      }
    } else if (data?.user && !data.user.email_confirmed_at) {
      setError('Please verify your email before signing in. Check your inbox.');
    } else {
      setSuccess('Sign in successful! Redirecting...');
      resetForm();
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    }
    setLoading(false);
  };

  const handleShowPassword = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 2000); // Hide after 2 seconds
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("wishlist");
    localStorage.removeItem("cart");
    clearCart && clearCart();
    setUser(null);
    setMode('signin');
    setSuccess('');
    setError('');
    router.push('/');
  };

  if (user) {
    return (
      <main className={styles.accountMain}>
        <section className={styles.userInfoCard}>
          <h2 className={styles.userInfoTitle}>Account Information</h2>
          <div className={styles.userInfoRow}>
            <span className={styles.userInfoLabel}>Name:</span>
            <span className={styles.userInfoValue}>{user.user_metadata?.name || 'N/A'}</span>
          </div>
          <div className={styles.userInfoRow}>
            <span className={styles.userInfoLabel}>Email:</span>
            <span className={styles.userInfoValue}>{user.email}</span>
          </div>
          <div className={styles.userInfoRow}>
            <span className={styles.userInfoLabel}>Account Created:</span>
            <span className={styles.userInfoValue}>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.accountMain}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>
          {mode === 'signup' ? 'Create Your Account' : 'Sign In'}
        </h1>
        <p className={styles.subtitle}>
          {mode === 'signup'
            ? 'Sign up to access your dashboard, wishlist, and orders.'
            : 'Welcome back! Sign in to your account.'}
        </p>
      </motion.section>
      <motion.section
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      >
        {success && (
          <div className={styles.verifyMsg}>
            {success}
          </div>
        )}
        
        <motion.form
          className={styles.card}
          onSubmit={mode === 'signup' ? handleRegister : handleSignIn}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
        >
          {mode === 'signup' && (
            <>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </>
          )}
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label className={styles.label}>Password</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={handleShowPassword}
              style={{ marginLeft: 8, padding: '0.5em 1em' }}
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {success && (
            <div className={styles.verifyMsg}>
              {success}
            </div>
          )}
          <button
            className={styles.submitBtn}
            type="submit"
            disabled={loading}
          >
            {loading
              ? mode === 'signup'
                ? 'Registering...'
                : 'Signing in...'
              : mode === 'signup'
              ? 'Sign Up'
              : 'Sign In'}
          </button>
          <div className={styles.altLinks}>
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className={styles.link}
                  onClick={() => {
                    setMode('signin');
                    resetForm();
                  }}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  className={styles.link}
                  onClick={() => {
                    setMode('signup');
                    resetForm();
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </motion.form>
      </motion.section>
    </main>
  );
};

export default Account;