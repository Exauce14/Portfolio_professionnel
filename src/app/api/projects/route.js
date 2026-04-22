import { NextResponse } from 'next/server';
import { initDb } from '@/lib/initDb';
import Project from '@/lib/models/Project';

export async function GET() {
  try {
    await initDb();
    const projects = await Project.findAll();
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
