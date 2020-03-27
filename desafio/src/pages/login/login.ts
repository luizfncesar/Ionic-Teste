import { Component, Injectable } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { NetworkService } from '../../service/network.service';
import { TabsPage } from '../tabs/tabs';
import { NotifierService } from "angular-notifier";



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
  private notifier: NotifierService;



  constructor(
      public navCtrl: NavController,
      public toastCtrl: ToastController,
      public navParams: NavParams,
      private userService: UserService,
      private networkService: NetworkService,
      private modal: ModalController,
      notifier: NotifierService
    ) {
      this.notifier = notifier;
  }

  ionViewDidLoad() {
    if(!this.networkService.isConnected) {
      this.notifier.show({
        message: "Sem acesso a internet",
        type: "error",
      });
    }else {
      this.notifier.show({
        message: "Está com acesso a internet",
        type: "success",
      });
    }

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
        this.notifier.show({
          message: "Usuário ou senha inválido!",
          type: "error",
        });
      }
    );
  }

  openModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create('ModalPage', myModalOptions);

    myModal.present();

    myModal.onWillDismiss((data) => {
      this.userService.postUsers(data).subscribe(
        (resp: any) => {
          this.notifier.show({
            message: "Registrado!",
            type: "success",
          });
        },
        error => {
          this.notifier.show({
            message: "Ocorreu ao se registrar!",
            type: "error",
          });
        }
      );
    });

  }

}