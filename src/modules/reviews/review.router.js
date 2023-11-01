import { Router } from 'express';

import {
  revewsFindAll,
  reviewCreate,
  reviewDelete,
  reviewUpdate,
  rewiewFindOne,
} from './review.controller.js';

export const router = Router();

router.route('/').post(reviewCreate).get(revewsFindAll);

router
  .route('/:id')
  .get(rewiewFindOne)
  .patch(reviewUpdate)
  .delete(reviewDelete);
