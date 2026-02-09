import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(request: Request) {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { userId, role } = await request.json();

        if (!userId || !role) {
            return NextResponse.json({ error: 'User ID and Role are required' }, { status: 400 });
        }

        // Validate role
        if (!['user', 'admin'].includes(role)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        await query('UPDATE users SET role = $1 WHERE id = $2', [role, userId]);
        return NextResponse.json({ message: 'User role updated' });
    } catch (error) {
        console.error('Update role error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
