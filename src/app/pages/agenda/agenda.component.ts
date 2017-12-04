import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import { Data } from '../../shared/data/data.service';

import * as moment from 'moment';

declare function alert(message: string);



@Component({
  moduleId: module.id,
  selector: 'app-agenda',
  templateUrl: 'agenda.component.html',
  styleUrls: ['agenda.component.css']
})
export class AgendaComponent implements OnInit {

        calendarNavigator;
        monthLabels;
        pageDays;
        currentMonth;
        activeDay;

        constructor(public data: Data, private appRef: ApplicationRef, private router: Router) {
            this.calendarNavigator = moment();
            this.monthLabels = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
            this.pageDays = [];
        }




        ngOnInit() {
            console.log('oninit homecomponent');
            this.setPageDaysForDay(this.calendarNavigator);
        }

        ngAfterViewInit() {
        }


        setPageDaysForDay(calendarNavigator) {


          let day = calendarNavigator.clone();
          this.activeDay = day;
          this.currentMonth = day.month();
          // empty array
          this.pageDays = [];
          // save current month;
          let selectedMonth = day.month();
          let selectedYear = day.year();
          // move to topleft day of month
          day.startOf('month').startOf('isoWeek');
          // add first valid day// add current valid day
          this.pageDays.push(day.clone());
          // add days to array to get 6 complete rows
          for (let i = 0; i < 42; i++) {
              // go to next day
              day.add(1, 'days');
              let lday = {label: 'a' + day.date(), row: Math.floor(i / 7), col: i % 7 , daykey: day.format('YYYYMMDD'), month: day.month()};
              this.pageDays.push(lday);
          }
        }



        changeMonth(offset) {
          this.calendarNavigator.add(offset, 'months');
          this.setPageDaysForDay(this.calendarNavigator);
          this.appRef.tick();
        }


}
