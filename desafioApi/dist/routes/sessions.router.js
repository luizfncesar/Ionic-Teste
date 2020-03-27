"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _sessionscontroller = require('../app/controllers/sessions.controller'); var _sessionscontroller2 = _interopRequireDefault(_sessionscontroller);

class SessionsRouter {
  constructor() {
    this.router = _express.Router.call(void 0, );

    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/sessions')
      .post(_sessionscontroller2.default.store);
  }
}

exports. default = new SessionsRouter().router;
