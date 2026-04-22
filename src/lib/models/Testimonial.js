import { DataTypes } from 'sequelize';
import sequelize from '../db';

// Modèle représentant un témoignage laissé par un utilisateur
// approved=false par défaut : un admin doit valider avant affichage public
const Testimonial = sequelize.define('Testimonial', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:     { type: DataTypes.STRING,  allowNull: false },
  message:  { type: DataTypes.TEXT,    allowNull: false },
  rating:   { type: DataTypes.INTEGER, defaultValue: 5 },
  userId:   { type: DataTypes.INTEGER },
  approved: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Testimonial;
