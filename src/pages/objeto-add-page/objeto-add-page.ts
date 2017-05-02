import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { ObjetoProvider } from "../../providers/objeto-provider";
import {Camera} from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-objeto-add-page',
  templateUrl: 'objeto-add-page.html',
})
export class ObjetoAddPage {
  public base64Image: string;
  objeto:Objeto;
  imageUrl: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
  			      public objetoProvider: ObjetoProvider,
              private camera: Camera) {
    this.objeto = new Objeto;
  }

  ionViewDidLoad() {
    this.objeto = this.navParams.get('objeto');// verifica se vai atualizar ou novo
    if(!this.objeto){
    	this.objeto = new Objeto();
    }
  }

  salvarObjeto(){
    this.objetoProvider.save(this.objeto);
    this.viewCtrl.dismiss();//fecha a tela
  }


    takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 300,
        targetHeight: 300
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.objeto.imagem = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }


}
