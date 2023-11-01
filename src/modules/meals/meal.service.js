import { Op } from 'sequelize';

import Restaurants from '../restaurants/restaurant.model.js';
import Meals from './meal.model.js';

export class MealsServices {
  async createMeals(data) {
    return await Meals.create(data);
  }

  async findAllMeals() {
    return await Meals.findAll();
  }

  async findOneMeals(id) {
    return await Meals.findOne({
      where: {
        id,
        status: {
          [Op.in]: ['active'],
        },
      },
      include: [
        {
          model: Restaurants,
        },
      ],
    });
  }

  async updateMeal(meals, data) {
    return await meals.update(data);
  }

  async deleteMeals(meals) {
    return await meals.update({ status: 'disabled' });
  }

  async findAllWithRestaurants() {
    return await Meals.findAll({
      where: {
        status: {
          [Op.notIn]: ['disabled'],
        },
      },
      include: [
        {
          model: Restaurants,
        },
      ],
    });
  }
}
