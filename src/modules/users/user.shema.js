import z from 'zod';

import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const RegisteruserSchema = z.object({
  name: z.string().min(4, {
    message: 'The name is too short',
  }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'The password must have a minimum of 8 characters' }),
  role: z.enum(['normal', 'admin']).optional(),
});

export const LoginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'The password must have a minimum of 8 characters' }),
});

export const validateLogin = (data) => {
  const result = LoginUserSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateRegister = (data) => {
  const result = RegisteruserSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validationPartialRegister = (data) => {
  const result = RegisteruserSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};
