import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the PopoverNotificacoesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-notificacoes',
  templateUrl: 'popover-notificacoes.html'
})
export class PopoverNotificacoesComponent {

  userId: any;
  public notificacoes: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public http: Http) {
    this.http = http;
    this.userId = navParams.get("id_usuario");
    this.carregar_notificacoes();
  }

  carregar_notificacoes() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('Access-Control-Expose-Headers', "true");

    let body = {
      id_usuario: this.userId
    }
    var link = 'http://18.217.102.194/usuarios/notificacoes';

    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.notificacoes = data;
        console.log(data);
      });
  }

  goPost(post_id) {
    let data = {
      tipo: "post",
      id: post_id
    }
    this.viewCtrl.dismiss(data);
  }

  goPerfil(perfil_id) {
    let data = {
      tipo: "perfil",
      id: perfil_id
    }
    this.viewCtrl.dismiss(data);
  }

}
