import { Sequelize } from 'sequelize';
import path from 'path';

const dbPath = path.join(process.cwd(), 'portfolio.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

export default sequelize;
