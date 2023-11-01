import { AppError, catchAsync } from '../../errors/index.js';
import {
  validateMealsSchema,
  validatePartialMealSchema,
} from './meal.shema.js';
import { MealsServices } from './meal.service.js';

const mealsServices = new MealsServices();

export const mealsCreate = catchAsync(async (req, res) => {
  const { hasError, errorMessage, mealData } = validateMealsSchema(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const meal = await mealsServices.createMeals(mealData);
  return res.json(meal);
});

export const mealsFindAll = catchAsync(async (req, res) => {
  const meals = await mealsServices.findAllMeals();
  return res.json(meals);
});

export const mealFindAllWithRestaurants = catchAsync(async (req, res) => {
  const mealsAndRestaurants = await mealsServices.findAllWithRestaurants();
  return res.json(mealsAndRestaurants);
});

export const mealFindOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await mealsServices.findOneMeals(id);

  if (!meal) {
    return next(new AppError(`the order with id :${id}no found`, 404));
  }

  return res.json(meal);
});

export const mealUpdate = catchAsync(async (req, res) => {
  const { hasError, errorMessage, mealData } = validatePartialMealSchema(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { id } = req.params;
  const meal = await mealsServices.findOneMeals(id);

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: `meal with id: ${id} no found for update`,
    });
  }

  const mealUp = await mealsServices.updateMeal(meal, mealData);
  return res.json(mealUp);
});

export const mealDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await mealsServices.findOneMeals(id);

  if (!meal) {
    return next(new AppError(`meal with id: ${id} no found`, 404));
  }

  await mealsServices.deleteMeals(meal);
  return res.status(204).json(null);
});
