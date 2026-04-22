import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  technologies: { type: DataTypes.STRING, allowNull: false },
  github: { type: DataTypes.STRING },
  demo: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
});

export default Project;
