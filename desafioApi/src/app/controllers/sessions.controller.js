import connection from '../../database';

class SessionsController {
  async store(req, res){
    const { email, senha } = req.body;
    const users = await connection('users').where({email, senha}).first();

    if(!users) {
        return res.status(401).json({error: 'Não autorizado'});
    }
    return res.json(users)
  }
}

export default new SessionsController();