import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Objeto } from "../../models/objeto";
import { ObjetoProvider } from "../../providers/objeto-provider";

@IonicPage()
@Component({
  selector: 'page-objeto-add-page',
  templateUrl: 'objeto-add-page.html',
})
export class ObjetoAddPage {

  objeto:Objeto;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
  			      public objetoProvider: ObjetoProvider) {
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

}
