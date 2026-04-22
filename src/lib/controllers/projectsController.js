import Project from '../models/Project';

// Retourne tous les projets triés par ordre d'insertion (le plus ancien en premier)
export async function getAllProjects() {
  return Project.findAll({ order: [['id', 'ASC']] });
}

// Retourne un projet par sa clé primaire, ou null s'il n'existe pas
export async function getProjectById(id) {
  return Project.findByPk(id);
}
