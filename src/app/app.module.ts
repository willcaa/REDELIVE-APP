declare var globalLat: any;
declare var globalLng: any;
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Popover } from 'ionic-angular';
import { MyApp } from './app.component';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { AboutPage } from '../pages/about/about';
import { CommentsPage } from '../pages/comments/comments';
import { CheckinPage } from '../pages/checkin/checkin'
import { ContactPage } from '../pages/contact/contact';
import { PerfilPage } from '../pages/perfil/perfil';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { RegisterPage } from '../pages/register/register';


import { StatusBar } from '@ionic-native/status-bar';
import { FeedPageModule } from '../pages/feed/feed.module';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Facebook } from '@ionic-native/facebook';
import { LocatonsProvider } from '../providers/locatons/locatons';
import { PopoverDenunciarComponent } from '../components/popover-denunciar/popover-denunciar';
import { PopoverTopComponent } from '../components/popover-top/popover-top';
import { PopoverOptsAnunciosComponent } from '../components/popover-opts-anuncios/popover-opts-anuncios';
import { PopoverNotificacoesComponent } from '../components/popover-notificacoes/popover-notificacoes';
import { StatsPage } from '../pages/stats/stats';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CommentsPage,
    CheckinPage,
    ContactPage,
    PerfilPage,
    HomePage,
    TabsPage,
    MapPage,
    StatsPage,
    RegisterPage,
    PopoverDenunciarComponent,
    PopoverTopComponent,
    PopoverOptsAnunciosComponent,
    PopoverNotificacoesComponent
  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon: 'ios-arrow-back',
    }),
    IonicStorageModule.forRoot(),
    FeedPageModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    CheckinPage,
    PerfilPage,
    HomePage,
    TabsPage,
    MapPage,
    StatsPage,
    RegisterPage,
    CommentsPage,
    PopoverDenunciarComponent,
    PopoverTopComponent,
    PopoverOptsAnunciosComponent,
    PopoverNotificacoesComponent
  ],
  providers: [
    StatusBar,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    LaunchNavigator,
    Camera,
    Facebook,
    PhotoViewer,
    LocatonsProvider,
    ScreenOrientation
  ]
})
export class AppModule {}
