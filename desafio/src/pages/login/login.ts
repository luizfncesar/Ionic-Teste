import { Component, Injectable } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { TabsPage } from '../tabs/tabs';


@Injectable()

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  showContent: boolean = false;
  usersList: Array<UserModel[]>;
  email: string;
  password: string;


  constructor(
      public navCtrl: NavController,
      public toastCtrl: ToastController,
      public navParams: NavParams,
      private userService: UserService,
      private modal: ModalController
    ) {
  }

  ionViewDidLoad() {
    if(localStorage.getItem('users_data')) {
      this.navCtrl.setRoot(TabsPage);
    }else {
      this.showContent = true;
    }
  }

  signUp() {
    this.openModal();
  }

  signIn() {
    const param = {
      email: this.email,
      senha: this.password
    }

    this.userService.postSessions(param).subscribe(
      (resp: any) => {
        this.showContent = false;
        this.userService.profile = resp;
        localStorage.users_data = JSON.stringify(this.userService.profile);
        this.navCtrl.setRoot(TabsPage);
      },
      error => {
        console.log('erro');
      }
    );
  }

  openModal() {
    debugger;
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create('ModalPage', myModalOptions);

    myModal.present();

    myModal.onWillDismiss((data) => {
      this.userService.postUsers(data).subscribe(
        (resp: any) => {
          console.log('registrado')
        },
        error => {
          console.log('erro');
        }
      );
    });

  }

}