import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import { getAllProjects } from '@/lib/controllers/projectsController';

export async function GET() {
  try {
    await initDb();
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
