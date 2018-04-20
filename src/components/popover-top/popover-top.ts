import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
	selector: 'popover-top',
	templateUrl: 'popover-top.html'
})

export class PopoverTopComponent {

	public which: any;
	old: any;

	constructor(public viewCtrl: ViewController, public navParams: NavParams) {
		this.which = this.navParams.get("atual");
		this.old = this.navParams.get("atual");
	}

	mudar(opt) {
		if (opt == 1) {
			this.which = "Top";
		} else if (opt == 2) {
			this.which = "News";
		}
	}

	cancelar() {
		this.viewCtrl.dismiss(this.which);
	}

	enviar() {
		this.viewCtrl.dismiss(this.which);
	}

}
