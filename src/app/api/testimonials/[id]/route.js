import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import Testimonial from '@/lib/models/Testimonial';
import { verifyAdmin } from '@/lib/authHelper';

export async function GET(_request, { params }) {
  try {
    await initDb();
    const { id } = await params;
    const t = await Testimonial.findByPk(id);
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    return NextResponse.json(t);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await initDb();
    const { id } = await params;
    const t = await Testimonial.findByPk(id);
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

export async function PATCH(request, { params }) {
  try {
    await initDb();
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    const { id } = await params;
    const t = await Testimonial.findByPk(id);
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    const { approved } = await request.json();
    await t.update({ approved });
    return NextResponse.json(t);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await initDb();
    const { id } = await params;
    const t = await Testimonial.findByPk(id);
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    await t.destroy();
    return NextResponse.json({ message: 'Témoignage supprimé' });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
