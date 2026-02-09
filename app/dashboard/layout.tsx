'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>Dashboard</div>
                <nav className={styles.nav}>
                    <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
                        Overview
                    </Link>
                    {/* Add more links here if needed */}
                </nav>
                <button onClick={handleLogout} className={styles.logout}>
                    Log Out
                </button>
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
