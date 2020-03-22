import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// declare var UIkit: any;

@Injectable()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  form: FormGroup;
  showButtonForm: Boolean = false;
  showContent: boolean = false;
  count: number = null;
  type: string;
  usersList: Array<UserModel[]>;
  userInfo: Object = {
		email: '',
		senha: null
  };

  constructor(
      public navCtrl: NavController,
      private userService: UserService,
      private readonly formBuilder: FormBuilder,
    ) {

  }

  ngOnInit() {
    
    // Fazer localStorage aqui
    this._getUsers().then(
      (resp: any) => {
        this.userService.events = resp;
        this.count = resp.length;
        this.usersList = this.userService.events;
        this.showContent = true;
        this._createForm(this.userInfo);
      }
    )
      .catch(
        (error: any) => {
          // this.notify('Ocorreu um erro inesperado!', 'danger');
          console.log(error)
        }
      )
  }

  private _getUsers() {
    return new Promise((resolve, reject) => {
      this.userService.getUsers().subscribe(
        (resp: any) => {
          resolve(resp);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  private _createForm(info: any) {
    this.form = this.formBuilder.group({
      email: [info.email || '', Validators.required], 
      senha: [info.senha || '', Validators.required]
    });
  }

  onSubmit() {
    debugger
    const login = this.form.value;
    if (this.type === 'register') {
      // this.registerTournament(body);
    } else {
      this._getUsers().then(
        (resp: any) => {
          this.userService.events = resp;
          this.count = resp.length;
          this.usersList = this.userService.events;
          this.showContent = true;
          this._checkLogin(this.usersList, login);
        }
      )
        .catch(
          (error: any) => {
            // this.notify('Ocorreu um erro inesperado!', 'danger');
            console.log(error)
          }
        )
    }
  }

  private _checkLogin(body, login) {
    for (let index = 0; index < body.length; index++) {
      if(body[index].email === login.email && body[index].senha === login.senha) {
        console.log("achei");
        break;
      }
    }
  }

  // private notify(msg: string, status: string) {
  //   UIkit.notification({
  //     message: msg,
  //     status: status,
  //     pos: 'top-center',
  //     timeout: 2000
  //   });
  // }

}
