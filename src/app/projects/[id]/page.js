'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectById } from '@/store/projectsSlice';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ProtectedRoute from '@/components/ProtectedRoute';

const techColors = {
  'React': 'primary', 'Next.js': 'default', 'Node.js': 'success',
  'Express.js': 'warning', 'Express': 'warning', 'MySQL': 'error', 'SQLite': 'secondary',
  'PostgreSQL': 'info', 'Neon': 'info', 'Redux': 'secondary', 'JWT': 'error',
  'Socket.IO': 'primary', 'Nodemailer': 'success', 'Jest': 'warning', 'Supertest': 'secondary',
  'Tailwind CSS': 'info', 'AWS EC2': 'warning', 'Linux': 'default',
  'Apache': 'error', 'SSL/TLS': 'info', 'HTTPS': 'success', 'Cloud': 'info',
  'Java': 'error', 'JavaFX': 'warning', 'MVC': 'secondary', 'POO': 'default',
  'Kotlin': 'primary', 'Android': 'success', 'MVVM': 'secondary', 'Firebase': 'warning',
  'Retrofit': 'info', 'REST API': 'default', 'XML': 'default',
  'Sequelize': 'primary',
};

const projectIcons = [AccountBalanceIcon, SecurityIcon, PhoneAndroidIcon];

export default function ProjectDetailPage() {
  const { id }  = useParams();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((state) => state.projects);

  // Charge le projet dès que l'id est disponible dans l'URL
  useEffect(() => { if (id) dispatch(fetchProjectById(id)); }, [id, dispatch]);

  // (id - 1) car les ids commencent à 1, les index de tableau à 0
  const Icon = current ? projectIcons[(current.id - 1) % projectIcons.length] : null;

  return (
    <ProtectedRoute>
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Button component={Link} href="/projects" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          Retour aux projets
        </Button>

        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}

        {current && (
          <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'primary.main', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icon && <Icon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.85)' }} />}
            </Box>
            <Box sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>{current.title}</Typography>
              <Divider sx={{ my: 3 }} />

              <Typography variant="overline" color="primary" fontWeight={700}>Description</Typography>
              {/* whiteSpace: pre-line respecte les sauts de ligne \n dans la description */}
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 4, lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                {current.description}
              </Typography>

              <Typography variant="overline" color="primary" fontWeight={700}>Technologies utilisées</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5, mb: 4 }}>
                {current.technologies.split(',').map((tech) => {
                  const t = tech.trim();
                  return <Chip key={t} label={t} color={techColors[t] || 'default'} variant="filled" />;
                })}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {/* Les boutons GitHub et Demo sont conditionnels — tous les projets n'ont pas de démo */}
                {current.github && (
                  <Button component="a" href={current.github} target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<GitHubIcon />}>
                    Voir sur GitHub
                  </Button>
                )}
                {current.demo && (
                  <Button component="a" href={current.demo} target="_blank" rel="noopener noreferrer" variant="contained" startIcon={<OpenInNewIcon />}>
                    Voir la démonstration
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
    </ProtectedRoute>
  );
}
