import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable()

export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public events: any;
  
  getUser(id: any) {
    return this.http.get(`${environment.API}/usuarios/${id}`);
  }

  getUsers() {
    return this.http.get(`${environment.API}/usuarios`);
  }

  postUser(body: Object) {
    return this.http.post(`${environment.API}/usuarios`, body);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.API}/usuarios/${id}`);
  }

  updateUser(id: string, body: Object) {
    return this.http.patch(`${environment.API}/usuarios/${id}`, body);
  }  

  checkLogin(body, param) {
    let user: any = {};
    let auth: Boolean = false;

    for (let index = 0; index < body.length; index++) {
      if (param.type === 'logout' && param.username === body[index].email) {
        auth = false;
        user = body[index];
        break;
      } else {
        if(param.username === body[index].email && body[index].senha === param.password) {
          auth = true;
          user = body[index];
          break;
        }
      }
    }

    const client: UserModel = {
      id: user.id,
      nome: user.nome,
      dataNascimento: user.dataNascimento,
      cpf: user.cpf,
      email: user.email,
      auth: auth,
    }
    return client;
  }
}
