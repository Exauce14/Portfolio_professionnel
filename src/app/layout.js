import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import MuiProvider from '@/components/MuiProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Exauce Ngolo | Portfolio',
  description: 'Portfolio de Exauce Ngolo, développeur web fullstack',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ReduxProvider>
          <MuiProvider>
            <Header />
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
