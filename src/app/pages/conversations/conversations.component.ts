import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from "@angular/core";

import { Data } from "../../shared/data/data.service";

import * as moment from 'moment';



@Component({
  moduleId: module.id,
  selector: "ng-conversations",
  templateUrl: "conversations.component.html",
  styleUrls: ["conversations.component.css"]
})
export class ConversationsComponent implements OnInit 
{
    constructor(public data:Data) {
        this.data.socket.emit('getConversations');
        moment.locale('fr'); //sets moment in french;
    }

    ngOnInit() {

    }

    openConversation(conversation,event) {
        this.data.openConversation = conversation;
        this.data.openConversation.messages = [];
        this.data.openConversation.loaded = false;
        this.data.socket.emit('getMessages', {conversation_id: conversation.id});
        this.data.router.navigate(["/messages"]);
    }


    humanTime(time) {
        return moment(time).calendar();
    }

    hasNewMessages(conversation) {
        return moment(conversation.last_message_time).isAfter(moment(conversation.last_access));
    }

    notMeArray(members) {
        var arr = [];
        members.forEach(member => {
            if(member.id != this.data.user.id)arr.push(member);
        });
        return arr;
    }

}