import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, GoogleMapOptions } from '@ionic-native/google-maps';
import { FeedPage } from '../feed/feed';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  public globalLat: any;
  public globalLng: any;
  @ViewChild('map') 
  private mapElement: ElementRef;
  private map: GoogleMap;
  private location:LatLng;
  public feed: any;
  public feedData: any;
  public userData: any;
  public userPic: any;
  public index_feed: number;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private platform: Platform) {
    this.location = new google.maps.LatLng(this.globalLat, this.globalLng);
    this.http = http;
  }


  loadImageFeed(lat, long) {
    let header = new Headers();
    header.append('Access-Control-Allow-Origin', '*');
    header.append('Accept', 'application/json');
    header.append('content-type', 'application/json');

    let body = {
      index: 0,
      publico: 1,
      lat: lat,
      long: long
    }
    var link = 'https://bluedropsproducts.com/app/anuncios/puxarTodasFotos';

    this.http.post(link, JSON.stringify(body), { headers: header })
      .map(res => res.json())
      .subscribe(data => {
        console.log(this.feed, data.status);
     
        if (this.feed && data.status) {
          data.data.forEach(element => {
            if(element.imagem){
              console.log(element.distance);
              this.feed.push(element);
            }
          });
        
          console.log(this.feed);
          console.log(this.index_feed);
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
  
  ionViewDidLoad() {
    this.globalLat = this.navParams.get('lat');
    this.globalLng = this.navParams.get('lng');
    this.userData = this.navParams.get('user');
    this.userPic = this.navParams.get('imagem');
    console.log(this.userData);
    this.platform.ready().then(() => {
      this.loadImageFeed(this.globalLat, this.globalLng);
      let element = this.mapElement.nativeElement;
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.globalLat,
            lng: this.globalLng
          },
          zoom: 18,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create(element, mapOptions);
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 15
        };
        console.log(this.location);
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.globalLat,
            lng: this.globalLng
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              // alert('clicked');
            });
        });

        this.map.moveCamera(options);
      });
    });
    console.log();
   
  }

}
