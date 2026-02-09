import Link from 'next/link';
import styles from './auth.module.css'; // Reusing auth styles for consistency

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome</h1>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Secure Dashboard access. <br />
          Please log in or sign up to continue.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/login" className={styles.button} style={{ textDecoration: 'none', flex: 1 }}>
            Login
          </Link>
          <Link href="/signup" className={styles.button} style={{ textDecoration: 'none', background: 'transparent', border: '1px solid white', flex: 1 }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
