import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PopoverController } from 'ionic-angular';
import { PopoverDenunciarComponent } from '../../components/popover-denunciar/popover-denunciar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CommentsPage } from '../comments/comments';
import { StatsPage } from '../stats/stats';

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
  public stat_anuncios: any = 0;
  public stat_seguidores: any = 0;
  public stat_seguindo: any = 0;
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
  enviandoSeguir: boolean;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public photoViewer: PhotoViewer, public popoverCtrl: PopoverController, private _sanitizer: DomSanitizer, public navParams: NavParams, public http: Http, private storage: Storage,) {
  }
  
  ionViewDidLoad() {
    this.perfilId = this.navParams.get("perfilId");
    this.userId = this.navParams.get("userId");
    this.perfil_imagem = this.navParams.get("image");
    this.perfil_nome = this.navParams.get("nome");
    this.enviandoSeguir = false;
    this.checkSeguir(this.perfilId, this.userId);
    this.getStats();
    this.carregarPerfil();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.checkSeguir(this.perfilId, this.userId);
     this.getStats();
     this.carregarPerfil();
      refresher.complete();
    }, 2000);
  }

  comments(postId) {
    this.navCtrl.push(CommentsPage, {
      anuncio: postId
     });
     // let headers = new Headers();
     // headers.append('Access-Control-Allow-Origin', '*');
     // headers.append('Accept', 'application/json');
     // headers.append('content-type', 'application/json');
 
     // let body = {
     //   anuncio: postId,
     //   liker: this.userId
     // }
     // var link = 'https://bluedropsproducts.com/app/likes/top';
 
     // this.http.post(link, JSON.stringify(body), { headers: headers })
     //   // .map(res => res.json())
     //   .subscribe(data => {
     //     console.log(data);
     //     // console.log(data.data);
     //   });
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
        //this.perfil_nome = this.anuncios[0]['nome'];
        //this.perfil_imagem = this.anuncios[0]['user_image'];
        this.usuario_imagem = this.usuario['user_image'];
      });
  }

  goStats(which) {
      this.navCtrl.push(StatsPage, {
        tipo: which,
        userId: this.userId
      });
  }

  getStats() {
    let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      let body = {
        id_usuario: this.perfilId
      }

      let link = 'https://bluedropsproducts.com/app/usuarios/getStats';

      this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.stat_anuncios = data.anuncios;
        this.stat_seguidores = data.seguidores;
        this.stat_seguindo = data.seguindo;
      });
  }
  
  seguir(id_perfil, id_usuario) {
    if(id_perfil == id_usuario) {
      this.showAlert("OPA!","Você não pode deixar de seguir você mesmo!","OK");
    } else if(this.seguindo && !this.enviandoSeguir) {
      this.enviandoSeguir = true;
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
        this.enviandoSeguir = false;
      });
    } else if(!this.seguindo && !this.enviandoSeguir) {
      this.enviandoSeguir = true;
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
        this.enviandoSeguir = false;
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

  ampliarImagem(imagem, texto = "") {
    this.photoViewer.show('https://bluedropsproducts.com/app/uploads/'+imagem,texto,{share:true});
  }

  getImage(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  
  deleteAnuncio(post) {
    let confirm = this.alertCtrl.create({
      title: 'Você Realmente Deseja Deletar Este Anuncio?',
      message: 'Caso você delete este anuncio ele desaparecerá permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceitar',
          handler: () => {
            let index = this.anuncios.indexOf(post);
              if(index > -1){
                this.anuncios.splice(index, 1);
              }
            let headers = new Headers();
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Accept', 'application/json');
            headers.append('content-type', 'application/json');

            let body = {
              id_anuncio: post.id_anuncio,
            }

            let link = 'https://bluedropsproducts.com/app/anuncios/deletar';

            this.http.post(link, JSON.stringify(body), { headers: headers })
            .map(res => res.json())
            .subscribe(data => {
            
            });
          }
        }
      ]
    });
    confirm.present();
  }
  
  // loadMore(infiniteScroll = null) {
  //   this.index_anuncio = this.index_anuncio + 1;
  // }

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
