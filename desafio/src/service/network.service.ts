import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular'
import { Network } from '@ionic-native/network'
import { HttpClient } from '@angular/common/http';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import NetworkHeartService from 'network-heart-service';


@Injectable()
export class NetworkService {

    isConnected: Boolean = false;

    constructor(
            public http: HttpClient,
            public alertCtrl: AlertController, 
            public network: Network,
            public eventCtrl: Events,
            public dialogs: Dialogs) {
        console.log('Hello NetworkProvider Provider');

        debugger

        this.networkConnection();

    }

    async networkConnection() {
        const isOnline = await NetworkHeartService.isOnline();
        console.log(isOnline);
        if(isOnline) {
            this.isConnected = true;
        } else {
            this.isConnected = false;
        }
    }
    

    public initializeNetworkEvents(): void {
        this.network.onDisconnect().subscribe(() => {
            this.dialogs.alert('Internet está desconnectada:-()');
        });
        this.network.onConnect().subscribe(() => {
            setTimeout(() => {
                this.dialogs.alert('Nós temos uma'+this.network.type+'conexão, woohoo!');
            }, 2000);
        });
    }

}