import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import Project from '@/lib/models/Project';

export async function GET(_request, { params }) {
  try {
    await initDb();
    const { id } = await params;
    const project = await Project.findByPk(id);
    if (!project) return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
