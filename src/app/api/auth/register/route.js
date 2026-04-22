import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import { register } from '@/lib/controllers/authController';

// POST /api/auth/register — crée un compte utilisateur (mot de passe min 6 caractères)
export async function POST(request) {
  try {
    await initDb();
    const { name, email, password } = await request.json();
    // Validation de longueur avant de passer au controller
    if (password && password.length < 6) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 6 caractères' }, { status: 400 });
    }
    const user = await register({ name, email, password });
    return NextResponse.json({ message: 'Compte créé avec succès', userId: user.id }, { status: 201 });
  } catch (err) {
    const status = err.message.includes('déjà utilisé') ? 400 : err.message.includes('requis') ? 400 : 500;
    return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status });
  }
}
