import { Sequelize } from 'sequelize';
import path from 'path';

// Chemin absolu vers le fichier SQLite à la racine du projet
const dbPath = path.join(process.cwd(), 'portfolio.sqlite');

// Instance Sequelize unique partagée par tous les modèles
// logging: false désactive les requêtes SQL dans la console
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

export default sequelize;
