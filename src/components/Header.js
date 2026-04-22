'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';

// Liens de navigation communs au desktop et au menu mobile
const navLinks = [
  { href: '/',             label: 'Accueil' },
  { href: '/projects',     label: 'Projets' },
  { href: '/testimonials', label: 'Témoignages' },
];

// Barre de navigation sticky — adapte son contenu selon l'état de connexion
export default function Header() {
  const dispatch  = useDispatch();
  const router    = useRouter();
  const pathname  = usePathname();
  const { user }  = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        <CodeIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 0, fontWeight: 700, color: 'white', textDecoration: 'none', mr: 4 }}
        >
          Exauce Ngolo
        </Typography>

        {/* Navigation desktop (masquée sur mobile) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexGrow: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              sx={{
                color: 'white',
                // Soulignement blanc sur la route active pour indiquer la page courante
                fontWeight:   pathname === link.href ? 700 : 400,
                borderBottom: pathname === link.href ? '2px solid white' : '2px solid transparent',
                borderRadius: 0,
                px: 1.5,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Zone auth desktop : affiche le nom de l'utilisateur ou les boutons connexion/inscription */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Chip
                avatar={<Avatar sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 700 }}>{user.name.charAt(0)}</Avatar>}
                label={user.name}
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', border: '1px solid' }}
              />
              <Button variant="outlined" onClick={handleLogout} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} href="/login" sx={{ color: 'white' }}>Connexion</Button>
              <Button component={Link} href="/register" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)', '&:hover': { borderColor: 'white' } }}>
                Inscription
              </Button>
            </>
          )}
        </Box>

        {/* Bouton hamburger visible uniquement sur mobile */}
        <IconButton sx={{ display: { md: 'none' }, ml: 'auto', color: 'white' }} onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer mobile — s'ouvre depuis la droite */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} onClick={() => setDrawerOpen(false)} selected={pathname === link.href}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {user ? (
              <ListItem disablePadding>
                <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                  <ListItemText primary="Déconnexion" sx={{ color: 'error.main' }} />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/login" onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary="Connexion" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/register" onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary="Inscription" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
