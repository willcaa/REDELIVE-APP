import { Component } from '@angular/core';

/**
 * Generated class for the PopoverTopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-top',
  templateUrl: 'popover-top.html'
})
export class PopoverTopComponent {

  text: string;

  constructor() {
    console.log('Hello PopoverTopComponent Component');
    this.text = 'Hello World';
  }

}
