import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { PopoverTopComponent } from '../../components/popover-top/popover-top';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public local_array: any;
  public bairro: string;
  public cidade: string;
  public estado: string;
  public pais: string;
  public checkin: any;
  public local_array1: any;
  public local_array2: any;
  public local_array3: any;
  public local_array4: any;
  public local_array5: any;
  public userImagem: any;
  public usuario: any;
  public nome_usuario: any;
  public foto_usuario: any;
  public topOrNews: any = 'Top';
  userId: any;
  texto:string = "";
  imageURI:any;
  imageFileName:any;
  fileUrl:any;
  local: any = "bairro";
  localFileName:any;
  options: GeolocationOptions;
  currentPos: Geoposition;
  
  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public http: Http,
    private storage: Storage,
    public popoverCtrl: PopoverController,
    private geolocation: Geolocation) {

  }

  checkIn() {
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
                this.checkin = data;
              }
            });
            alert.present();
          });
        }, (err: PositionError) => {
          console.log("error : " + err.message);
        });    
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
      
      getImage() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }
      
        this.camera.getPicture(options).then((imageData) => {
          this.imageURI = imageData;
          let path = imageData;
          let new_path = path.substring(path.indexOf('s'));
          this.localFileName = new_path;
          this.uploadFile();
        }, (err) => {
          console.log(err);
          this.presentToast(err);
        });
      }

      pushPage() {
        this.navCtrl.push('FeedPage');
      }
      getPicture() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.CAMERA
        }
      
        this.camera.getPicture(options).then((imageData) => {
          this.imageURI = imageData;
          let path = imageData;
          let new_path = path.substring(path.indexOf('s'));
          this.localFileName = new_path;
          this.uploadFile();
        }, (err) => {
          console.log(err);
          this.presentToast(err);
        });
      }

      uploadFile() {
        let loader = this.loadingCtrl.create({
          content: "Carregando..."
        });
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
        

        let formattedDate = new Date();
        let d = formattedDate.getDate();
        let m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        let y = formattedDate.getFullYear();
        let random = Math.floor(Math.random() * 1000000) + 100000;
        let random2 = Math.floor(Math.random() * 1000000) + 100000;
        this.imageFileName = d + "_" + m + "_" + y + "_" + random + "_" + random2 + ".jpg";

        let options: FileUploadOptions = {
          fileKey: 'imagem',
          fileName: this.imageFileName,
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: {}
        }
      
        fileTransfer.upload(this.imageURI, encodeURI('https://bluedropsproducts.com/upload.php'), options)
          .then((data) => {
          console.log(data+" Uploaded Successfully");
          loader.dismiss();
          this.presentToast("Image uploaded successfully");
          this.fileUrl = "https://bluedropsproducts.com/app/uploads/" + this.imageFileName;
        }, (err) => {
          console.log(err);
          loader.dismiss();
          this.presentToast(err);
        });
      }
      presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }

      getUserPosition() {
        this.presentLoadingDefault();
        this.options = {
          enableHighAccuracy: true
        };
    
        this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
    
          this.currentPos = pos;
          console.log(pos.coords.latitude, pos.coords.longitude);

          let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.coords.latitude + "," + pos.coords.longitude + "";
          this.http.get(url).map(res => res.json()).subscribe(data => {
            this.bairro = data.results[0].address_components[2].long_name;
            this.cidade = data.results[0].address_components[3].long_name;
            this.estado = data.results[0].address_components[5].short_name;
            this.pais = data.results[0].address_components[6].long_name;
            this.sendPost(pos.coords.latitude, pos.coords.longitude, this.topOrNews);
          });

        }, (err: PositionError) => {
          console.log("error : " + err.message);
        });
        
      }


  sendPost(lat, long, tipo) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    if (!this.imageFileName) {
      this.imageFileName = "none";
    }
    if(tipo == "Top") {
      tipo = 1;
    } else if(tipo == "News") {
      tipo = 2;
    }

    let body = {
      imagem: this.imageFileName,
      texto: this.texto,
      lat: lat,
      long: long,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
      pais: this.pais,
      tipo: tipo,
      usuario: this.userId,
      local: this.checkin
    }

    var link = 'https://bluedropsproducts.com/app/anuncios/criar';

    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.presentToast(data.data);
        console.log(data.data);
        this.navCtrl.push('FeedPage');
      });

  }

  getUserInfo() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    let body = {
      id_usuario: this.userId
    }

    let link = 'https://bluedropsproducts.com/app/usuarios/getUserInfo';

    this.http.post(link, JSON.stringify(body), { headers: headers })
    .map(res => res.json())
    .subscribe(data => {
      this.usuario = data['usuario'];
      this.nome_usuario = this.usuario.nome;
      this.foto_usuario = this.usuario.user_image;
    });

  }
  
  alterarTopNews(myEvent) {
    let popover = this.popoverCtrl.create(PopoverTopComponent,{atual:this.topOrNews},{cssClass:"popover-about"});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      if(popoverData) {
        this.topOrNews = popoverData;
      }
    })
  }

  ionViewDidLoad() {
    this.storage.get('meuid').then((val) => {
      console.log('Id', val);
      this.userId = val;
      this.getUserInfo();
    });
  }

}
