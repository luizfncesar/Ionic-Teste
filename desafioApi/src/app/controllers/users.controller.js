import connection from '../../database';

class UsersController {
  async show(req, res) {
    const users = await connection('users').select({id: 'id', nome: 'nome', dataNascimento: 'dataNascimento', email: 'email', image: 'image'});
    return res.json(users);
  }

  async store(req, res){
    const { nome , dataNascimento, cpf, email, senha, image } = req.body;
    const [users] = await connection('users').insert({
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
    await connection('users').where('id', id).delete();
    return res.status(204).send();
  }

  async update(req, res){
    const { nome , dataNascimento, cpf, email, image } = req.body;
    const [users] = await connection('users').where('id', id).update({
      nome,
      dataNascimento,
      cpf,
      email,
      image
    });
    return res.json(users)
  }
}

export default new UsersController();