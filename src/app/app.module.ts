import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// import { FormsModule } as NativeScriptFormsModule from '@angular/forms';

import { AppRoutingModule, navigatableComponents } from './app.routing';
import { AppComponent } from './app.component';

/* Service (providers) */
import { Data } from './shared/data/data.service';

/* Modals */
import { newpageModalComponent } from "./modals/newPage.modal";

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
        MatDialogModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        newpageModalComponent,
        Btn,
        ...navigatableComponents
    ],
    entryComponents: [newpageModalComponent],
    providers: [
        Data
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
