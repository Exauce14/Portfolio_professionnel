import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import { verifyAdmin } from '@/lib/authHelper';
import {
  getTestimonialById,
  updateTestimonial,
  approveTestimonial,
  deleteTestimonial,
} from '@/lib/controllers/testimonialsController';

export async function GET(_request, { params }) {
  try {
    await initDb();
    const { id } = await params;
    const t = await getTestimonialById(id);
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
    const { name, message, rating } = await request.json();
    const t = await updateTestimonial(id, { name, message, rating });
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    return NextResponse.json(t);
  } catch (err) {
    const status = err.message.includes('requis') ? 400 : 500;
    return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status });
  }
}

export async function PATCH(request, { params }) {
  try {
    await initDb();
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    const { id } = await params;
    const { approved } = await request.json();
    const t = await approveTestimonial(id, approved);
    if (!t) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    return NextResponse.json(t);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    await initDb();
    const { id } = await params;
    const deleted = await deleteTestimonial(id);
    if (!deleted) return NextResponse.json({ error: 'Témoignage non trouvé' }, { status: 404 });
    return NextResponse.json({ message: 'Témoignage supprimé' });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
