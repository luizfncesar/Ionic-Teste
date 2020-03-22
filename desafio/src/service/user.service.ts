import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

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
}
