'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials, deleteTestimonial, approveTestimonial } from '@/store/testimonialsSlice';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TestimonialsPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.testimonials);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.isAdmin === true;

  useEffect(() => { dispatch(fetchTestimonials()); }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce témoignage ?')) dispatch(deleteTestimonial(id));
  };

  const handleApprove = (id, approved) => dispatch(approveTestimonial({ id, approved }));

  const colors = ['primary.main', 'secondary.main', '#2E7D32', '#E65100', '#6A1B9A'];

  return (
    <ProtectedRoute>
      <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>Avis</Typography>
            <Typography variant="h3" fontWeight={700} mt={0.5}>Témoignages</Typography>
            <Typography color="text.secondary" mt={1}>Ce que les gens disent de mon travail</Typography>
            {isAdmin && (
              <Chip label="Mode Administrateur" color="warning" sx={{ mt: 1.5, fontWeight: 700 }} />
            )}
          </Box>

          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Button component={Link} href="/testimonials/add" variant="contained" size="large" startIcon={<AddIcon />}>
              Laisser un témoignage
            </Button>
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && list.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <FormatQuoteIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
              <Typography variant="h6" color="text.secondary" mt={2}>Aucun témoignage pour le moment.</Typography>
              <Typography color="text.disabled">Soyez le premier à laisser un message !</Typography>
            </Box>
          )}

          <Grid container spacing={3}>
            {list.map((t, index) => (
              <Grid item xs={12} sm={6} lg={4} key={t.id}>
                <Card sx={{
                  height: '100%', display: 'flex', flexDirection: 'column',
                  transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' },
                  border: isAdmin && !t.approved ? '2px solid #FF9800' : 'none',
                }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: colors[index % colors.length], width: 48, height: 48, fontWeight: 700 }}>
                          {t.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={700}>{t.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(t.createdAt).toLocaleDateString('fr-FR')}
                          </Typography>
                        </Box>
                      </Box>
                      {isAdmin && (
                        <Chip
                          label={t.approved ? 'Approuvé' : 'En attente'}
                          color={t.approved ? 'success' : 'warning'}
                          size="small"
                        />
                      )}
                    </Box>
                    <Rating value={t.rating || 5} readOnly size="small" sx={{ mb: 1.5 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
                      &ldquo;{t.message}&rdquo;
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                    {isAdmin && !t.approved && (
                      <Tooltip title="Approuver">
                        <IconButton onClick={() => handleApprove(t.id, true)} size="small" color="success">
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {isAdmin && t.approved && (
                      <Tooltip title="Retirer l'approbation">
                        <IconButton onClick={() => handleApprove(t.id, false)} size="small" color="warning">
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {user && (
                      <>
                        <Tooltip title="Modifier">
                          <IconButton component={Link} href={`/testimonials/edit/${t.id}`} size="small" color="primary">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton onClick={() => handleDelete(t.id)} size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
