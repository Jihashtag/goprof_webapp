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

    conversationsModel = {conversations:[], loaded:false};
    openConversation:any = {loaded:false};

    profsModel={profs:[], loaded:false};
    openProf:any = null;
    openProfAgendaModel:any = {elements:[], loaded:false};

    videosModel={videos:[], loaded:false};
    openVideo:any = null;

    appref;
    tokbox = {tok: '', sid: '', api: ''};

  constructor(private appRef: ApplicationRef, public router: Router) {
    this.appref = appRef;
    this.socket = io(server);
    this.socket.on('connect', () => {
      console.log('connect');
      this.socket.emit('connected', {  });
    });


    this.socket.on('updateModel', (model) => {

            console.log(' ------ updating model '+model.name+' -------');
            console.log(model.data);
            // update model data
            this[model.name] = model.data;

            // set loaded flag to true
            this[model.name].loaded = true;
            if(model.name == "conversationsModel" && this.openConversation) {
                 this.conversationsModel.conversations.forEach(conversation => {
                     if(this.openConversation.id == conversation.id) {
                         this.openConversation.last_message_time = conversation.last_message_time;
                         this.openConversation.text = conversation.text;
                         this.openConversation.users = conversation.users;
                     }
                 });
             }

            //calendar events prof
            if(model.name == "openProfAgendaModel")
            {
              this.openProfAgendaModel.loaded = false;
              // this.openProfAgendaModel.elements = new Array<CalendarEvent>();
              model.data.hours.forEach(hour => {
                var startDate: Date = new Date(hour.start);
                var endDate: Date = new Date(hour.end);
                var text = "indisponible - "+hour.id;
                var color = "#101010";
                if(hour.available) { text = "libre - "+hour.id; color= "#99EF77"; }
                // var event = new CalendarEvent(text, startDate, endDate, false, color);
                this.openProfAgendaModel.elements.push(event);
              });

            }

            //set loaded flag to true
            this[model.name].loaded = true;

            // refresh des views
            this.appRef.tick();
            this.refreshUI();

    });

    this.socket.on('updateMessages', (data) => {
        console.log(' ------ updating chat -------');
        if(!this.openConversation.loaded) {
            this.openConversation = {};
            this.openConversation.id = data.conversation_id;
            this.openConversation.members = [];
            this.openConversation.messages = data.messages;
            this.openConversation.loaded = true;
        }
        else if(this.openConversation.id == data.conversation_id) {
          this.openConversation.messages = data.messages;
          this.openConversation.loaded = true;
        }
        this.appRef.tick();
    });
    this.socket.on('updateConversation', (data) => {

        //notifier l'utilisateur si pas son propre message
        if(data.sender.id != this.user.id ) {
            if( (this.router.isActive('/messages', true) && this.openConversation.id == data.conversation_id) || !this.router.isActive('/messages', true)) {
                alert("Psst! Tu as un nouveau message de la part de "+data.sender.fname+".");
            }
        } 
        if(this.openConversation.id == data.conversation_id && this.router.isActive('/messages', true) ) this.socket.emit('getMessages', {conversation_id: data.conversation_id});
        
        //recharger les conversations  ->
        this.socket.emit('getConversations');

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
