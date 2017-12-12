import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from "@angular/core";
import { Router } from '@angular/router';
import { Data } from "../../shared/data/data.service";

import * as moment from 'moment';

declare function alert(message:string);


@Component({
  moduleId: module.id,
  selector: "ng-settings",
  templateUrl: "settings.component.html",
  styleUrls: ["settings.component.css"]
})
export class SettingsComponent implements OnInit 
{
        constructor(public data:Data,private appRef:ApplicationRef, private router: Router) {
        }
        ngOnInit() {

        }

        save() {
          this.data.socket.emit('setUserData',this.data.user);
        }
}