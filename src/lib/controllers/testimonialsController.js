import Testimonial from '../models/Testimonial';

// Retourne les témoignages approuvés (onlyApproved=true) ou tous (admin)
// Tri du plus récent au plus ancien
export async function getAllTestimonials(onlyApproved = true) {
  const where = onlyApproved ? { approved: true } : {};
  return Testimonial.findAll({ where, order: [['createdAt', 'DESC']] });
}

// Retourne un témoignage par sa clé primaire, ou null s'il n'existe pas
export async function getTestimonialById(id) {
  return Testimonial.findByPk(id);
}

// Crée un témoignage — approved est passé true si c'est l'admin qui poste
export async function createTestimonial({ name, message, rating, userId, approved }) {
  if (!name || !message) throw new Error('Nom et message requis');
  return Testimonial.create({ name, message, rating: rating || 5, userId, approved: approved || false });
}

// Met à jour nom, message et note — conserve l'ancienne note si non fournie
export async function updateTestimonial(id, { name, message, rating }) {
  const t = await Testimonial.findByPk(id);
  if (!t) return null;
  if (!name || !message) throw new Error('Nom et message requis');
  return t.update({ name, message, rating: rating || t.rating });
}

// Bascule le statut d'approbation — réservé à l'admin (vérifié au niveau API)
export async function approveTestimonial(id, approved) {
  const t = await Testimonial.findByPk(id);
  if (!t) return null;
  return t.update({ approved });
}

// Supprime définitivement un témoignage, retourne false s'il est introuvable
export async function deleteTestimonial(id) {
  const t = await Testimonial.findByPk(id);
  if (!t) return false;
  await t.destroy();
  return true;
}
