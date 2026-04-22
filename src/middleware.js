import { NextResponse } from 'next/server';

// Routes accessibles uniquement sans connexion (redirige vers / si déjà connecté)
const PUBLIC_ONLY = ['/login', '/register'];
// Routes toujours accessibles, connecté ou non
const ALWAYS_PUBLIC = ['/'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Laisse passer les fichiers internes Next.js et toutes les routes API sans vérification
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  // L'accueil est toujours accessible
  if (ALWAYS_PUBLIC.includes(pathname)) {
    return NextResponse.next();
  }

  // Login/register : si déjà connecté → rediriger vers /
  if (PUBLIC_ONLY.some((p) => pathname === p)) {
    if (token) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  // Toutes les autres pages : connexion obligatoire
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Applique le middleware à toutes les routes sauf les fichiers statiques Next.js
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
