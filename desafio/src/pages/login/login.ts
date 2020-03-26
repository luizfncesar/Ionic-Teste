import { Component, Injectable } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { TabsPage } from '../tabs/tabs';


@Injectable()

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  showButtonForm: Boolean = false;
  showContent: boolean = false;
  count: number = null;
  type: string;
  usersList: Array<UserModel[]>;
  userInfo: Object = {
		email: '',
		senha: null
  };


  username: string;
  password: string;


  constructor(
      public navCtrl: NavController,
      public toastCtrl: ToastController,
      public navParams: NavParams,
      private userService: UserService
    ) {
  }

  ionViewDidLoad() {
    if( this.userService.auth === true) {
      this.navCtrl.setRoot(TabsPage);
    }else {
      this.showContent = true;
    }
  }

  signIn() {
    this._getUsers().then(
      (resp: any) => {
        this.showContent = false;
        this.userService.events = resp;
        this.count = resp.length;
        this.usersList = this.userService.events;
        const param = {
          type: 'signin',
          username: this.username,
          password: this.password
        }
        let user: any = this.userService.checkLogin(this.usersList, param);
        if (user.auth) {
          window.localStorage.users_data = JSON.stringify(user);
          this.userService.updateUser(user.id, user).subscribe(
            () => {
              this._getUsers().then(
                (resp: any) => {
                  this.userService.events = resp;
                  this.count = resp.length;
                  this.usersList = this.userService.events;
                  this.userService.login = user;
                  this.showContent = true;
                  this.userService.auth = true;
                  this.navCtrl.setRoot(TabsPage);
                  console.log('Status alterado com sucesso!', 'success');
                }
              )
                .catch(
                  (error) => {
                    console.log('Ocorreu um erro inesperado!', 'danger');
                  }
                );
            },
            error => {
              console.log('Ocorreu um erro inesperado!', 'danger');
            }
          );
        } else {
          console.log('login não autenticado');
        }
      }, err => {
        console.log('Occoreu um problema', err);
        this.toastCtrl.create({
          message: err.message,
          duration: 2000
        }).present();
      });
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

}
