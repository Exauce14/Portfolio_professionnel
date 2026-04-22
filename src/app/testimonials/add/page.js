'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTestimonial, clearMessages } from '@/store/testimonialsSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AddTestimonialPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, success } = useSelector((state) => state.testimonials);
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: user?.name || '', message: '', rating: 5 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => { dispatch(clearMessages()); };
  }, [dispatch]);

  useEffect(() => {
    if (success) setTimeout(() => router.push('/testimonials'), 1500);
  }, [success, router]);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Le nom doit contenir au moins 2 caractères';
    if (!form.message || form.message.trim().length < 10) e.message = 'Le message doit contenir au moins 10 caractères';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setErrors({});
    dispatch(addTestimonial({ ...form, userId: user?.id }));
  };

  return (
    <ProtectedRoute>
      <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Button component={Link} href="/testimonials" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
            Retour aux témoignages
          </Button>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>Laisser un témoignage</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Partagez votre expérience avec mon travail</Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                FormHelperTextProps={{ sx: { color: 'error.main' } }}
              />
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>Note *</Typography>
                <Rating value={form.rating} onChange={(_, v) => setForm({ ...form, rating: v || 1 })} size="large" />
              </Box>
              <TextField
                label="Votre message"
                multiline
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                error={!!errors.message}
                helperText={errors.message}
                FormHelperTextProps={{ sx: { color: 'error.main' } }}
                placeholder="Partagez votre expérience..."
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
              >
                {loading ? 'Envoi...' : 'Envoyer le témoignage'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
