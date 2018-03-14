import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

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

  public which: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.which = this.navParams.get("atual");
  }

  sair(opt) {
    if(opt == 1) {
      this.viewCtrl.dismiss("Top");
    } else if(opt == 2) {
      this.viewCtrl.dismiss("News");
    }
  }

}
