import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Objeto } from "../../models/objeto"
import { Usuario  } from "../../models/usuario"
import { ObjetoProvider } from "../../providers/objeto-provider";
import { ObjetoListPage } from "../objeto-list-page/objeto-list-page";
import { ObjetoAddPage } from "../objeto-add-page/objeto-add-page";
import firebase from "firebase";
import { LoginPage } from "../login/login";
import { LoginProvider } from "../../providers/login-provider";

/**
 * Generated class for the ObjetoVerMeuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-objeto-ver-meu-page',
  templateUrl: 'objeto-ver-meu-page.html',
})
export class ObjetoVerMeuPage {

  objeto: Objeto;
  usuario: Usuario;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngZone: NgZone,
              public loginProvider: LoginProvider,
              public objetoProvider: ObjetoProvider,
              public alertCtrl: AlertController) {

          this.objeto = this.navParams.get('objeto');
          this.usuario = new Usuario();
  }

  ionViewWillEnter() {

    if(!this.loginProvider.autenticado){
      this.navCtrl.setRoot(LoginPage);
    }
        //this.objeto = this.navParams.get('objeto');
        firebase.database().ref('/dadosUsuarios/' + this.objeto.usuario).once('value', (snapshot)=> {
        console.log(snapshot.val());

        this.usuario.nome = snapshot.val().nome;
        this.usuario.telefone = snapshot.val().telefone;
        this.usuario.email = snapshot.val().email;
        console.log(this.usuario.nome);

    });
  }



  editar(objeto:Objeto){
     this.navCtrl.push(ObjetoAddPage,{'objeto':objeto});
  }

  confirmDoar() { // mensagem de confirmação para sair
    let confirm = this.alertCtrl.create({
      title: 'Doado',
      message: 'tem certeza que o objeto va foi doado?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.doado();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelado');
          }
        }
      ]
    });
    confirm.present();
  }
  doado(){
    this.objeto.estado = "doado";
    this.objetoProvider.save(this.objeto);
    this.navCtrl.setRoot(ObjetoListPage);
    //console.log("doado");
  }

}
