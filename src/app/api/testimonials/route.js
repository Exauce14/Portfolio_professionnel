import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import { verifyAdmin } from '@/lib/authHelper';
import { getAllTestimonials, createTestimonial } from '@/lib/controllers/testimonialsController';

// GET /api/testimonials
// Admin : reçoit tous les témoignages (approuvés et en attente)
// Utilisateur normal : reçoit uniquement les témoignages approuvés
export async function GET(request) {
  try {
    await initDb();
    const isAdmin = verifyAdmin(request);
    const testimonials = await getAllTestimonials(!isAdmin);
    return NextResponse.json(testimonials);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/testimonials — crée un témoignage
// Si c'est l'admin qui poste, il est automatiquement approuvé
export async function POST(request) {
  try {
    await initDb();
    const isAdmin = verifyAdmin(request);
    const { name, message, rating, userId } = await request.json();
    const testimonial = await createTestimonial({ name, message, rating, userId, approved: isAdmin });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    const status = err.message.includes('requis') ? 400 : 500;
    return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status });
  }
}
