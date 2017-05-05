import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController  } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { ObjetoProvider } from "../../providers/objeto-provider";
import { LoginProvider } from "../../providers/login-provider";
import { ObjetoAddPage } from "../objeto-add-page/objeto-add-page";
import { ObjetoVerPage } from "../objeto-ver-page/objeto-ver-page";
import { LoginPage } from "../login/login";


@Component({
  selector: 'page-objeto-list-page',
  templateUrl: 'objeto-list-page.html',
})
export class ObjetoListPage {

	objetos:Array<Objeto>= new Array<Objeto>();
  removido: Objeto;

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
    this.objetoProvider.reference.on('child_removed', (snapshot) => { //chega se foi removido algum objeto
      this.removido = snapshot.val(); // variavel recebe o objeto removido

    })

    this.objetoProvider.reference.on('value', (snapshot) => { //on é um observador
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();

          if(el.usuario == this.loginProvider.usuarioAtual.uid){//passa so objto do usuario atual
            innerArray.push(el);
          }

        })
        this.objetos = innerArray;
        //console.log("entrou");
      })
    })
  }
}


  atualizarObjeto(objeto:Objeto){
     this.navCtrl.push(ObjetoAddPage,{'objeto':objeto});
  }

  adicionarObjeto(){
    this.navCtrl.push(ObjetoAddPage,{'objeto' : new Objeto()});
  }

  deletarObjeto(objeto: Objeto){
    this.objetoProvider.deletar(objeto)
      .then(sucesso => {console.log('objeto deletado')
      this.toastCtrl.create({ // cria um toast
        message: 'Objeto '+this.removido.titulo+' foi Removido!', //mensagem toast
        duration: 2000 //duração do toast
      }).present(); //mostra
    })
      .catch(error => console.log('erro ao apagar objeto'));
  }

  showConfirm(objeto: Objeto) { // mensagem de confirmação para delear
    let confirm = this.alertCtrl.create({
      title: 'Delear?',
      message: 'tem certeza que deseja deletar o objeto '+objeto.titulo+' ?',
      buttons: [
        {
          text: 'Deletar',
          handler: () => {
            this.deletarObjeto(objeto);
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

  clicou(objeto:Objeto){
    console.log(objeto);
    this.navCtrl.push(ObjetoVerPage,{'objeto':objeto});
  }

  sair(){
    this.loginProvider.sair();
    this.navCtrl.setRoot(LoginPage);

  }

}
