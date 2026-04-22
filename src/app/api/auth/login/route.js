import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import { login } from '@/lib/controllers/authController';

export async function POST(request) {
  try {
    await initDb();
    const { email, password } = await request.json();
    const result = await login({ email, password });
    return NextResponse.json(result);
  } catch (err) {
    const status = err.message.includes('requis') ? 400 : 401;
    return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status });
  }
}
