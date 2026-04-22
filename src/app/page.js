'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import WorkIcon from '@mui/icons-material/Work';
import CommentIcon from '@mui/icons-material/Comment';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
const skills = [
  { name: 'JavaScript / TypeScript', level: 95 },
  { name: 'React / Next.js', level: 95 },
  { name: 'Node.js / Express', level: 95 },
  { name: 'C# / .NET', level: 95 },
  { name: 'Java / JavaFX', level: 95 },
  { name: 'C++', level: 95 },
  { name: 'Kotlin', level: 95 },
  { name: 'Swift (iOS)', level: 95 },
  { name: 'SQL / MySQL / SQLite', level: 95 },
  { name: 'Material UI / Tailwind CSS', level: 95 },
  { name: 'Redux Toolkit', level: 95 },
  { name: 'EJS / Templating', level: 95 },
  { name: 'Linux / AWS Cloud', level: 95 },
  { name: 'Patrons de conception (MVC, POO)', level: 95 },
  { name: 'Git / GitHub', level: 95 },
];

const badges = ['Next.js', 'React', 'Node.js', 'C#', 'Java', 'C++', 'Kotlin', 'Swift', 'MySQL', 'AWS', 'Redux', 'Git', 'MUI'];

export default function HomePage() {
  return (
    <Box>
        {/* Hero */}
        <Box sx={{ background: 'linear-gradient(135deg, #1565C0 0%, #1A237E 100%)', color: 'white', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: 3 }}>
                  Étudiant en Programmation Informatique
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                  Bonjour, je suis<br />
                  <Box component="span" sx={{ color: '#90CAF9' }}>Exaucé Woto NGOLO</Box>
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}>
                  Étudiant en programmation informatique au Collège La Cité, passionné par la création de solutions
                  numériques modernes et la résolution de problèmes techniques complexes.
                  J&apos;aime apprendre de façon autonome et me dépasser dans chaque projet.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    href="/projects"
                    variant="contained"
                    size="large"
                    startIcon={<WorkIcon />}
                    sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#E3F2FD' } }}
                  >
                    Voir mes projets
                  </Button>
                  <Button
                    component={Link}
                    href="/testimonials"
                    variant="outlined"
                    size="large"
                    startIcon={<CommentIcon />}
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                  >
                    Témoignages
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/photo.jpeg"
                  alt="Exaucé Woto NGOLO"
                  sx={{
                    width: { xs: 280, md: 400 },
                    height: { xs: 373, md: 533 },
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: 3,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                    display: 'block',
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Badges */}
        <Box sx={{ bgcolor: 'white', py: 2.5, borderBottom: '1px solid #E0E0E0' }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
              {badges.map((b) => <Chip key={b} label={b} variant="outlined" color="primary" />)}
            </Box>
          </Container>
        </Box>

        {/* À propos + Compétences */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>À propos</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, mb: 3 }}>Qui suis-je ?</Typography>

              <Typography color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                Étudiant en programmation informatique au <strong>Collège La Cité (Ottawa)</strong>, je me distingue
                par ma capacité à apprendre de façon autonome et à aller au-delà des exigences des cours.
                J&apos;ai notamment réussi à configurer un serveur en HTTPS sur AWS en environnement étudiant
                — une notion non enseignée et considérée comme bonus — au point que mon professeur m&apos;a demandé
                de présenter ma solution à toute la classe.
              </Typography>

              <Typography color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                Dans le cadre de mon projet intégrateur (application bancaire <strong>Fortivia</strong>),
                j&apos;ai contribué à des fonctionnalités avancées telles que l&apos;envoi de courriels réels
                et la double authentification par email, ce qui a tellement impressionné mon professeur
                qu&apos;il a accepté de me servir de <strong>référence professionnelle</strong>.
              </Typography>

              <Typography color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                Ouvert aux opportunités en développement web fullstack, développement d&apos;applications
                et en cybersécurité.{' '}
                <em>Référence disponible sur demande — [Nom du professeur, Collège La Cité].</em>
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" startIcon={<EmailIcon />} component="a" href="mailto:2730781@collegelacite.ca">
                  Me contacter
                </Button>
                <Button variant="outlined" startIcon={<GitHubIcon />} component="a" href="https://github.com/Exauce14" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>Compétences</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, mb: 3 }}>Technologies maîtrisées</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {skills.map((skill) => (
                  <Box key={skill.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={600}>{skill.name}</Typography>
                      <Typography variant="body2" color="primary" fontWeight={700}>{skill.level}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{ height: 8, borderRadius: 4, bgcolor: '#E3F2FD', '& .MuiLinearProgress-bar': { borderRadius: 4 } }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* CTA */}
        <Box sx={{ bgcolor: '#E8EAF6', py: 8 }}>
          <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} mb={2}>Intéressé par mon profil ?</Typography>
            <Typography color="text.secondary" mb={4}>
              Consultez mes projets ou laissez un témoignage. N&apos;hésitez pas à me contacter pour toute opportunité professionnelle.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" component={Link} href="/projects">
                Voir mes projets
              </Button>
              <Button variant="outlined" size="large" component="a" href="mailto:2730781@collegelacite.ca">
                Me contacter
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
  );
}
