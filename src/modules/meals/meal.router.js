import { Router } from 'express';

import { restrictTo } from '../users/auth.middleware.js';
import {
  mealDelete,
  mealFindAllWithRestaurants,
  mealFindOne,
  mealsCreate,
  mealUpdate,
} from './meal.controller.js';
import { validateExistMeal } from './meal.middleware.js';

export const router = Router();

router
  .route('/')
  .post(restrictTo('admin'), mealsCreate)
  .get(mealFindAllWithRestaurants);

router
  .route('/:id')
  .get(mealFindOne)
  .patch(validateExistMeal, mealUpdate)
  .delete(restrictTo('admin'), mealDelete);
