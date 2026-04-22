'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTestimonial, clearMessages } from '@/store/testimonialsSlice';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
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
import SaveIcon from '@mui/icons-material/Save';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function EditTestimonialPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, success } = useSelector((state) => state.testimonials);
  const [form, setForm] = useState({ name: '', message: '', rating: 5 });
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`/api/testimonials/${id}`);
        setForm({ name: res.data.name, message: res.data.message, rating: res.data.rating });
      } catch (err) {
        console.error(err);
        router.push('/testimonials');
      } finally {
        setFetching(false);
      }
    };
    if (id) load();
    return () => { dispatch(clearMessages()); };
  }, [id, dispatch, router]);

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
    dispatch(updateTestimonial({ id, data: form }));
  };

  if (fetching) {
    return (
      <ProtectedRoute>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Button component={Link} href="/testimonials" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
            Retour aux témoignages
          </Button>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>Modifier le témoignage</Typography>

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
                <Typography variant="body2" fontWeight={600} gutterBottom>Note</Typography>
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
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
              >
                {loading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
