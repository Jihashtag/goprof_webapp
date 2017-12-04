import { Component, ViewChild, ElementRef, ApplicationRef,  AfterViewInit, OnInit,  OnDestroy, ChangeDetectorRef, ViewContainerRef } from '@angular/core';


import { Router } from '@angular/router';
import { Data } from '../../shared/data/data.service';
// let webViewInterfaceModule = require('nativescript-webview-interface');

declare function alert(message: string);


@Component({
  moduleId: module.id,
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent implements AfterViewInit, OnDestroy {
        // @ViewChild('webView') webView: ElementRef;
        private wvInterface;
        // private nativeWebView: WebView;


        constructor(public data: Data, private appRef: ApplicationRef, private router: Router, private vcRef: ViewContainerRef) {
        }


        ngAfterViewInit() {
          window.location.href = 'https://goprof.fr/game';
            // this.nativeWebView = this.webView.nativeElement;
            // this.wvInterface = new webViewInterfaceModule.WebViewInterface(this.nativeWebView, 'https://goprof.fr/game');
        }

        ngOnDestroy() {
            // cleaning up references/listeners.
            console.log('session destroy');
        }

}
