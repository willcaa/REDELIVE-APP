import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Content } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  isLoggedIn:boolean = false;
  users: any;
  destination: string;
  start: string;
  data:any = {};
  loginId: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, private fb: Facebook, private storage: Storage) {
    this.http = http;
    this.start = "";
    this.destination = "";
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

  cadastrar(email, nome, imagem) {

    
    this.storage.get('meuid').then((val) => {
      console.log('Id', val);
      this.loginId = val;
    });
    if(this.loginId) {
      this.navCtrl.push('FeedPage');
      console.log("logado");
    } else {
      let headerx = new Headers();
      headerx.append('Access-Control-Allow-Origin', '*');
      headerx.append('Accept', 'application/json');
      headerx.append('content-type', 'application/json');
      var myData = JSON.stringify({email: email, nome: nome, imagem: imagem});
      var link = 'https://bluedropsproducts.com/app/usuarios/cadastrar';
  
      this.http.post(link, myData, { headers: headerx })
        .map(res => res.json())
        .subscribe(data => {
          console.log(data.id);
          if ( data ) {
            this.storage.set('nome', data.nome);
            this.storage.set('email', data.email);
            this.storage.set('imagem', data.user_image);
            this.storage.set('meuid', data.id);
            this.storage.get('meuid').then((val) => {
              console.log('Id', val);
              this.loginId = val;
            });
             
            console.log("logado");
            this.navCtrl.push('FeedPage');
              
          };
          console.log(data);
        });
    }
  }


  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
        this.cadastrar(this.users.email, this.users.name, this.users.picture.data.url);

      })
      .catch(e => {
        console.log(e);
      });
  }
  


  ionViewDidLoad() {
    
    console.log('ionViewDidLoad RegisterPage');
    // this.cadastrar();
  }

}
