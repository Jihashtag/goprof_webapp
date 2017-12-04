import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
// import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { FormsModule } from '@angular/forms';
// import { FormsModule } as NativeScriptFormsModule from '@angular/forms';

import { AppRoutingModule, navigatableComponents } from './app.routing';
import { AppComponent } from './app.component';

/* Service (providers) */
import { Data } from './shared/data/data.service';

/* Modals */
// import { newpageModalComponent } from "./modals/newPage.modal";

// videoplayer
// import {registerElement} from "nativescript-angular/element-registry";
// registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

import { Btn } from './btn/btn.component';


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
//       newpageModalComponent,
       Btn,
        ...navigatableComponents
    ],
//    entryComponents: [newpageModalComponent],
    providers: [
        Data
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
