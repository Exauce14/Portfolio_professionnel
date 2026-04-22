import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import Testimonial from '@/lib/models/Testimonial';

export async function GET() {
  try {
    await initDb();
    const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
    return NextResponse.json(testimonials);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await initDb();
    const { name, message, rating, userId } = await request.json();
    if (!name || !message) {
      return NextResponse.json({ error: 'Nom et message requis' }, { status: 400 });
    }
    const testimonial = await Testimonial.create({ name, message, rating: rating || 5, userId });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
