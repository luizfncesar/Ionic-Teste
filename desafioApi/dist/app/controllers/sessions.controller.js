"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../../database'); var _database2 = _interopRequireDefault(_database);

class SessionsController {
  async store(req, res){
    const { email, senha } = req.body;
    const users = await _database2.default.call(void 0, 'users').where({email, senha}).first();

    if(!users) {
        return res.status(401).json({error: 'Não autorizado'});
    }
    return res.json(users)
  }
}

exports. default = new SessionsController();