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
      

      if(localStorage.getItem('users_data')) {
        this.rootPage = (TabsPage);
      }else {
        this.rootPage = 'LoginPage';
      }

    
        
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
