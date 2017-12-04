import { Component, ViewChild, ElementRef, ApplicationRef,  AfterViewInit, OnInit,  OnDestroy, ChangeDetectorRef, ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { Data } from '../../shared/data/data.service';

// let webViewInterfaceModule = require('nativescript-webview-interface');

import { initSession, initPublisher } from '@opentok/client';

declare function alert(message: string);


// import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { newpageModalComponent } from './../../modals/newPage.modal';







@Component({
  moduleId: module.id,
  selector: 'app-live',
  templateUrl: 'live.component.html',
  styleUrls: ['live.component.css']
})
export class LiveComponent implements OnInit, AfterViewInit, OnDestroy {
        @ViewChild('iframe') iframe: ElementRef;
        private wvInterface;
        private nativeWebView; // : WebView;
        public cameraPage = {id : 'camera', thumbnail: ''};
        public activePage = this.cameraPage;
        public pages = [];

        private session; // : initSession;
        @ViewChild('publisher') publisher: ElementRef;
        @ViewChild('subscriber') subscriber: ElementRef;

        @ViewChild('smallsubscriber') smallsubscriber: ElementRef;

        ngOnInit() {
            console.log('oninit livecomponent');
        }

        constructor(public data: Data, private appRef: ApplicationRef, private router: Router, private vcRef: ViewContainerRef) {
        }



        ngAfterViewInit() {
            // initiate webrtc
            this.nativeWebView = this.iframe.nativeElement;
            this.wvInterface = this.nativeWebView.contentWindow.window.nsWebViewInterface;
            console.log(this.wvInterface);
            console.log('initializing webrtc');
            this.data.socket.on('tokBoxData', (data) => {
                this.data.tokbox = data;
                this.session = initSession(this.data.tokbox.api, this.data.tokbox.sid);
                this.session.subscriber = this.subscriber.nativeElement;
                let session = this.session;
                let publisher = initPublisher(); 
                publisher = this.publisher.nativeElement;
                this.session.connect(this.data.tokbox.tok, function(error) {
                  if (error) {
                    console.log('Error connecting: ', error.name, error.message);
                  } else {
                    console.log('Connected to the session.');
                    session.on('streamCreated', function(event) {
                       session.subscribe(event.stream, 'subscriber', {
                       insertMode: 'append',
                       width: '100%',
                       height: '100%'
                    }, function(error){if (error){console.log(error);}});
                });
                    session.publish(publisher);
                  }
                });
            });

            // loading languages in dropdown, on load of webView.
            // this.nativeWebView.on('loadFinishedEvent', (args: LoadEventData) => {
            //  if (!args.error) {

            //      }
            //  });

            // listen for line draws
            this.wvInterface.on('drawLine', (data) =>
            {
                alert('draw');
                this.data.socket.emit('drawLine',data);
            });

            // thumbnail Updates
            this.wvInterface.on('updateThumbnail', (data) =>
            {
                this.activePage.thumbnail = data;
                this.data.refreshUI();
            });

            this.wvInterface.on('log', (data) =>
            {
                console.log(data);
            });




            // Server communication
            this.data.socket.on('drawLine', (data) => {
                console.log('DRAWLINE');
                this.wvInterface.emit('drawLine', data);
            });

            this.data.socket.on('createPage', (page) => {
                console.log('createPage');
                this.pages.push(page);
                this.wvInterface.emit('createPage', page);
                // //on l'ouvre
                this.activePage = page;
                this.wvInterface.emit('openPage', page);
                this.appRef.tick();

            });

            this.data.socket.on('openPage', (data) =>
            {
                if(data.pageID == 'camera')
                {
                    this.activePage = this.cameraPage;
                    // this.session.subscriber = this.subscriber.nativeElement;
                }
                else this.pages.forEach( (page) =>
                {
                    if(page.id == data.pageID)
                    {
                        this.activePage = page;
                        this.wvInterface.emit('openPage', page);
                        // this.session.subscriber = this.smallsubscriber.nativeElement;
                    }
                });
                this.appRef.tick();
            });
        }

        ngOnDestroy() {
            // cleaning up references/listeners.
            console.log('session destroy');
            this.wvInterface.destroy();
            this.wvInterface = null;

            this.session.disconnect();
        }
        newPage(pageType) {
        }

        openPage(pageID) {
            alert('openPage');
            this.data.socket.emit('openPage', { pageID : pageID });
        }


        save() {

            this.wvInterface.callJSFunction('getCanvasData', {}, (result) => {
                    this.data.socket.emit('saveToFiles',{ title : 'test', src : result.image, thumbnail : result.thumbnail });
                     alert('La feuille a été enregistrée dans tes fichiers!');
            });
        }

        newPageChoice(bootOnCamera) {
            console.log('newPageChoice');
            var res = this.wvInterface = new newpageModalComponent(this.data);
            if(res.page == 'camera'){}
            else if(res.page == 'file'){}
            else this.data.socket.emit('createPage',{ pageType : res.page, conversationID : 0 }); //res = blank, quad ou copy
        }

}
