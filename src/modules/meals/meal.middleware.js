import { AppError, catchAsync } from '../../errors/index.js';
import { MealsServices } from './meal.service.js';

const mealsServices = new MealsServices();

export const validateExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meals = await mealsServices.findOneMeals(id);

  if (!meals) {
    return next(new AppError('review not found', 404));
  }

  req.meals = meals;
});
