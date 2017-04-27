import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { LoginProvider } from '../providers/login-provider';
import { ObjetoProvider } from '../providers/objeto-provider';
import { ObjetoListPage } from '../pages/objeto-list-page/objeto-list-page';
import { ObjetoAddPage } from '../pages/objeto-add-page/objeto-add-page';
import { ObjetoListItens } from '../components/objeto-list-itens/objeto-list-itens';
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyClcrE2WA3jTqMkDJGwmWXSIjyGBEYut3E",
  authDomain: "projeto-9a108.firebaseapp.com",
  databaseURL: "https://projeto-9a108.firebaseio.com",
  projectId: "projeto-9a108",
  storageBucket: "projeto-9a108.appspot.com",
  messagingSenderId: "168499719469"
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    ObjetoListPage,
    ObjetoAddPage,
    ObjetoListItens
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    ObjetoListPage,
    ObjetoAddPage,
    ObjetoListItens
  ],
  providers: [
    LoginProvider,
    ObjetoProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(firebaseConfig);
  }
}
