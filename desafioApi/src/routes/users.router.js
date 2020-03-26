import { Router } from 'express';

import usersController from '../app/controllers/users.controller';

class UsersRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/users')
      .post(usersController.store)
      .get(usersController.show);
  }
}

export default new UsersRouter().router;
