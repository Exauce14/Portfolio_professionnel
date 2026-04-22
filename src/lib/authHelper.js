import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'portfolio_secret_key_2024';

export function getTokenFromRequest(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

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
