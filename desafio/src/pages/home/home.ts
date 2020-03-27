import { Component, Injectable } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { NotifierService } from "angular-notifier";

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showContent: boolean = false;
  usersList: Array<UserModel[]>;
  items = [];
  private notifier: NotifierService;
  

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private userService: UserService,
      notifier: NotifierService
      
    ) {
      this.notifier = notifier;
      
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
          this.notifier.show({
            message: "Ocorreu um erro inesperado!",
            type: "error",
          });
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
    localStorage.clear();
    this.navCtrl.setRoot('LoginPage')
  }

  buttonClick(id) {
    this.navCtrl.push('ListUserPage', { id: id });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        this.items.push( this.userService.events[i] );
      }
      infiniteScroll.complete();
    }, 500);
  }

}
