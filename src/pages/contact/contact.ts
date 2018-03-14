import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }
  openDetails() {
    this.navCtrl.push('FilmDetailsPage');
  }
  pushPage() {
    this.navCtrl.push('FeedPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.pushPage();
  }
  
}
