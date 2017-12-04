import { Injectable, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
declare function alert(message: string);

// var applicationSettings = require("application-settings");


import * as io from 'socket.io-client';
const server = 'https://goprof.fr:8840';


// var SocketIO = require('nativescript-socket.io');

@Injectable()
export class Data {

    // on récupère les messages enregistrés localement

    filesModel = { files : [] };
    socket;
    user = {id:0, fname:"", lname:""};
    activeTab: number;


    appref;
    tokbox = {tok: '', sid: '', api: ''};

    vidURL = '';


  constructor(private appRef: ApplicationRef, private router: Router) {
    this.appref = appRef;
    this.socket = io(server);
    this.socket.on('connect', () => {
      console.log('connect');
      this.socket.emit('connected', {  });
    });


 //  contient model.name et model.data
        this.socket.on('updateModel', (model) => {


                // update model data
                this[model.name] = model.data;

                // set loaded flag to true
                this[model.name].loaded = true;

                // refresh des views
                this.appRef.tick();
                this.refreshUI();

        });



        this.socket.on('userAlert', (data) => {
            alert(data.message);
        });


         this.socket.on('tokBoxData', (data) => {
            console.log(data);
            this.tokbox = data;
            this.refreshUI();
        });


         this.socket.on('loginOK', (data) => {
            this.user = data;
            console.log(this.user);
            this.router.navigate(['/home']);
            this.refreshUI();
        });



  }


  logout() {
        this.user = null;
  }
//  si le service dispose déja du model, il ne va pas le recharger, sauf si forceUpdate est vrai.
  requestModel(model, forceUpdate = false, extraData = {} ) {
      console.log('request model update to dataservice for model ' + model + ' .');

      // faire une demande au serveur uniquement si loaded est false ou forceupdate est true
      if ( !this[model].loaded || forceUpdate) {
          console.log('request accepted by dataservice, sending request to server');
          this.socket.emit('getModel', {requestedModel : model, data : extraData});
      } else {
        console.log('request rejected by dataservice, service already has a version of the model.');
      }

  }

  refreshUI() {
      this.appRef.tick();
  }


}
