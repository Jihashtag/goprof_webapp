import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from "@angular/core";
import { Router } from "@angular/router";

import { Data } from "../../shared/data/data.service";

import * as moment from 'moment';

// import { RadCalendar, CalendarViewMode, CalendarEventsViewMode, AllDayEventsViewStyle,  } from "nativescript-pro-ui/calendar";
// import { CalendarEvent, CalendarSelectionEventData } from 'nativescript-pro-ui/calendar' 


declare function alert(message:string);


@Component({
  moduleId: module.id,
  selector: "ns-profagenda",
  templateUrl: "profagenda.component.html",
  styleUrls: ["profagenda.component.css"]
})
export class ProfagendaComponent implements OnInit 
{

        private _viewModesInfo;

        @ViewChild('cal') cal: ElementRef;
                                                

        constructor(public data:Data, private appRef:ApplicationRef, private router: Router) {
        }

        ngOnInit()  {
            /*console.log('oninit');
            let calendar:RadCalendar = this.cal.nativeElement;
            console.log(calendar.eventsViewMode);

            calendar.eventsViewMode = "Inline";
            console.log(calendar.eventsViewMode);   

            calendar.eventsViewMode = CalendarEventsViewMode.Inline;
            console.log(calendar.eventsViewMode);

            console.log(calendar.ios.viewMode);*/
        }

        hourTap(evt) {
            console.log(evt);
        }

}
