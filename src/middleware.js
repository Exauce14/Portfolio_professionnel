import { NextResponse } from 'next/server';

// Pages publiques (sans connexion)
const PUBLIC_ONLY = ['/login', '/register']; // redirige vers / si déjà connecté
const ALWAYS_PUBLIC = ['/']; // toujours accessible

export function middleware(request) {
  const { pathname } = request.nextUrl;

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

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
