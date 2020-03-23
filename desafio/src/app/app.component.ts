import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController} from 'ionic-angular';
import { UserService } from '../service/user.service';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';


  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private userService: UserService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

  
      this._getUsers().then(
        (resp: any) => {
          this.userService.events = resp;
          let usersListStorage = JSON.parse(window.localStorage.getItem('users_data'));
          let userId = this.userService.events[usersListStorage.id];
          delete userId.senha;
          if( usersListStorage.auth === true && userId.auth === true) {
            window.localStorage.users_data = JSON.stringify(userId);
            this.rootPage = (TabsPage);
          } else {
            this.rootPage = 'LoginPage';
          }
        }
      )
        .catch(
          (error: any) => {
            // this.notify('Ocorreu um erro inesperado!', 'danger');
            console.log(error)
          }
        )
        
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
