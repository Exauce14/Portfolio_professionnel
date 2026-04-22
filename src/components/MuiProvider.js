'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Thème MUI global — centralise les couleurs, la typographie et les surcharges de composants
const theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#1565C0' },            // bleu principal
    secondary:  { main: '#E53935' },            // rouge accent
    background: { default: '#F5F7FA', paper: '#FFFFFF' },
    text:       { primary: '#1A1A2E', secondary: '#5A6A7A' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        // Supprime le uppercase automatique de MUI et force un style cohérent
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderRadius: 12 },
      },
    },
    MuiTextField: {
      // Tous les TextField sont outlined et pleine largeur par défaut
      defaultProps: { variant: 'outlined', fullWidth: true },
    },
  },
});

export default function MuiProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalise les styles CSS entre navigateurs */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
