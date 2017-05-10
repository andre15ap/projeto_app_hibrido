import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Objeto } from "../../models/objeto";
import { Usuario } from "../../models/usuario";
import { ObjetoProvider } from "../../providers/objeto-provider";
import { LoginProvider } from "../../providers/login-provider";
import { LoginPage } from "../login/login";
import { ObjetoVerPage } from "../objeto-ver-page/objeto-ver-page";

/**
 * Generated class for the DoadosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doados-page',
  templateUrl: 'doados-page.html',
})
export class DoadosPage {

  objetos:Array<Objeto>= new Array<Objeto>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public objetoProvider: ObjetoProvider,
              public loginProvider: LoginProvider,
              public ngZone: NgZone) {
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

          if(el.estado == "doado"){//passa so objto do usuario atual
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

}
