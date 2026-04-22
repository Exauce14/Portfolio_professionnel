import { DataTypes } from 'sequelize';
import sequelize from '../db';

// Modèle représentant un utilisateur de l'application
// Le mot de passe est toujours haché (bcrypt) avant d'être stocké
const User = sequelize.define('User', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:     { type: DataTypes.STRING,  allowNull: false },
  email:    { type: DataTypes.STRING,  allowNull: false, unique: true },
  password: { type: DataTypes.STRING,  allowNull: false },
  isAdmin:  { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default User;
