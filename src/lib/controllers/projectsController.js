import Project from '../models/Project';

export async function getAllProjects() {
  return Project.findAll({ order: [['id', 'ASC']] });
}

export async function getProjectById(id) {
  return Project.findByPk(id);
}
