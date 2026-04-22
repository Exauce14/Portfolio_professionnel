'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearMessages } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, success, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) router.push('/');
    return () => { dispatch(clearMessages()); };
  }, [user, router, dispatch]);

  useEffect(() => {
    if (success) setTimeout(() => router.push('/login'), 2000);
  }, [success, router]);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Le nom doit contenir au moins 2 caractères';
    if (!form.email) e.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.password) e.password = 'Le mot de passe est requis';
    else if (form.password.length < 6) e.password = 'Au moins 6 caractères requis';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Les mots de passe ne correspondent pas';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setErrors({});
    dispatch(registerUser({ name: form.name, email: form.email, password: form.password }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F7FA', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mb: 1, width: 52, height: 52 }}>
              <PersonAddIcon />
            </Avatar>
            <Typography variant="h5" fontWeight={700}>Inscription</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Créez un compte pour laisser des témoignages
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              FormHelperTextProps={{ sx: { color: 'error.main' } }}
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              FormHelperTextProps={{ sx: { color: 'error.main' } }}
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
              FormHelperTextProps={{ sx: { color: 'error.main' } }}
            />
            <TextField
              label="Confirmer le mot de passe"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              FormHelperTextProps={{ sx: { color: 'error.main' } }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
              sx={{ mt: 1, py: 1.5 }}
            >
              {loading ? 'Inscription...' : 'Créer mon compte'}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Déjà un compte ?{' '}
            <Box component={Link} href="/login" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Se connecter
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
