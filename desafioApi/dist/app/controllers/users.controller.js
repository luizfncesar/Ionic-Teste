"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../../database'); var _database2 = _interopRequireDefault(_database);

class UsersController {
  async show(req, res) {
    const users = await _database2.default.call(void 0, 'users').select({id: 'id', nome: 'nome', dataNascimento: 'dataNascimento', email: 'email', image: 'image'});
    return res.json(users);
  }

  async store(req, res){
    const { nome , dataNascimento, cpf, email, senha, image } = req.body;
    const [users] = await _database2.default.call(void 0, 'users').insert({
      nome,
      dataNascimento,
      cpf,
      email,
      senha,
      image
    });
    return res.json(users)
  }

  async destroy(req, res) {
    await _database2.default.call(void 0, 'users').where('id', id).delete();
    return res.status(204).send();
  }

  async update(req, res){
    const { nome , dataNascimento, cpf, email, image } = req.body;
    const [users] = await _database2.default.call(void 0, 'users').where('id', id).update({
      nome,
      dataNascimento,
      cpf,
      email,
      image
    });
    return res.json(users)
  }
}

exports. default = new UsersController();