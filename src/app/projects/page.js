'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '@/store/projectsSlice';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ProtectedRoute from '@/components/ProtectedRoute';

const techColors = {
  'React': 'primary', 'Next.js': 'default', 'Node.js': 'success',
  'Express.js': 'warning', 'Express': 'warning', 'MySQL': 'error', 'SQLite': 'secondary',
  'PostgreSQL': 'info', 'Neon': 'info', 'Redux': 'secondary', 'JWT': 'error',
  'Socket.IO': 'primary', 'Nodemailer': 'success', 'Jest': 'warning', 'Supertest': 'secondary',
  'Tailwind CSS': 'info', 'Stripe': 'primary', 'Python': 'warning',
  'AWS EC2': 'warning', 'Linux': 'default', 'Apache': 'error',
  'SSL/TLS': 'info', 'HTTPS': 'success', 'Cloud': 'info',
  'Java': 'error', 'JavaFX': 'warning', 'MVC': 'secondary', 'POO': 'default',
  'Kotlin': 'primary', 'Android': 'success', 'MVVM': 'secondary', 'Firebase': 'warning',
  'Retrofit': 'info', 'REST API': 'default', 'XML': 'default',
  'Sequelize': 'primary',
};

const projectIcons = [AccountBalanceIcon, SecurityIcon, PhoneAndroidIcon];

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.projects);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  return (
    <ProtectedRoute>
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>
            Réalisations
          </Typography>
          <Typography variant="h3" fontWeight={700} mt={0.5}>Mes Projets</Typography>
          <Typography color="text.secondary" mt={1}>
            Des projets concrets réalisés dans le cadre de ma formation au Collège La Cité
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

        <Grid container spacing={3}>
          {list.map((project, index) => {
            const techs = project.technologies.split(',').map((t) => t.trim());
            const Icon = projectIcons[index % projectIcons.length];
            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
                  <Box sx={{ bgcolor: 'primary.main', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.85)' }} />
                  </Box>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>{project.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {techs.map((tech) => (
                        <Chip key={tech} label={tech} size="small" color={techColors[tech] || 'default'} variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button component={Link} href={`/projects/${project.id}`} variant="contained" endIcon={<ArrowForwardIcon />} fullWidth>
                      Voir les détails
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
    </ProtectedRoute>
  );
}
