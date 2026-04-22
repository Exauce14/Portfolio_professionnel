'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Composant de garde côté client : redirige vers /login si l'utilisateur n'est pas connecté
// Complète la protection du middleware Next.js (qui agit côté serveur sur les cookies)
export default function ProtectedRoute({ children }) {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !token) {
      router.push('/login');
    }
  }, [user, token, router]);

  // Affiche un spinner pendant la vérification ou la redirection
  if (!user && !token) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return children;
}
