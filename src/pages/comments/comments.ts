import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  texto: string;
  public comments: any;
  public post: any;
  public id_usuario: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {
  }

  carregarComentarios(){
    this.post = this.navParams.get("anuncio");

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('Access-Control-Expose-Headers', "true");

    let body = {
      anuncio: this.post
    }
    var link = 'https://bluedropsproducts.com/app/comments/puxarComentario';
    
    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.comments = data;
    });
  }

  enviarComentario(){

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('Access-Control-Expose-Headers', "true");

    let body = {
      anuncio: this.post,
      commUser: this.id_usuario,
      comments: this.texto
    }
    var link = 'https://bluedropsproducts.com/app/comments/salvarComentario';
    
    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        if(data) {
          this.texto = "";
          this.carregarComentarios();
        }
    });
  }

  ionViewDidLoad() {
    this.storage.get('meuid').then((val) => {
      console.log('Id', val);
      this.id_usuario = val;
    });
    this.carregarComentarios();
    console.log('ionViewDidLoad CommentsPage');
  }

}
