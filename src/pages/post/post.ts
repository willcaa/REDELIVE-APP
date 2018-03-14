import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  
})
export class PostPage {
  imageURI:any;
  imageFileName:any;
  options: GeolocationOptions;
  currentPos: Geoposition;
  
    constructor(public navCtrl: NavController,
      private transfer: FileTransfer,
      private camera: Camera,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      private geolocation: Geolocation) {}
      
      getImage() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }
      
        this.camera.getPicture(options).then((imageData) => {
          this.imageURI = imageData;
        }, (err) => {
          console.log(err);
          this.presentToast(err);
        });
      }

      uploadFile() {
        let loader = this.loadingCtrl.create({
          content: "Uploading..."
        });
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
      
        let options: FileUploadOptions = {
          fileKey: 'ionicfile',
          fileName: 'ionicfile',
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: {}
        }
      
        fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
          .then((data) => {
          console.log(data+" Uploaded Successfully");
          this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
          loader.dismiss();
          this.presentToast("Image uploaded successfully");
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
        this.options = {
          enableHighAccuracy: true
        };
    
        this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
    
          this.currentPos = pos;
          console.log(pos.coords.latitude, pos.coords.longitude);
    
        }, (err: PositionError) => {
          console.log("error : " + err.message);
        });
      }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.getImage();
  }

}
