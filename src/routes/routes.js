import { Router } from 'express';

import { router as mealRouter } from '../modules/meals/meal.router.js';
import { router as orderRouter } from '../modules/orders/order.router.js';
import { router as restauranRouter } from '../modules/restaurants/restaurant.router.js';
import { router as reviewRouter } from '../modules/reviews/review.router.js';
import { protect } from '../modules/users/auth.middleware.js';
import { router as userRouter } from '../modules/users/users.routes.js';

export const router = Router();

router.use('/user', userRouter);
router.use(protect);
router.use('/review', reviewRouter);
router.use('/order', orderRouter);
router.use('/meal', mealRouter);
router.use('/restaurant', restauranRouter);
