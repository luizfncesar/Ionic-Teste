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
  public profile: any;
  public auth: Boolean = false;
  
  getUsers() {
    return this.http.get(`${environment.API}/users`);
  }

  postUsers(body: Object) {
    return this.http.post(`${environment.API}/users`, body);
  }

  postSessions(body: Object) {
    return this.http.post(`${environment.API}/sessions`, body);
  }
}
