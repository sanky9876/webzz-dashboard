import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { email, password, role } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // Validate role
        const validRoles = ['user', 'admin'];
        const userRole = validRoles.includes(role) ? role : 'user';

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert user
        await query(
            'INSERT INTO users (email, password_hash, role, approved) VALUES ($1, $2, $3, $4)',
            [email, passwordHash, userRole, false]
        );

        return NextResponse.json({ message: 'User registered successfully. Please wait for admin approval.' });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
