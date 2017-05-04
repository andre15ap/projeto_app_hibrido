
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController  } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { Usuario } from "../../models/usuario";
import { ObjetoProvider } from "../../providers/objeto-provider";
import { LoginProvider } from "../../providers/login-provider";
import { ObjetoAddPage } from "../objeto-add-page/objeto-add-page";
import { LoginPage } from "../login/login";
import { ObjetoVerPage } from "../objeto-ver-page/objeto-ver-page";


@IonicPage()
@Component({
  selector: 'page-objeto-buscar-page',
  templateUrl: 'objeto-buscar-page.html',
})
export class ObjetoBuscarPage {

  objetos:Array<Objeto>= new Array<Objeto>();
  usuario: any;

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public objetoProvider: ObjetoProvider,
             public loginProvider: LoginProvider,
             public toastCtrl: ToastController,
             public ngZone: NgZone,
             public alertCtrl: AlertController,
             public loadingCtrl: LoadingController) {
            //this.objetos = new Array<Objeto>();

  }

  ionViewWillEnter() {
    /*
     * value - Escuta todas as alterações da referencia
     * child_added - Ouvinte para quando um filtlo for adicionado
     * child_changed - Ouvinte para quando algum filtlo for alterado
     * child_removed - Ouvinte para quando algum filho for deletado
     * child_moved - Ouvinte para ouvir as mudanças na prioridade de um filho
    */

    if(!this.loginProvider.autenticado){
      this.navCtrl.setRoot(LoginPage);
    }else{
    this.objetoProvider.reference.on('value', (snapshot) => { //on é um observador
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();

          if(el.usuario != this.loginProvider.usuarioAtual.uid){//passa so objto do usuario atual
            innerArray.push(el);
          }

        })
        this.objetos = innerArray;
        //console.log("entrou");
      })
    })
  }
}


  clicado(objeto:Objeto){

    //this.navCtrl.setRoot(ObjetoVerPage);
    //this.usuario = this.loginProvider.usuarioAtual;
    //console.log(objeto.usuario);
    this.navCtrl.push(ObjetoVerPage,{'objeto':objeto});

  }


  confirmSair() { // mensagem de confirmação para sair
    let confirm = this.alertCtrl.create({
      title: 'Sair do Aplicativo?',
      message: 'tem certeza que deseja Sair',
      buttons: [
        {
          text: 'Sair',
          handler: () => {
            this.sair();
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

  sair(){
    this.loginProvider.sair();
    this.navCtrl.push(LoginPage);

  }

  }
