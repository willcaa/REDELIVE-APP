import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverDenunciarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-denunciar',
  templateUrl: 'popover-denunciar.html'
})
export class PopoverDenunciarComponent {

  constructor(public viewCtrl: ViewController) {

  }

  sair(opt) {
    if(opt == 1) {
      this.viewCtrl.dismiss("denunciar");
    } else if(opt == 2) {
      this.viewCtrl.dismiss("bloquear");
    } else if(opt == 3) {
      this.viewCtrl.dismiss("cancelar");
    }
  }

}
