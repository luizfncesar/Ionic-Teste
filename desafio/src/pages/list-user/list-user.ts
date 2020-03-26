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
    console.log('ionViewDidLoad ListUserPage');
    let idPage = this.navParams.get('id');
    if( !this.userService.auth && !idPage) {
      this.navCtrl.setRoot('LoginPage')
    } else {
      this.user = this.userService.events[idPage];
      this.showContent = true;
    }
  }

  ngOnInit() { }

}
