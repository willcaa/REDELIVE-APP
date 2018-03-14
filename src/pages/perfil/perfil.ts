import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PopoverController } from 'ionic-angular';
import { PopoverDenunciarComponent } from '../../components/popover-denunciar/popover-denunciar';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  userId: any;
  perfilId: any;
  public anuncios: any;
  public usuario: any;
  public usuario_nome: any;
  public usuario_imagem: any;
  public perfil_imagem: any;
  public perfil_nome: any;
  public index_anuncio: any;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private _sanitizer: DomSanitizer, public navParams: NavParams, public http: Http, private storage: Storage,) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverDenunciarComponent,{},{cssClass:"popover-denuncia"});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      console.log(popoverData);
    })
  }

  carregarPerfil() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    console.log(this.userId);
    let body = {
      id_usuario: this.userId,
      id_perfil: this.perfilId
    }

    let link = 'https://bluedropsproducts.com/app/usuarios/perfil';
    
    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.anuncios = data['anuncios'];
        this.usuario = data['usuario'];
        this.perfil_nome = this.anuncios[0]['nome'];
        this.perfil_imagem = this.anuncios[0]['user_image'];
        this.usuario_imagem = this.usuario['user_image'];
        console.log(data);
      });
  }

  getImage(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  
  loadMore(infiniteScroll = null) {
    this.index_anuncio = this.index_anuncio + 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.perfilId = this.navParams.get("perfilId");
    this.userId = this.navParams.get("userId");
    this.carregarPerfil();
  }

}
