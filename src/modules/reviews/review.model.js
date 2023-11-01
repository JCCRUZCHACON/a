import { DataTypes } from 'sequelize';

import sequelize from '../../config/database/database.js';

const Reviews = sequelize.define('reviews', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'Rev_Id',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_Id',
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'restaurant_Id',
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Reviews;
