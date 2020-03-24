import { Component, Injectable } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { TabsPage } from '../tabs/tabs';

// import Parse from 'parse';

// declare var UIkit: any;


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log('ionViewDidLoad LoginPage');
  }

  // signUp() {
  // }

  signIn() {
    this._getUsers().then(
      (resp: any) => {
        this.userService.events = resp;
        this.count = resp.length;
        this.usersList = this.userService.events;
        this.showContent = true;
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
              this.showContent = false;
              this._getUsers().then(
                (resp: any) => {
                  this.userService.events = resp;
                  this.count = resp.length;
                  this.usersList = this.userService.events;
                  this.showContent = true;
                  console.log('login correto');
                  this.navCtrl.setRoot(TabsPage);
                  // this.notify('Status alterado com sucesso!', 'success');
                }
              )
                .catch(
                  (error) => {
                    // this.notify('Ocorreu um erro inesperado!', 'danger');
                  }
                );
            },
            error => {
              // this.notify('Ocorreu um erro inesperado!', 'danger');
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

  // private notify(msg: string, status: string) {
  //   UIkit.notification({
  //     message: msg,
  //     status: status,
  //     pos: 'top-center',
  //     timeout: 2000
  //   });
  // }

}
