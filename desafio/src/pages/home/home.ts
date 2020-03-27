import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showContent: boolean = false;
  usersList: Array<UserModel[]>;
  items = [];
  

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public toastCtrl: ToastController,
      private userService: UserService,
    ) {

      for (let i = 0; i < 3; i++) {
        this.items.push( this.items.length );
      }
  }

  ionViewDidLoad() {
    if(!localStorage.getItem('users_data')) {
      this.navCtrl.setRoot('LoginPage')
    }else {
      this._userList()
    }
  }

  private _userList() {
    this.showContent = false;
    this._getUsers().then(
      (resp: any) => {
        let localUser = JSON.parse(localStorage.getItem('users_data'))
        this.userService.events = resp;
        this.userService.profile = resp[localUser.id];
        this.usersList = this.userService.events;
        this.showContent = true;
      }
    )
      .catch(
        (error) => {
          console.log('Ocorreu um erro inesperado!', 'danger');
        }
      );
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

  logOut() {
    debugger
    localStorage.clear();
    this.navCtrl.setRoot('LoginPage')
  }

  buttonClick(id) {
    debugger
    this.navCtrl.push('ListUserPage', { id: id });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        this.items.push( this.userService.events[i] );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
