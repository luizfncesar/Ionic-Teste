import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';

// declare var UIkit: any;

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

  ngOnInit() {
    this.usersList = this.userService.events;
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
              this.showContent = true;
              this.navCtrl.setRoot('LoginPage')
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

  // private notify(msg: string, status: string) {
  //   UIkit.notification({
  //     message: msg,
  //     status: status,
  //     pos: 'top-center',
  //     timeout: 2000
  //   });
  // }

}
