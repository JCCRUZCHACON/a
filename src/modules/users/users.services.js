import { Op } from 'sequelize';

import Meals from '../meals/meal.model.js';
import Orders from '../orders/order.model.js';
import Restaurants from '../restaurants/restaurant.model.js';
import Users from './users.model.js';

export class UserServices {
  async createUser(data) {
    return await Users.create(data);
  }

  async findAllUsers() {
    return await Users.findAll({
      where: {
        status: {
          [Op.in]: ['available'],
        },
      },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Orders,
          include: [
            {
              model: Meals,
              include: [
                {
                  model: Restaurants,
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async findOneUserByEmail(email) {
    return await Users.findOne({
      where: {
        email,
        status: 'available',
      },
    });
  }

  async findOneUserById(id) {
    return await Users.findOne({
      where: {
        id,
        status: 'available',
      },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Orders,
          include: [
            {
              model: Meals,
              include: [
                {
                  model: Restaurants,
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async updateUser(user, data) {
    return await user.update(data);
  }

  async deleteUser(user) {
    return await user.update({ status: 'not available' });
  }
}
