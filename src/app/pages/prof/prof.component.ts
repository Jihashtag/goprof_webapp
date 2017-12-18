import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from "@angular/core";
import { Data } from "../../shared/data/data.service";

import * as moment from 'moment';


@Component({
  moduleId: module.id,
  selector: "app-prof",
  templateUrl: "prof.component.html",
  styleUrls: ["prof.component.css"]
})
export class ProfComponent implements OnInit 
{
    constructor(public data:Data) {
        moment.locale('fr'); //sets moment in french;
    }

    ngOnInit() {
    }

    openConversation() {
        if(this.data.openProf.id) this.data.socket.emit('newConversation',{userID:this.data.openProf.id});
        this.data.openConversation = {loaded:false};
        this.data.router.navigate(["/messages"]);
    }

    rdv() {
        if(this.data.openProf.id) this.data.socket.emit('getProfAgenda',{userID:this.data.openProf.id});
        this.data.openProfAgendaModel = {elements : [],loaded:false};
        this.data.router.navigate(["/profagenda"]);
    }

   

    humanTime(time) {
        return moment(time).calendar();
    }
}
