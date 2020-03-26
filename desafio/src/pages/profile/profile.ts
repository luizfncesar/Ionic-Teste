import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: Array<UserModel[]>;
  showContent: boolean = false;

  constructor(
    public navCtrl: NavController,
    private userService: UserService) {

  }

  ionViewDidLoad() {
    if( this.userService.auth === false) {
      this.navCtrl.setRoot('LoginPage')
    } else {
      this.user = this.userService.login;
      this.showContent = true;
    }
  }

}
