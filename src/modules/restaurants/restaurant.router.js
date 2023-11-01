import { Router } from 'express';

import {
  protectAccount,
  restrictTo,
} from '../../modules/users/auth.middleware.js';
import { validatedExistReviews } from '../reviews/review.middleware.js';
import {
  createReviewToRestaurant,
  deletereview,
  restaurantCreate,
  restaurantDelete,
  restaurantFindOne,
  restaurantsfindAll,
  restaurantUpdate,
  updateReview,
} from './restaurant.controller.js';
import { validExistRestaurant } from './restaurant.middleware.js';

export const router = Router();

router
  .route('/')
  .post(restrictTo('admin'), restaurantCreate)
  .get(restaurantsfindAll);

router
  .route('/:id')
  .get(restaurantFindOne)
  .patch(restaurantUpdate)
  .delete(restaurantDelete);

router.post(
  '/reviews/:id',
  validExistRestaurant,
  restrictTo('admin'),
  createReviewToRestaurant
);
router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validExistRestaurant,
    validatedExistReviews,
    restrictTo('admin'),
    protectAccount,
    updateReview
  )
  .delete(
    validExistRestaurant,
    validatedExistReviews,
    restrictTo('admin'),
    protectAccount,
    deletereview
  );
