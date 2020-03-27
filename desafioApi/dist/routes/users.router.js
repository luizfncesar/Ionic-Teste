"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _userscontroller = require('../app/controllers/users.controller'); var _userscontroller2 = _interopRequireDefault(_userscontroller);

class UsersRouter {
  constructor() {
    this.router = _express.Router.call(void 0, );

    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/users')
      .post(_userscontroller2.default.store)
      .get(_userscontroller2.default.show);
  }
}

exports. default = new UsersRouter().router;
