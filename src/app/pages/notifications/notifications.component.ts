import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from "@angular/core";
import { Router } from '@angular/router';
import { Data } from "../../shared/data/data.service";
import * as moment from 'moment';


declare function alert(message:string);


@Component({
  moduleId: module.id,
  selector: "ng-notifications",
  templateUrl: "notifications.component.html",
  styleUrls: ["notifications.component.css"]
})
export class NotificationsComponent implements OnInit 
{
    notifs = [{id:1, text:"Bienvenue sur Goprof", date:"17/11/2017 à 12:43"}, {id:1, text:"Cours avec Charline Lebondu", date:"17/11/2017 à 14:00"}, {id:1, text:"Paiement reçu pour le cours #5183", date:"17/11/2017 à 15:43"}];

    constructor(public data:Data, private appRef:ApplicationRef, private router: Router){

    }

    ngOnInit() {

    }


    pull($event) {
        console.log('pull..');
    }
}