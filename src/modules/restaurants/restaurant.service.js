import Restaurants from './restaurant.model.js';

export class RestaurantsServices {
  async createRestaurant(data) {
    return await Restaurants.create(data);
  }

  async findAllRestaurants() {
    return await Restaurants.findAll();
  }

  async findOneRestaurants(id) {
    return await Restaurants.findOne({
      where: {
        id,
        status: 'active',
      },
    });
  }

  async findOneRestaurantsReview(id, restaurantId) {
    return await Restaurants.findOne({
      where: {
        id: restaurantId || id,
        status: 'active',
      },
    });
  }

  async updateRestaurants(restaurant, data) {
    return await restaurant.update(data);
  }

  async deleteRestaurants(restaurant) {
    return await restaurant.update({ status: 'disabled' });
  }
}
