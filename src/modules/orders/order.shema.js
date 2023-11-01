import z from 'zod';

import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const OrderSchema = z.object({
  mealId: z.number().positive(),
  userId: z.number().positive(),
  // totalPrice: z.number().positive(),
  quantity: z.number().positive(),
});

export const validationOrderSchema = (data) => {
  const result = OrderSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: orderData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    orderData,
  };
};

export const validationPartialOrderSchema = (data) => {
  const result = OrderSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: orderData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    orderData,
  };
};
