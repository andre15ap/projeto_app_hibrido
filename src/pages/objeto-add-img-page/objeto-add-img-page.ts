import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { ObjetoProvider } from "../../providers/objeto-provider";
import { CameraProvider } from "../../providers/camera-provider";
import { ObjetoListPage } from "../objeto-list-page/objeto-list-page";

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
              public cameraProvider: CameraProvider) {
  }

  ionViewDidLoad() {
    this.objeto = this.navParams.get('objeto');
  }

  foto()
  {
    this.cameraProvider.pegaFoto(this.objeto);
    //alert('terminou');
    this.navCtrl.setRoot(ObjetoListPage);
  }

}
