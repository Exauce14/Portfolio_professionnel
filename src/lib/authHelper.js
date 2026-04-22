import jwt from 'jsonwebtoken';

// Même clé secrète que dans authController — doit correspondre pour valider les tokens
const SECRET = process.env.JWT_SECRET || 'portfolio_secret_key_2024';

// Extrait le token JWT du cookie "token" envoyé dans les headers HTTP
export function getTokenFromRequest(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

// Vérifie si la requête provient d'un administrateur
// Retourne false en cas de token absent, invalide ou expiré
export function verifyAdmin(request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return false;
    const decoded = jwt.verify(token, SECRET);
    return decoded.isAdmin === true;
  } catch {
    return false;
  }
}
