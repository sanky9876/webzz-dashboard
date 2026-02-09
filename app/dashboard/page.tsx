import { getSession } from '@/lib/auth';
import AdminDashboard from '@/components/AdminDashboard';
import UserDashboard from '@/components/UserDashboard';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <>
            {session.role === 'admin' ? (
                <AdminDashboard />
            ) : (
                <UserDashboard session={session} />
            )}
        </>
    );
}
