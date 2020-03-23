import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../service/user.service';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  ngOnInit() {
    debugger
    let idPage = this.navParams.get('id');
    this.user = this.userService.events[idPage];
  }

}
