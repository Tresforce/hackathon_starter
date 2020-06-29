import { Router } from 'express';
import UserController from '../../controllers/User';

const route = Router();

export default (app: Router): any => {
  app.use('/users', route);

  route.post('/create', async (req, res, next) => {
    const userDTO = req.body;
    try {
      const user = await UserController.createUser(
        userDTO.firstName,
        userDTO.lastName,
        userDTO.email
      );

      res.send(user);
    } catch (error) {
      next(error);
    }
  });

  route.get('/me', async (req, res, next) => {
    const { id } = req.body;

    try {
      const user = await UserController.getUserById(id);
      return res.send(user);
    } catch (error) {
      return next(error);
    }
  });
  return app;
};
