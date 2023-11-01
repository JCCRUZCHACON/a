import { AppError, catchAsync } from '../../errors/index.js';
import {
  validateLogin,
  validateRegister,
  validationPartialRegister,
} from './user.shema.js';
import { verifyPassword } from '../../config/plugins/encripted-password.plugin.js';
import generateJWT from '../../config/plugins/generate-jwt.plugin.js';
import { UserServices } from './users.services.js';

const userServices = new UserServices();

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await userServices.findOneUserByEmail(userData.email);

  if (!user) {
    return next(new AppError('this account does not exist'));
  }

  const iscorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );
  console.log(userData.password, user.password);

  if (!iscorrectPassword) {
    return next(new AppError('Icorrect email or passwor', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await userServices.createUser(userData);
  const token = await generateJWT(user.id);
  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    },
  });
});

export const userFindAll = catchAsync(async (req, res) => {
  const user = await userServices.findAllUsers();
  return res.json(user);
});

export const userFindOne = catchAsync(async (req, res, next) => {
  const { user } = req;
  return res.json(user);
});

export const userUpdate = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validationPartialRegister(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { id } = req.params;
  const user = await userServices.findOneUserById(id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with id: ${id} no found`,
    });
  }

  const userUp = await userServices.updateUser(user, userData);
  return res.json(userUp);
});

export const userDelete = catchAsync(async (req, res, next) => {
  const { user } = req;

  await userServices.deleteUser(user);
  return res.status(204).json(null);
});
