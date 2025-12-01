import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json(
            { 
                message: 'Login berhasil', 
                token, 
                user: { name: user.nama, email: user.email } 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
    }
}