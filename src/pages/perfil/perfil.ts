import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  public seguindo: any;
  public userId: any;
  public perfilId: any;
  public anuncios: any;
  public usuario: any;
  public usuario_nome: any;
  public usuario_imagem: any;
  public perfil_imagem: any;
  public perfil_nome: any;
  public index_anuncio: any;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public popoverCtrl: PopoverController, private _sanitizer: DomSanitizer, public navParams: NavParams, public http: Http, private storage: Storage,) {
  }
  
  ionViewDidLoad() {
    this.perfilId = this.navParams.get("perfilId");
    this.userId = this.navParams.get("userId");
    this.carregarPerfil();
  }
  
  carregarPerfil() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

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
        this.checkSeguir(this.perfilId, this.userId);
      });
  }


  seguir(id_perfil, id_usuario) {
    if(id_perfil == id_usuario) {
      this.showAlert("OPA!","Você não pode deixar de seguir você mesmo!","OK");
    } else if(this.seguindo) {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      let body = {
        id_perfil: id_perfil,
        id_usuario: id_usuario
      }

      let link = 'https://bluedropsproducts.com/app/usuarios/DeixarSeguir';

      this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.seguindo = false;
      });
    } else {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      let body = {
        id_perfil: id_perfil,
        id_usuario: id_usuario
      }

      let link = 'https://bluedropsproducts.com/app/usuarios/seguir';

      this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.seguindo = true;
      });
    }
  }

  checkSeguir(id_perfil, id_usuario) {
    if(id_perfil == id_usuario) {
      this.seguindo = true;
    } else {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      let body = {
        id_perfil: id_perfil,
        id_usuario: id_usuario
      }

      let link = 'https://bluedropsproducts.com/app/usuarios/checkSeguidor';

      this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.seguindo = data;
      });
    }
  }


  getImage(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  
  
  loadMore(infiniteScroll = null) {
    this.index_anuncio = this.index_anuncio + 1;
  }

  showAlert(title, text, button) {
    let alert = this.alertCtrl.create({ title: title, subTitle: text, buttons: [button] });
    alert.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverDenunciarComponent,{},{cssClass:"popover-denuncia"});
    popover.present({ ev: myEvent });
    popover.onDidDismiss(popoverData => {
      if(popoverData) {

      }
    })
  }

}
