import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { FeedPage } from '../feed/feed';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = FeedPage;

  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    this.navCtrl.push('FeedPage');
  }
}
