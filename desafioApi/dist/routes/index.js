"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
var _express = require('express');
var _fs = require('fs');
var _path = require('path');

const initialize = () => {
  const route = _express.Router.call(void 0, );

  _fs.readdirSync.call(void 0, __dirname)
    .filter(
      file =>
        file.indexOf('.') !== 0 &&
        file !== _path.basename.call(void 0, __filename) &&
        file.slice(-3) === '.js'
    )
    .forEach(file => {
      const fileRouter = require(_path.resolve.call(void 0, __dirname, file));
      route.use(fileRouter.default);
    });

  return route;
};

exports. default = initialize();
