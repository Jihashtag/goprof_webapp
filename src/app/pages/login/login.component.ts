import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../shared/data/data.service';

declare function alert(message: string);


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
        step="none";
        registerForm:any = {fname:"", lname:"", mail:"", pass:"", pass2:"", need_math:false, need_histoire:false, need_francais:false, need_geo:false, classe:"cm1"};
        loginForm:any = {mail:"vincent@site47.fr", pass:""}


        constructor(public data: Data, private appRef: ApplicationRef, public router: Router) {
        }

        ngOnInit() {
        }

        ngAfterViewInit() {
          this.openNone();
        }
        login() {
          console.log("loging in...");
          this.data.socket.emit('login',this.loginForm);   
        }
        register() {
          console.log("register...");
          this.data.socket.emit('register',this.registerForm);
        }

        openLogin() {
          this.step = 'login';
        }
        openRegister() {
          this.step = 'register';
        }
        openNone() { 
          //show logo
          // (<View>this.page.getViewById("logo")).animate({opacity:1,duration: 2000,translate: { x:0, y:0 },curve: AnimationCurve.spring,delay:220,});

          //show perso
          //(<View>this.page.getViewById("perso")).animate({opacity:1,duration: 3000,translate: { x:0, y:0 },curve: AnimationCurve.spring,delay:1220,});
          this.step = 'none';
         }
}
