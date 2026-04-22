import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import Testimonial from '@/lib/models/Testimonial';
import { verifyAdmin } from '@/lib/authHelper';

export async function GET(request) {
  try {
    await initDb();
    const isAdmin = verifyAdmin(request);
    const where = isAdmin ? {} : { approved: true };
    const testimonials = await Testimonial.findAll({ where, order: [['createdAt', 'DESC']] });
    return NextResponse.json(testimonials);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await initDb();
    const isAdmin = verifyAdmin(request);
    const { name, message, rating, userId } = await request.json();
    if (!name || !message) {
      return NextResponse.json({ error: 'Nom et message requis' }, { status: 400 });
    }
    const testimonial = await Testimonial.create({
      name, message, rating: rating || 5, userId,
      approved: isAdmin,
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
