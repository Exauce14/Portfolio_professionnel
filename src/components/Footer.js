'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1A237E', color: 'white', py: 4, mt: 'auto' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          © 2026 Exaucé Woto NGOLO — Développeur Web Fullstack
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="GitHub — Exauce14">
            <IconButton
              component="a"
              href="https://github.com/Exauce14"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="LinkedIn — Exaucé Woto Ngolo">
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/exauc%C3%A9-woto-ngolo"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Fortivia Bank — Application bancaire">
            <IconButton
              component="a"
              href="https://groupe-9.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email — 2730781@collegelacite.ca">
            <IconButton
              component="a"
              href="mailto:2730781@collegelacite.ca"
              sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
