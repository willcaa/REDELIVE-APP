import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { FeedPage } from '../pages/feed/feed';
import { RegisterPage } from '../pages/register/register';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, screen: ScreenOrientation, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString("#412e6d");
      // screen.lock(screen.ORIENTATIONS.PORTRAIT);
      storage.get('meuid').then((val) => {
        if(val) {
          storage.get('imagem').then((val) => {
            if(val) {
              storage.get('email').then((val) => {
                if(val) {
                  storage.get('nome').then((val) => {
                    if(val) {
                      this.rootPage = RegisterPage;
                    } else {
                      this.rootPage = RegisterPage;
                    } 
                  });
                } else {
                  this.rootPage = RegisterPage;
                } 
              });
            } else {
              this.rootPage = RegisterPage;
            } 
          });
        } else { 
          this.rootPage = RegisterPage;
        }
      });
    });
  }
}
