import { Component, Injectable } from '@angular/core';
import { Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network';
import { NetworkService } from '../service/network.service';
import { NotifierService } from "angular-notifier";


@Injectable()

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  showContent: Boolean = false;
  private notifier: NotifierService;


  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private network: Network,
    public events: Events,
    public networkService: NetworkService,
    public toast: ToastController,
    notifier: NotifierService
  ) {

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      this.notifier = notifier;

      this.networkService.initializeNetworkEvents();

      if(localStorage.getItem('users_data')) {
        this.rootPage = (TabsPage);
      }else {
        this.rootPage = 'LoginPage';
      }
        
    });
  }

}
