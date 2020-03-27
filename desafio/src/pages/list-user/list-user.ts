import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-list-user',
  templateUrl: 'list-user.html',
})
export class ListUserPage {
  user: Array<UserModel[]>;
  showContent: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService
  ) { }


  ionViewDidLoad() {
    let idPage = this.navParams.get('id');
    if(!localStorage.getItem('users_data') || !idPage) {
      this.navCtrl.setRoot('LoginPage');
    }else {
      this.user = this.userService.events[idPage - 1];
      this.showContent = true;
    }
  }

  ngOnInit() { }

}
