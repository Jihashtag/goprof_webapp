import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from "@angular/core";
import { Data } from "../../shared/data/data.service";
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: "ng-messages",
  templateUrl: "messages.component.html",
  styleUrls: ["messages.component.css"]
})
export class MessagesComponent implements OnInit 
{
    newMessage="";
    scrollDownTimeOut;
   //timer = require("timer");
   lowestMessageID = -1;

    constructor(public data:Data) {
        moment.locale('fr'); //sets moment in french;
    }

    ngOnInit() {


    }

    humanTime(time) {
        return moment(time).calendar();
    }


    scrollDown(id) {
    }


    sendMessage() {
        if(this.newMessage.length == 0)return;
        this.data.openConversation.messages.push({user_id:this.data.user.id, local:true, content:this.newMessage, id:99999999  });
        this.data.refreshUI();
        this.data.socket.emit('sendMessage',{message:this.newMessage, conversation_id:this.data.openConversation.id});
        this.newMessage = "";
    }

    id2name(userID) {
        return this.data.openConversation.members.filter(elm=>{ return elm.id == userID})[0].fname;
    }

    notMeArray(members) {
        var arr = [];
        members.forEach(member => {
            if(member.id != this.data.user.id)arr.push(member);
        });
        return arr;
    }

}