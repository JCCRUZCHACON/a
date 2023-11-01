import { AppError, catchAsync } from '../../errors/index.js';
import { RestaurantsServices } from './restaurant.service.js';

const restaurantsServices = new RestaurantsServices();

export const validExistRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;
  const restaurant = await restaurantsServices.findOneRestaurantsReview(
    id,
    restaurantId
  );

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});
