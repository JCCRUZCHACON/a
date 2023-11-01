import { AppError, catchAsync } from '../../errors/index.js';
import { totalMult } from '../../utils/operationMult.js';
import { MealsServices } from '../meals/meal.service.js';
import {
  validationOrderSchema,
  validationPartialOrderSchema,
} from './order.shema.js';
import { OrdersServices } from './order.service.js';

const mealsServices = new MealsServices();
const ordersServices = new OrdersServices();

export const orderCreate = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, orderData } = validationOrderSchema(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const mealData = await mealsServices.findOneMeals(orderData.mealId);

  if (!mealData) {
    return res.status(404).json({
      status: 'error',
      message: `Order with meal id: ${orderData.mealId} no found`,
    });
  }

  orderData.totalPrice = totalMult(mealData.price, orderData.quantity);

  const order = await ordersServices.createOrder(orderData);
  return res.json(order);
});

export const orderFindAll = catchAsync(async (req, res) => {
  const orders = await ordersServices.findAllorders();
  return res.json(orders);
});

export const orderFindOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await ordersServices.findOneOrder(id);

  if (!order) {
    return next(new AppError(`the order with id :${id}no found`, 404));
  }

  return res.json(order);
});

export const orderUpdate = catchAsync(async (req, res) => {
  const { hasError, errorMessage, orderData } = validationPartialOrderSchema(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { id } = req.params;
  const order = await ordersServices.findOneOrder(id);

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: `review with id: ${id} no found for update`,
    });
  }

  const orderUp = await ordersServices.updateOrder(order, orderData);
  return res.json(orderUp);
});

export const orderDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await ordersServices.findOneOrder(id);

  if (!order) {
    return next(new AppError(`order with id: ${id} no found`, 404));
  }

  await ordersServices.deleteOrder(order);
  return res.status(204).json(null);
});
