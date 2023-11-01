import { AppError, catchAsync } from '../../errors/index.js';
import { OrdersServices } from './order.service.js';

const orderService = new OrdersServices();

export const validateExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderService.findOneOrder(id);

  if (!order) {
    return next(new AppError(`order not found with id: ${id}`, 404));
  }
  req.order = order;
  next();
});
