import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController  } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { ObjetoProvider } from "../../providers/objeto-provider";
import { ObjetoAddPage } from "../objeto-add-page/objeto-add-page";


@Component({
  selector: 'page-objeto-list-page',
  templateUrl: 'objeto-list-page.html',
})
export class ObjetoListPage {

	objetos:Array<Objeto>;

  constructor(public navCtrl: NavController,
  			     public navParams: NavParams,
  			     public objetoProvider: ObjetoProvider,
             public toastCtrl: ToastController,
             public ngZone: NgZone,
             public alertCtrl: AlertController,
             public loadingCtrl: LoadingController) {
            this.objetos = new Array<Objeto>();
  }

  ionViewDidLoad() {

    /*
     * value - Escuta todas as alterações da referencia
     * child_added - Ouvinte para quando um filtlo for adicionado
     * child_changed - Ouvinte para quando algum filtlo for alterado
     * child_removed - Ouvinte para quando algum filho for deletado
     * child_moved - Ouvinte para ouvir as mudanças na prioridade de um filho
    */


    this.objetoProvider.reference.on('child_removed', (snapshot) => { //chega se foi removido algum objeto
      let objetoRemovido = snapshot.val(); // variavel recebe o objeto removido
      this.toastCtrl.create({ // cria um toast
        message: 'Objeto '+objetoRemovido.titulo+' foi Removido!', //mensagem toast
        duration: 2000 //duração do toast
      }).present(); //mostra
    })

    this.objetoProvider.reference.on('value', (snapshot) => { //on é um observador
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.objetos = innerArray;
        //console.log("entrou");
      })
    })
  }



  atualizarObjeto(objeto:Objeto){
     this.navCtrl.push(ObjetoAddPage,{'objeto':objeto});
  }

  adicionarObjeto(){
    this.navCtrl.push(ObjetoAddPage,{'objeto' : new Objeto()});
  }

  deletarObjeto(objeto: Objeto){
    this.objetoProvider.deletar(objeto)
      .then(sucesso => console.log('objeto deletado')
      )
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

}
