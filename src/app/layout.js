import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import MuiProvider from '@/components/MuiProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Métadonnées de l'onglet navigateur et du SEO
export const metadata = {
  title: 'Exauce Ngolo | Portfolio',
  description: 'Portfolio de Exauce Ngolo, développeur web fullstack',
};

// Layout racine — enveloppe toutes les pages dans Redux, MUI, Header et Footer
// L'ordre des providers est important : Redux doit être externe à MUI car
// Header utilise à la fois le store et les composants MUI
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ReduxProvider>
          <MuiProvider>
            <Header />
            {/* flex: 1 permet au footer de rester en bas même si le contenu est court */}
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </MuiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
