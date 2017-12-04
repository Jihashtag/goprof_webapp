import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import { Data } from '../../shared/data/data.service';


declare function alert(message: string);




@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
        public webviewsrc = 'http://goprof.fr/draw.html';
        public url = 'https://www.google.com';

        public connectStatus = 'not connected';
        labMoved = false;
        labLight = false;

        logo;

        constructor(public data: Data, private appRef: ApplicationRef, private router: Router) {
        }


        connect(userid) {
        }

        goto(page) {
        }

        call(userid) {
        }


        mainscroll(ev) {
        }



        ngOnInit() {
            console.log('oninit homecomponent');

            if (this.data.user == null) {
                console.log('user not logged!');

                this.router.navigate(['/login']);
            }

        }

        ngAfterViewInit() {
        }


        openLive() {
            this.router.navigate(['/live']);
        }



        openCours() {
            this.router.navigate(['/cours']).then(() => { });
        }


        opengame() {
            console.log('openGame');
            this.router.navigate(['/game']);
        }
}


