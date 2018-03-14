import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  public loop: any;

  constructor(public viewCtrl: ViewController) {
    
  }

  getImage() {
   document.getElementsByClassName("popover-content")[0]['style'].top = "144px"; 
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.loop = this.getImage();
  }
}
