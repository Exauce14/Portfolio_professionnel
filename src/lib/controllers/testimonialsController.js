import Testimonial from '../models/Testimonial';

export async function getAllTestimonials(onlyApproved = true) {
  const where = onlyApproved ? { approved: true } : {};
  return Testimonial.findAll({ where, order: [['createdAt', 'DESC']] });
}

export async function getTestimonialById(id) {
  return Testimonial.findByPk(id);
}

export async function createTestimonial({ name, message, rating, userId, approved }) {
  if (!name || !message) throw new Error('Nom et message requis');
  return Testimonial.create({ name, message, rating: rating || 5, userId, approved: approved || false });
}

export async function updateTestimonial(id, { name, message, rating }) {
  const t = await Testimonial.findByPk(id);
  if (!t) return null;
  if (!name || !message) throw new Error('Nom et message requis');
  return t.update({ name, message, rating: rating || t.rating });
}

export async function approveTestimonial(id, approved) {
  const t = await Testimonial.findByPk(id);
  if (!t) return null;
  return t.update({ approved });
}

export async function deleteTestimonial(id) {
  const t = await Testimonial.findByPk(id);
  if (!t) return false;
  await t.destroy();
  return true;
}
