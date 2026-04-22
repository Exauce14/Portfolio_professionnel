import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET /api/photo — sert la photo de profil avec mise en cache 24h
// Centralisé ici plutôt qu'un <img src="/photo.jpeg"> pour contrôler les headers
export async function GET() {
  try {
    const imagePath = path.join(process.cwd(), 'public', 'photo.jpeg');
    const imageBuffer = fs.readFileSync(imagePath);
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // 24h
      },
    });
  } catch {
    return new NextResponse('Photo non trouvée', { status: 404 });
  }
}
