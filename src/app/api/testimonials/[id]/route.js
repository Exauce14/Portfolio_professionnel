import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import Testimonial from '@/lib/models/Testimonial';

export async function GET(request, { params }) {
  try {
    await initDb();
    const t = await Testimonial.findByPk(params.id);
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    return NextResponse.json(t);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await initDb();
    const t = await Testimonial.findByPk(params.id);
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    const { name, message, rating } = await request.json();
    if (!name || !message) {
      return NextResponse.json({ error: 'Nom et message requis' }, { status: 400 });
    }
    await t.update({ name, message, rating: rating || t.rating });
    return NextResponse.json(t);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await initDb();
    const t = await Testimonial.findByPk(params.id);
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    await t.destroy();
    return NextResponse.json({ message: 'Témoignage supprimé' });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
