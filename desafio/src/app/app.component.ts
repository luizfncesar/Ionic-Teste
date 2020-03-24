import { Component, Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
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

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private userService: UserService,
    private network: Network,
    public events: Events,
    public networkService: NetworkService
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      debugger
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
