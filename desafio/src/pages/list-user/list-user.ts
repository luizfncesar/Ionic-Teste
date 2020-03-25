import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../service/user.service';


@IonicPage()
@Component({
  selector: 'page-list-user',
  templateUrl: 'list-user.html',
})
export class ListUserPage {
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListUserPage');
  }

  ngOnInit() {
    let idPage = this.navParams.get('id');
    this.user = this.userService.events[idPage];
  }

}
