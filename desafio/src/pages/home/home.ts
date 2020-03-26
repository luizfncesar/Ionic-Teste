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

  showButtonForm: Boolean = false;
  showContent: boolean = false;
  count: number = null;
  type: string;
  usersList: Array<UserModel[]>;
  userInfo: Object = {
		email: '',
		senha: null
  };

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
    if( this.userService.auth === false) {
      this.navCtrl.setRoot('LoginPage')
    } else {
      this.usersList = this.userService.events;
      this.showContent = true;
    }
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

  logOut() {
    let usersListStorage = JSON.parse(window.localStorage.getItem('users_data'));
    const param = {
      type: 'logout',
      username: usersListStorage.email
    }
    let user: any = this.userService.checkLogin(this.userService.events, param);
    if (!user.auth) {
      this.userService.updateUser(user.id, user).subscribe(
        () => {
          this.showContent = false;
          this._getUsers().then(
            (resp: any) => {
              this.userService.events = resp;
              this.count = resp.length;
              this.usersList = this.userService.events;
              window.localStorage.users_data = JSON.stringify(user);
              this.userService.auth = false;
              this.showContent = true;
              this.navCtrl.setRoot('LoginPage')
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
      console.log('Erro ao deslogar');
    }
  }

  buttonClick(id) {
    this.navCtrl.push('ListUserPage', { id: id });
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
