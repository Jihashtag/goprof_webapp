import { Component, OnInit, OnDestroy, ApplicationRef, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-btn',
  moduleId: module.id,
  templateUrl: './btn.component.html',
  styleUrls: ['btn.component.css']
})


export class Btn implements OnInit {

  @Input('text') labelText;
  @Input('color') color;
  @Output() click: EventEmitter<Object> = new EventEmitter<Object>();

  @ViewChild('btn') btn: ElementRef;


  constructor() {
  }


  ngOnInit(): void {
  }

  tapped() {
    console.log('tapped');
    this.click.emit();
  }

}
