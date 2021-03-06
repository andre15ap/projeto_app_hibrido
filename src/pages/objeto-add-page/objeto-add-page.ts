import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { ObjetoProvider } from "../../providers/objeto-provider";
import { CameraProvider } from "../../providers/camera-provider";
import { LoginProvider } from "../../providers/login-provider";
import { ObjetoAddImgPage } from "../objeto-add-img-page/objeto-add-img-page";
import { LoginPage } from "../login/login";
import {Camera} from '@ionic-native/camera';
import { FormBuilder, Validators } from '@angular/forms'


@IonicPage()
@Component({
  selector: 'page-objeto-add-page',
  templateUrl: 'objeto-add-page.html',
})
export class ObjetoAddPage {
  public base64Image: string;
  objeto:Objeto;
  imageUrl: string = '';
  cadastro: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
  			      public objetoProvider: ObjetoProvider,
  			      public loginProvider: LoginProvider,
  			      public cameraProvider: CameraProvider,
              private camera: Camera) {
    this.objeto = new Objeto;

  //   this.cadastro = this.formBuilder.group({
  //   titulo:['',Validators.compose([Validators.minLength(5), Validators.required])],
  //   descricao:['',Validators.compose([Validators.minLength(10), Validators.required])]
   //
  //  });
  }

  ionViewWillEnter() {
    if(!this.loginProvider.autenticado){
      this.navCtrl.setRoot(LoginPage);
      this.viewCtrl.dismiss();
    }
    this.objeto = this.navParams.get('objeto');// verifica se vai atualizar ou novo
    if(!this.objeto){
    	this.objeto = new Objeto();

    }
  }

  salvarObjeto(){
    this.objeto.estado = "novo";
    if(!this.objeto.imagem){
      this.objeto.imagem = "";
    }
    this.objeto.ketReference = this.objetoProvider.save(this.objeto);

  this.navCtrl.push(ObjetoAddImgPage,{'objeto': this.objeto});
  //  this.navCtrl.setRoot(ObjetoAddImgPage,{'objeto': this.objeto});

  }

// foto()
// {
//   this.cameraProvider.pegaFoto();
// }
//
// takePicture(){
//     this.camera.getPicture({
//         destinationType: this.camera.DestinationType.DATA_URL,
//         targetWidth: 400,
//         targetHeight: 300
//     }).then((imageData) => {
//       // imageData is a base64 encoded string
//       //alert('caminho ' + imageData);
//         this.objeto.imagem = "data:image/jpeg;base64," + imageData;
//     }, (err) => {
//         console.log(err);
//     });
//   }


}
