import z from 'zod';

import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const MealsSchema = z.object({
  name: z.string().min(4, {
  message: 'The name is too short',
  }), 
  price: z.number().positive(),
  restaurantId: z.number().positive(),
});

export const validateMealsSchema = (data) => {
  const result = MealsSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    mealData,
  };
};

export const validatePartialMealSchema = (data) => {
  const result = MealsSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    mealData,
  };
};
