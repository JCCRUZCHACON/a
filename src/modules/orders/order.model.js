import { DataTypes } from 'sequelize';

import sequelize from '../../config/database/database.js';

const Orders = sequelize.define('orders', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'Ord_Id',
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'meal_Id',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_Id',
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'Tot_Price',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'active',
  },
});

export default Orders;
