import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'shadow-ui-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.css']
})
export class FormDemoComponent implements OnInit {
  name = 'test1';

  placeholder = 'place';

  // @HostListener('click')
  // test() {
  //   this.placeholder = 'neuer place';
  // }

  constructor() { }

  ngOnInit() {
  }

}
