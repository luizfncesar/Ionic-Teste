export class UserModel {
  id: number = 0;
  nome: string = '';
  dataNascimento?: string = '';
  cpf: number = null;
  email: string = '';
  senha?: number = null;
  auth?: Boolean = false;
}
