import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../shared/data/data.service';


declare function alert(message: string);




@Component({
  moduleId: module.id,
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent implements OnInit {
    private completed: boolean;

        constructor(public data: Data, private appRef: ApplicationRef, private router: Router) {

            this.completed = false;

        }


        ngOnInit() {
        }

        ngOnDestroy() {
            console.log('leaving video');
        }

        public videoFinished(args) {
                this.completed = true;

                this.router.navigate(['/cours']);
        }


        public pauseVideo() {
        }


        /**
         * Play the video
         */
        public playVideo() {
        }



}


