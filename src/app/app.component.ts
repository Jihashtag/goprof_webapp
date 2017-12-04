import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { Data } from './shared/data/data.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {

    menuOpen = false;


    constructor(public data: Data, private router: Router) {
    }

    logout() {
        this.data.socket.emit('logout', {});
    }

    goto(url) {
        this.router.navigate([url]);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

}
