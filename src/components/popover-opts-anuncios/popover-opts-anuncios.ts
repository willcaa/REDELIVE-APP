import { Component } from '@angular/core';

/**
 * Generated class for the PopoverOptsAnunciosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-opts-anuncios',
  templateUrl: 'popover-opts-anuncios.html'
})
export class PopoverOptsAnunciosComponent {

  text: string;

  constructor() {
    console.log('Hello PopoverOptsAnunciosComponent Component');
    this.text = 'Hello World';
  }

}
