import { Router } from 'express';

import { protect } from '../users/auth.middleware.js';
import {
  orderCreate,
  orderDelete,
  orderFindAll,
  orderFindOne,
  orderUpdate,
} from './order.controller.js';

export const router = Router();

router.route('/').post(orderCreate).get(orderFindAll);

router
  .route('/:id')
  .get(orderFindOne)
  .patch(protect, orderUpdate)
  .delete(protect, orderDelete);
