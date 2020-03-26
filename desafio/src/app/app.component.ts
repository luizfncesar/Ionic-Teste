import { Component, Injectable } from '@angular/core';
import { Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../service/user.service';
import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network';
import { NetworkService } from '../service/network.service';


@Injectable()

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  showContent: Boolean = false;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private userService: UserService,
    private network: Network,
    public events: Events,
    public networkService: NetworkService,
    public toast: ToastController,
  ) {

    platform.ready().then(() => {
      this.initializeApp();

      statusBar.styleDefault();
      splashScreen.hide();

      this.networkService.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
          alert('network:offline ==> '+this.network.type);    
      });

      // Online event
      this.events.subscribe('network:online', () => {
          alert('network:online ==> '+this.network.type);        
      });
  
      this._getUsers().then(
        (resp: any) => {
          this.userService.events = resp;
          let usersListStorage = JSON.parse(window.localStorage.getItem('users_data'));
          let userId = this.userService.events[usersListStorage.id];
          delete userId.senha;
          if( usersListStorage.auth === true && userId.auth === true) {
            window.localStorage.users_data = JSON.stringify(userId);
            this.userService.login = userId;
            this.userService.auth = true;
            this.rootPage = (TabsPage);
          } else {
            this.userService.auth = false;
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
  
  
  initializeApp(): void {

    this.networkService.initializeNetworkEvents();

    this.networkService.getNetworkStatus().subscribe(data => {
      console.log('platform ready', data);
      this.toast.create ({
        message: data + ' ' +  this.networkService.getNetworkType(),
        duration: 3000,
      }).present();;
    });
  }
}
