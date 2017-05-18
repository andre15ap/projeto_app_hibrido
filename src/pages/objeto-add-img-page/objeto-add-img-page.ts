import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { ObjetoProvider } from "../../providers/objeto-provider";
import { CameraProvider } from "../../providers/camera-provider";
import { ObjetoListPage } from "../objeto-list-page/objeto-list-page";
import { LoginPage } from "../login/login";
import { LoginProvider } from "../../providers/login-provider";

/**
 * Generated class for the ObjetoAddImgPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-objeto-add-img-page',
  templateUrl: 'objeto-add-img-page.html',
})
export class ObjetoAddImgPage {
  objeto:Objeto = new Objeto;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public objetoProvider: ObjetoProvider,
              public loginProvider: LoginProvider,
              public cameraProvider: CameraProvider) {
  }

  ionViewWillEnter() {
    this.objeto = this.navParams.get('objeto');
    if(!this.loginProvider.autenticado){
      this.navCtrl.setRoot(LoginPage);
    }

  }

  foto()
  {
    this.cameraProvider.pegaFoto(this.objeto);
    //alert('terminou');
    this.navCtrl.setRoot(ObjetoListPage);
  }

}
