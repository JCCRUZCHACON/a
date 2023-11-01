import { DataTypes } from 'sequelize';

import sequelize from '../../config/database/database.js';

const Restaurants = sequelize.define('restaurants', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'Res_Id',
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Restaurants;
