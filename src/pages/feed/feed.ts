import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Content } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { AboutPage } from '../about/about';
import { CommentsPage } from '../comments/comments';
import { PerfilPage } from '../perfil/perfil';
import { MapPage } from '../map/map';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverTopComponent } from '../../components/popover-top/popover-top';
import { PopoverOptsAnunciosComponent } from '../../components/popover-opts-anuncios/popover-opts-anuncios';
/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var globalLat: any;
declare var globalLng: any;

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  @ViewChild("contentRef") contentHandle: Content;
  texto:string;
  public feed: any;
  public btnTop: boolean;
  public btnNews: boolean;
  public topOrNews: any = 'Top';
  public index_feed: number;
  options: GeolocationOptions;
  currentPos: Geoposition;
  public items = [];
  public local_array: any;
  public local_array1: any;
  public local_array2: any;
  public local_array3: any;
  public local_array4: any;
  public local_array5: any;
  public teste: any;
  public bairro: string;
  public cidade: string;
  public estado: string;
  public pais: string;
  private tabBarHeight;
  private topOrBottom:string;
  private contentBox;
  destination:string;
  start:string;
  loginId: number;
  userId: any;
  userImagem: any;
  local: any;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public alertCtrl: AlertController, public navParams: NavParams, public http: Http, private geolocation: Geolocation, private launchNavigator: LaunchNavigator, public loadingCtrl: LoadingController, private storage: Storage, private photoViewer: PhotoViewer) {
    this.http = http;
    this.start = "";
    this.destination = "";
    for (let i = 1; i <= 50; i++) {
      this.items.push({ "number": i });
    }
  }

  denunciarPost(post) {
    if(post.id_anuncio == this.userId) {
      this.showAlert("OPA!","Você não pode denunciar o proprio anuncio!","OK");
    } else {
      let confirm = this.alertCtrl.create({
        title: 'Você Realmente Deseja Denunciar Este Anuncio?',
        message: 'Caso você denuncie este anuncio ele desaparecerá permanentemente do seu feed!',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Aceitar',
            handler: () => {

              let index = this.feed.indexOf(post);
              if(index > -1){
                this.feed.splice(index, 1);
              }
              let headers = new Headers();
              headers.append('Access-Control-Allow-Origin', '*');
              headers.append('Accept', 'application/json');
              headers.append('content-type', 'application/json');

              let body = {
                id_usuario: this.userId,
                id_anuncio: post.id_anuncio
              }
              var link = 'https://bluedropsproducts.com/app/post/denunciar';

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
  }

  alterarTopNews(myEvent) {
    let popover = this.popoverCtrl.create(PopoverTopComponent,{atual:this.topOrNews},{cssClass:"popover-top"});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      if(popoverData) {
        this.topOrNews = popoverData;
        this.index_feed = 0;
        this.feed = [];
        this.getUserPosition();
      }
    })
  }

  opts(id, myEvent) {
    let popover = this.popoverCtrl.create(PopoverOptsAnunciosComponent,{id_anuncio:id},{cssClass:"popover-anuncio"});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      if(popoverData) {
        console.log
      }
    })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getUserPosition();
      refresher.complete();
    }, 2000);
  }

  seguidores() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('Access-Control-Expose-Headers', "true");

    let body = {
      id_usuario: this.userId
    }
    var link = 'https://bluedropsproducts.com/app/anuncios/seguidores';

    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.index_feed = 0;
        this.feed = data;
        console.log(data);
      });
  }

  alterarLocal(newLocal) {
    this.local = newLocal;
    this.index_feed = 0;
    this.feed = [];
    this.getUserPosition();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Publicando...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  loadMore(infiniteScroll = null) {
    this.index_feed = this.index_feed + 1;
    this.getUserPosition(infiniteScroll);
  }

  ampliarImagem(imagem,texto) {
    this.photoViewer.show(imagem,texto,{share:true});
  }

  navigate(lat, lng){
    this.destination = lat + "," + lng;
    let options: LaunchNavigatorOptions = {
      start: this.start
    };

    this.launchNavigator.navigate(this.destination, options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    );
  }

  getUserPosition(infiniteScroll = null) {
    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;
      this.loadLocation(pos.coords.latitude, pos.coords.longitude, infiniteScroll);
      console.log(pos.coords.latitude, pos.coords.longitude);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }

  showAlert(title, text, button) {
    let alert = this.alertCtrl.create({ title: title, subTitle: text, buttons: [button] });
    alert.present();
  }

  top(postId, tops, status) {
    if(!status){
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      let body = {
        anuncio: postId,
        liker: this.userId
      }
      var link = 'https://bluedropsproducts.com/app/likes/top';

      this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        console.log(tops);
        console.log(data);
        var div = document.getElementById('top' + data.anuncio);
        div.innerHTML = "TOP " + (parseInt(tops) + 1);
        var divA = document.getElementById('arrow' + data.anuncio);
        if(divA){
          divA.style.display = "none";
        }
      });
    }
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

  loadLocation(lat, long, infiniteScroll) {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDSO6Siell1ljeulEnHXDL4a5pfrCttnTc";
    this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data);
      this.bairro = data.results[0].address_components[2].long_name;
      this.cidade = data.results[0].address_components[3].long_name;
      this.estado = data.results[0].address_components[5].short_name;
      this.pais = data.results[0].address_components[6].long_name;
      this.loadFeed(lat,long, infiniteScroll);
    });
  }

  loadFeed(lat, long, infiniteScroll) {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('Access-Control-Expose-Headers', "true"); 

    let options = new RequestOptions({ headers: headers });

    console.log(this.userId, this.userImagem);
    this.userId = parseInt(this.userId);
    console.log(this.userId, this.userImagem);
    let tipo:number;
    if(this.topOrNews == "Top") {
      tipo = 1;
    } else if(this.topOrNews == "News") {
      tipo = 2;
    }

    let localNome;
    // switch(this.local) {
    //   case "bairro": {
    //     localNome = this.bairro;
    //     break;
    //   }
    //   case "cidade": {
    //     localNome = this.cidade;
    //     break;
    //   }
    //   case "estado": {
    //     localNome = this.estado;
    //     break;
    //   }
    //   case "pais": {
    //     localNome = this.pais;
    //     break;
    //   }
    // }
    if(this.local == "bairro"){
      localNome = this.bairro;
    }
    if(this.local == "cidade"){
      localNome = this.cidade;
    }
    if(this.local == "estado"){
      localNome = this.estado;
    }
    if(this.local == "pais"){
      localNome = this.pais;
    }
    console.log(localNome);
    let body = {
      l_tipo: this.local,
      local: localNome,
      userId: this.userId,
      index: this.index_feed,
      publico: 1,
      lat: lat,
      long: long,
      tipo: tipo
    }
    var link = 'https://bluedropsproducts.com/app/anuncios/puxarTodos';

    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        console.log(this.feed, data);
        if ( data.data) {
          data.data.forEach(element => {
            // element.usuario == parseInt(element.usuario);
            if(element.distance >= 1) {
               element.unit = 'Km';
               element.distance = parseInt(element.distance);
              } else {
                element.distance = element.distance * 1000;
                element.distance = parseInt(element.distance);
              element.unit = 'm';
            }
             console.log(element.distance);
          });
        };
        if (this.feed && data.status) {
          data.data.forEach(element => {
            console.log(element.distance);
            this.feed.push(element);
          });
        
          console.log(this.feed);
          console.log(this.index_feed);
          if(infiniteScroll) {
            infiniteScroll.complete();
          }
        } else {
          if (!data.status) {
            this.feed = this.feed;
          } else {
            this.feed = data.data;
          }
        }
        console.log(data.data);
      });
  }

  goImage() {
    this.navCtrl.push(AboutPage);
  }

  goPerfil(id_perfil = this.userId) {
    this.navCtrl.push(PerfilPage, {
      perfilId: id_perfil, userId: this.userId
  });
  }

  scrollingFun(e) {
    if (e.scrollTop > 1) {

      if(document.getElementsByClassName("scroll-content")[1]) {
        document.getElementsByClassName("scroll-content")[1]['style'].marginTop = '105px';
      } else {
        document.getElementsByClassName("scroll-content")[0]['style'].marginTop = '105px';
      }
      // document.querySelector(".fixed-content")['style'].marginTop = '105px';
      // document.querySelector(".scroll-content")['style'].marginTop = '105px';
      // document.getElementsByClassName("fixed-content")[0]['style'].marginTop = '105px';
      // document.getElementsByClassName("scroll-content")[1]['style'].marginTop = '105px';
      
      document.querySelector("#sendbar")['style'].display = 'none';

    } 
    if(e.deltaY < 0) {
      // document.querySelector(".fixed-content")['style'].marginTop = '150px';
      // document.querySelector(".scroll-content")['style'].marginTop = '150px';

      if(document.getElementsByClassName("scroll-content")[1]) {
        document.getElementsByClassName("scroll-content")[1]['style'].marginTop = '150px';
      } else {
        document.getElementsByClassName("scroll-content")[0]['style'].marginTop = '150px';
      }

      document.querySelector("#sendbar")['style'].display = 'flex';
    }//if 
  }//scrollingFun

  goMap(lat, lng, img, user) {
    console.log(img, user);
    let data = {
      lat: lat,
      lng: lng,
      imagem: img,
      user: user
    }
    console.log(data);
    this.navCtrl.push(MapPage, data);
  }

  getUserPostPosition() {
    this.presentLoadingDefault();
    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;
      console.log(pos.coords.latitude, pos.coords.longitude);
      // this.getGeocode(pos.coords.latitude, pos.coords.longitude);

      let url2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + pos.coords.latitude + "," + pos.coords.longitude + "&rankby=distance&key=AIzaSyDSO6Siell1ljeulEnHXDL4a5pfrCttnTc";
      this.http.get(url2).map(res => res.json()).subscribe(data2 => {
        this.local_array1 = data2.results[0].name;
        this.local_array2 = data2.results[1].name;
        this.local_array3 = data2.results[2].name;
        this.local_array4 = data2.results[3].name;
        this.local_array5 = data2.results[4].name;

        let alert = this.alertCtrl.create();
        alert.setTitle('Onde Você está?');
    
        alert.addInput({
          type: 'radio',
          label: this.local_array1,
          value: this.local_array1,
          checked: false
        });
    
        alert.addInput({
          type: 'radio',
          label: this.local_array2,
          value: this.local_array2,
          checked: false
        });
    
        alert.addInput({
          type: 'radio',
          label: this.local_array3,
          value: this.local_array3,
          checked: false
        });
    
        alert.addInput({
          type: 'radio',
          label: this.local_array4,
          value: this.local_array4,
          checked: false
        });
    
        alert.addInput({
          type: 'radio',
          label: this.local_array5,
          value: this.local_array5,
          checked: false
        });
    
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            this.sendPost(pos.coords.latitude, pos.coords.longitude, data);
          }
        });
        alert.present();
      });
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
    
  }

  // sendPost(lat, long, bairro, cidade, estado, pais, tipo, local) {
  sendPost(lat, lng, local) {
    let tipo:number;
    if(this.btnTop) {
      tipo = 1;
    } else if(this.btnNews) {
      tipo = 2;
    }
    
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyDSO6Siell1ljeulEnHXDL4a5pfrCttnTc";
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.bairro = data.results[0].address_components[2].long_name;
      this.cidade = data.results[0].address_components[3].long_name;
      this.estado = data.results[0].address_components[5].short_name;
      this.pais = data.results[0].address_components[6].long_name;
    });

    this.storage.get('meuid').then((val) => {
      console.log('Id', val);
      this.userId = val;
    });
  
    let body = {
      local: local,
      userId: this.userId,
      imagem: "none",
      texto: this.texto,
      lat: lat,
      long: lng,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
      pais: this.pais,
      tipo: tipo,
      usuario: this.userId
    }
    var link = 'https://bluedropsproducts.com/app/anuncios/criar';

    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        
        console.log(data["_body"]);
        this.navCtrl.push('FeedPage');
      });

  }
  
  getGeocode(lat, lng){
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyDSO6Siell1ljeulEnHXDL4a5pfrCttnTc";
        this.http.get(url).map(res => res.json()).subscribe(data => {

        });
    
        let url2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&rankby=distance&key=AIzaSyDSO6Siell1ljeulEnHXDL4a5pfrCttnTc";
        this.http.get(url2).map(res => res.json()).subscribe(data2 => {
        });
        
    
  }

  ionViewDidLoad() {
      this.btnTop = true;
      this.btnNews = false;
      this.local = "pais";
      this.storage.get('meuid').then((val) => {
        console.log('Id', val);
        this.userId = val;
    });
    
    this.storage.get('imagem').then((val) => {
      console.log('Image', val);
      this.userImagem = val;
    });
   
    this.topOrBottom=this.contentHandle._tabsPlacement;
    this.contentBox=document.querySelector("#sendbar")['style'];
  
    if (this.topOrBottom == "top") {
      this.tabBarHeight = this.contentBox.marginTop;
    } else if (this.topOrBottom == "bottom") {
      this.tabBarHeight = this.contentBox.marginBottom;
    }
    console.log('ionViewDidLoad FeedPage');
    
    // alert("teste");
    this.index_feed = 0;
    this.getUserPosition();
  }


}
