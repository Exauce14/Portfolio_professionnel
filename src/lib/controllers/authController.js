import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Clé secrète pour signer/vérifier les JWT
const SECRET = process.env.JWT_SECRET || 'portfolio_secret_key_2024';

// Crée un compte utilisateur après avoir haché le mot de passe (10 rounds bcrypt)
// Retourne uniquement les champs publics (jamais le mot de passe)
export async function register({ name, email, password }) {
  if (!name || !email || !password) throw new Error('Tous les champs sont requis');
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Cet email est déjà utilisé');
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return { id: user.id, name: user.name, email: user.email };
}

// Vérifie les identifiants et retourne un JWT valide 7 jours
// Le message d'erreur est volontairement identique pour email/mot de passe
// incorrect afin de ne pas indiquer si l'email existe ou non (sécurité)
export async function login({ email, password }) {
  if (!email || !password) throw new Error('Email et mot de passe requis');
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Email ou mot de passe incorrect');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Email ou mot de passe incorrect');
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
    SECRET,
    { expiresIn: '7d' }
  );
  return { token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } };
}
