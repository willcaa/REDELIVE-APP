import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController) {

  }
  denunciar() {
    this.viewCtrl.dismiss("denunciar");
  }
}
