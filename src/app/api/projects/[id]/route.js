import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import { getProjectById } from '@/lib/controllers/projectsController';

// GET /api/projects/[id] — retourne un projet par son ID, 404 s'il n'existe pas
export async function GET(_request, { params }) {
  try {
    await initDb();
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
