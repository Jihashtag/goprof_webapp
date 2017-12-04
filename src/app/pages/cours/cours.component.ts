import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../shared/data/data.service';

declare function alert(message: string);




@Component({
  moduleId: module.id,
  selector: 'app-cours',
  templateUrl: 'cours.component.html',
  styleUrls: ['cours.component.css']
})
export class CoursComponent implements OnInit {

        constructor(public data: Data, private appRef: ApplicationRef, private router: Router) {
        }

        ngOnInit() {
        }

        openPlayer(filename) {
          this.data.vidURL = 'https://goprof.fr/' + filename;
          this.router.navigate(['/player']);
        }

}


