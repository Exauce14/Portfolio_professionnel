import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import { getAllProjects } from '@/lib/controllers/projectsController';

// GET /api/projects — retourne tous les projets triés par id croissant
export async function GET() {
  try {
    await initDb();
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
