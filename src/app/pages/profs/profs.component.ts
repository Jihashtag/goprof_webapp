import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from "@angular/core";

import { Data } from "../../shared/data/data.service";

import * as moment from 'moment';






@Component({
  moduleId: module.id,
  selector: "ns-profs",
  templateUrl: "profs.component.html",
  styleUrls: ["profs.component.css"]
})
export class ProfsComponent implements OnInit 
{
    constructor(public data:Data) {
        this.data.socket.emit('getProfs');
        moment.locale('fr'); //sets moment in french;
    }

    ngOnInit() {


    }

    openProf(prof,event) {
        this.data.openProf = prof;
        this.data.router.navigate(["/prof"]);
    }


    humanTime(time) {
        return moment(time).calendar();
    }

    // hasNewMessages(conversation) {
    //     return moment(conversation.last_message_time).isAfter(moment(conversation.last_access));
    // }

    // notMeArray(members) {
    //     var arr = [];
    //     members.forEach(member => {
    //         if(member.id != this.data.user.id)arr.push(member);
    //     });
    //     return arr;
    // }
} 