import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  public tipo: any = "Carregando...";
  public people: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  loadPeople() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    let body = {
      id_usuario: this.userId,
      tipo: this.tipo
    }

    let link = 'http://18.217.102.194/usuarios/Stats';
    
    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.people = data;
      });
  }

  goPerfil(id_perfil) {
    this.navCtrl.push(PerfilPage, {
      perfilId: id_perfil, userId: this.userId
  });
  }

  ionViewDidLoad() {
    this.tipo = this.navParams.get("tipo");
    this.userId = this.navParams.get("userId");
    this.loadPeople();
  }

}
